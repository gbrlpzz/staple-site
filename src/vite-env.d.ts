/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ACCESS_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
