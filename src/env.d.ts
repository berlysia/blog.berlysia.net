// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- required by framework
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_ANALYTICS_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
