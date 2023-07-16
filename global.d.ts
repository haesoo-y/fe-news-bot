declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PREVIEW_KFA?: "true";
      PREVIEW_MEDIUM?: "true";
      PREVIEW_YOZM?: "true";
    }
  }
}

export {};
