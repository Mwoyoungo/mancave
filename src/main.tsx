/// <reference path="./types/cometchat-ui-kit.d.ts" />
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
import { setupLocalization } from "./CometChat/utils/utils";
import { CometChatProvider } from "./CometChat/context/CometChatContext";
import { COMETCHAT_CONSTANTS } from "./config/cometChatConfig";

const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

CometChatUIKit.init(uiKitSettings)?.then(() => {
  setupLocalization();

  // Mount the app - login will be handled by LoginForm component
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <CometChatProvider>
      <App />
    </CometChatProvider>
  );
});