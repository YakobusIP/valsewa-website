/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AXIOS_BASE_URL: string;
  readonly VITE_GCS_BUCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
