import React, { useState, useCallback, ReactNode, memo } from 'react';
import { Resizable } from 'react-resizable';
import { LeftNav } from './LeftNav';
import { Chat } from '../pages/chat/Chat';
import { TopBar } from './TopBar';
import styles from "./Shell.module.scss";

export const Shell: React.FC<{children: ReactNode}> = memo(({ children }: {
    children: ReactNode;
}): ReactNode => {
    const [leftWidth, setLeftWidth] = useState<number>(200);
    const [rightWidth, setRightWidth] = useState<number>(200);

    // Memoized resize stop handlers
    const onLeftResizeStop = useCallback(
        (_e: React.SyntheticEvent, data: { size: { width: number } }) => {
            console.log("onLeftResizeStop", data)
            setLeftWidth(data.size.width);
        },
        []
    );

    const onRightResizeStop = useCallback(
        (_e: React.SyntheticEvent, data: { size: { width: number } }) => {
            setRightWidth(data.size.width);
        },
        []
    );

    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.content}>
                <Resizable
                    width={leftWidth}
                    height={0}
                    onResizeStop={onLeftResizeStop}
                >
                    <LeftNav />
                </Resizable>
                <div className={styles.middlePanel}>
                    {children}
                </div>
                <Resizable
                    width={rightWidth}
                    height={0}
                    onResizeStop={onRightResizeStop}
                >
                    <div className={styles.chat} style={{width: rightWidth}}>
                        <Chat />
                    </div>
                </Resizable>
            </div>
        </div>
    )
})

Shell.displayName = "Shell";
