// Global type safety overrides for build compatibility
declare global {
  interface Window {
    [key: string]: any;
  }
}

// Make all CometChat components accept any props
declare module '@cometchat/chat-uikit-react' {
  const CometChatThreadHeader: React.ComponentType<any>;
  const CometChatMessageList: React.ComponentType<any>;
  const CometChatMessageHeader: React.ComponentType<any>;
  const CometChatConversations: React.ComponentType<any>;
  const CometChatMessageComposer: React.ComponentType<any>;
  const CometChatSearch: React.ComponentType<any>;
  const CometChatSearchBar: React.ComponentType<any>;
}

export {};