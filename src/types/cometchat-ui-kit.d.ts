declare module '@cometchat/chat-uikit-react' {
  export interface MessageListProps {
    goToMessageId?: string;
    searchKeyword?: string;
    [key: string]: any;
  }
  
  export interface MessageHeaderProps {
    showSearchOption?: boolean;
    [key: string]: any;
  }
  
  export interface ConversationsProps {
    showSearchBar?: boolean;
    [key: string]: any;
  }
  
  export interface CometChatThreadHeaderProps {
    onSubtitleClicked?: (() => void) | undefined;
    [key: string]: any;
  }
  
  export const CometChatMessageList: React.ComponentType<MessageListProps & any>;
  export const CometChatMessageHeader: React.ComponentType<MessageHeaderProps & any>;
  export const CometChatConversations: React.ComponentType<ConversationsProps & any>;
  export const CometChatThreadHeader: React.ComponentType<CometChatThreadHeaderProps & any>;
  export const CometChatSearch: any;
  export const CometChatSearchBar: any;
  export const CometChatTextHighlightFormatter: any;
  export const CometChatTextFormatter: any;
  
  // Type aliases for missing interfaces
  export interface IGroupMemberKickedBanned {
    [key: string]: any;
  }
  
  export interface IGroupMemberAdded {
    [key: string]: any;
  }
  
  export interface IGroupMemberJoined {
    [key: string]: any;
  }
  
  export interface IMessages {
    [key: string]: any;
  }
}

// Global type augmentations
declare global {
  namespace React {
    interface HTMLAttributes<T> {
      [key: string]: any;
    }
  }
}

export {};