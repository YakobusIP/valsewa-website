import { Storage } from "@google-cloud/storage";
import path from "path";
import { env } from "./env";

type GlobalForStorage = {
  storage?: Storage;
  bucket?: ReturnType<Storage["bucket"]>;
};

const globalForStorage = globalThis as unknown as GlobalForStorage;

const shouldInitStorage = env.NODE_ENV === "staging";

export const storage =
  globalForStorage.storage || (shouldInitStorage ? new Storage() : undefined);

export const bucket =
  globalForStorage.bucket ||
  (shouldInitStorage && storage
    ? storage.bucket(env.GCS_BUCKET_NAME)
    : undefined);

if (shouldInitStorage) {
  globalForStorage.storage = storage;
  globalForStorage.bucket = bucket;
}
