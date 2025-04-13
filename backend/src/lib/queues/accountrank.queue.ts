import Queue, { Job } from "bull";
import { env } from "../env";
import { RankService } from "../../services/rank.service";
import {
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError
} from "../error";
import { AccountService } from "../../services/account.service";
import { UploadService } from "../../services/upload.service";

type UpdateJobData = {
  id: number;
  nickname: string;
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
        type: "exponential",
        delay: 1000
      }
    }
  }
);

const accountService = new AccountService(new UploadService());
const rankService = new RankService();

const processUpdateAllAccountQueue = async (job: Job<UpdateJobData>) => {
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
  } catch (error) {
    if (
      error instanceof NotFoundError ||
      error instanceof UnprocessableEntityError
    ) {
      throw error;
    }

    throw new InternalServerError((error as Error).message);
  }
};

updateAllAccountRankQueue.process(processUpdateAllAccountQueue);
