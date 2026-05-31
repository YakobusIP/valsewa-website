import Queue, { Job } from "bull";
import { randomUUID } from "crypto";
import { env } from "../env";
import { RankService } from "../../services/rank.service";
import {
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError
} from "../error";
import { AccountService } from "../../services/account.service";
import { UploadService } from "../../services/upload.service";
import {
  getContextLogger,
  runWithRequestContext
} from "../request-context";

const queueLogger = () =>
  getContextLogger({ component: "queue", queue: "updateAllAccountRankQueue" });

type UpdateJobData = {
  id: number;
  nickname: string;
  correlationId: string;
};

export const updateAllAccountRankQueue = new Queue<UpdateJobData>(
  "updateAllAccountRankQueue",
  {
    redis: {
      host: env.BULL_REDIS_IP,
      port: env.BULL_REDIS_PORT,
      maxRetriesPerRequest: null
    },
    limiter: {
      max: 1,
      duration: 5000
    },
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: "fixed",
        delay: 60_000
      }
    }
  }
);

const accountService = new AccountService(new UploadService());
const rankService = new RankService();

const processUpdateAllAccountQueue = async (job: Job<UpdateJobData>) => {
  const jobRequestId = randomUUID();
  const correlationId = job.data.correlationId;

  await runWithRequestContext({ requestId: jobRequestId, correlationId }, async () => {
    const start = Date.now();
    queueLogger().info(
      {
        event: "queue_job_started",
        queue: "updateAllAccountRankQueue",
        jobId: job.id,
        accountId: job.data.id,
        correlationId,
        attemptsMade: job.attemptsMade
      },
      "Queue job started"
    );

    try {
      const [name, tag] = job.data.nickname.split("#");

      if (!name || !tag) {
        throw new UnprocessableEntityError(
          "Invalid nickname format. Expected name#tag"
        );
      }

      const rankResponse = await rankService.callAPI(name, tag);
      await accountService.updateAccount(job.data.id, {
        accountRank: rankResponse.data.current_data.currenttierpatched
      });

      queueLogger().info(
        {
          event: "queue_job_completed",
          queue: "updateAllAccountRankQueue",
          jobId: job.id,
          accountId: job.data.id,
          correlationId,
          attemptsMade: job.attemptsMade,
          durationMs: Date.now() - start
        },
        "Queue job completed"
      );
    } catch (error) {
      queueLogger().error(
        {
          event: "queue_job_failed",
          queue: "updateAllAccountRankQueue",
          jobId: job.id,
          accountId: job.data.id,
          correlationId,
          attemptsMade: job.attemptsMade,
          durationMs: Date.now() - start,
          errorName: (error as Error).name,
          errorMessage: (error as Error).message
        },
        "Queue job failed"
      );

      if (error instanceof NotFoundError) {
        await job.moveToFailed(error, true);
        return;
      }

      if (error instanceof UnprocessableEntityError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  });
};

updateAllAccountRankQueue.process(processUpdateAllAccountQueue);

updateAllAccountRankQueue.on("failed", (job, error) => {
  if (!job) return;

  const maxAttempts = job.opts.attempts ?? 1;
  const correlationId = job.data?.correlationId;

  if (job.attemptsMade < maxAttempts) {
    queueLogger().warn(
      {
        event: "queue_job_retrying",
        queue: "updateAllAccountRankQueue",
        jobId: job.id,
        accountId: job.data?.id,
        correlationId,
        attemptsMade: job.attemptsMade,
        maxAttempts,
        errorName: error.name,
        errorMessage: error.message
      },
      "Queue job will retry"
    );
    return;
  }

  queueLogger().error(
    {
      event: "queue_job_exhausted",
      queue: "updateAllAccountRankQueue",
      jobId: job.id,
      accountId: job.data?.id,
      correlationId,
      attemptsMade: job.attemptsMade,
      maxAttempts,
      errorName: error.name,
      errorMessage: error.message
    },
    "Queue job exhausted retries"
  );
});
