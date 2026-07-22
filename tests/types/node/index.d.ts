declare namespace NodeJS {
  interface Process {
    readonly env: Readonly<Record<string, string | undefined>>;
  }
}

declare const process: NodeJS.Process;
