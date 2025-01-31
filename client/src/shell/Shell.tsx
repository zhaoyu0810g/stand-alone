import React, { ReactNode, memo } from 'react';
import { LeftNav } from './LeftNav';
import { TopBar } from './TopBar';
import { Route, Routes } from 'react-router-dom';
import { ChatPage } from '../pages/chat/ChatPage';
import { MockDataPage } from '../pages/mock/MockDataPage';
import { ConnectorPage } from '../pages/connector/ConnectorPage';

import styles from "./Shell.module.scss";

export const Shell: React.FC = memo((): ReactNode => {
    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.content}>
                <LeftNav />
                <div>
                    <Routes>
                        <Route path="/" element={<MockDataPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/connector" element={<ConnectorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
})

Shell.displayName = "Shell";
