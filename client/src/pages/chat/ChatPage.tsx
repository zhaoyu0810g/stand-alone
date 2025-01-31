import React, { ReactNode, memo } from 'react';
import { Chat } from './Chat';
import { PrepareMyDay } from './PrepareMyDay';
import styles from "./ChatPage.module.scss";

// TODO: Create chat page
export const ChatPage: React.FC = memo((): ReactNode => {
    return (
        <div className={styles.chatpageContainer}>
            <Chat />
            <PrepareMyDay />
        </div>
    )
})

ChatPage.displayName = "ChatPage";
