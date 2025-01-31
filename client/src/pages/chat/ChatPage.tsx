import React, { ReactNode, memo } from 'react';
import { Chat } from './Chat';

// TODO: Create chat page
import styles from "../../shell/Shell.module.scss";
import { PrepareMyDay } from './PrepareMyDay';

export const ChatPage: React.FC = memo((): ReactNode => {
    return (
        <div className={styles.container}>
            <div className={styles.middlePanel}>
                <PrepareMyDay />
            </div>
            <div className={styles.chat} style={{ width: 200 }}>
                <Chat />
            </div>
        </div>
    )
})

ChatPage.displayName = "ChatPage";
