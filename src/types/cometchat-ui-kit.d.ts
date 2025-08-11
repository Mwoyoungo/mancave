declare module '@cometchat/chat-uikit-react' {
  export interface MessageListProps {
    goToMessageId?: string;
    searchKeyword?: string;
    [key: string]: any;
  }
  
  export const CometChatMessageList: React.ComponentType<MessageListProps & any>;
}

export {};