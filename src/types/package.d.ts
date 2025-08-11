declare global {
  interface PackageJson {
    cometChatCustomConfig?: any;
    [key: string]: any;
  }
}

export {};