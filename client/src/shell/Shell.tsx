import { useState, useCallback, ReactNode } from 'react';
import { Resizable } from 'react-resizable';
import "react-resizable/css/styles.css";
import LeftNav from './LeftNav';
import { Chat } from '../chat/Chat';
import styles from "./Shell.module.scss";

export const Shell = ({ children }: {
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
            {/* Top Bar */}
            <div className={styles.banner}>
                <div className={styles.logo}>Logo</div>
            </div>

            {/* Main Content */}
            <div className={styles.content}>
                {/* Left Resizable Panel */}
                <Resizable
                    width={leftWidth}
                    height={0}
                    onResizeStop={onLeftResizeStop}
                >
                    <LeftNav />
                </Resizable>

                {/* Middle Panel */}
                <div className={styles.middlePanel}>
                    {children}
                </div>

                {/* Right Resizable Panel */}
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
}
