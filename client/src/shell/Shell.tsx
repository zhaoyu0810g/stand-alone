import React, { ReactNode, memo } from 'react';
import { LeftNav } from './LeftNav';
import { Chat } from '../pages/chat/Chat';
import { TopBar } from './TopBar';
import styles from "./Shell.module.scss";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/chat/ChatPage';
import { MockPage } from '../pages/mock/MockPage';

export const Shell: React.FC<{ children: ReactNode }> = memo(({ children }: {
    children: ReactNode;
}): ReactNode => {
    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.content}>
                <LeftNav />
                <Routes>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="/dashboard" element={<MockPage />}>
                    </Route>
                </Routes>
            </div>
        </div>
    )
})

Shell.displayName = "Shell";
