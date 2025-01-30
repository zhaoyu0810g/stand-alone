import { useState, useCallback, ReactNode } from 'react';
import { Resizable } from 'react-resizable';
import "react-resizable/css/styles.css";
import LeftNav from './LeftNav';
import { Chat } from '../chat/Chat';

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
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100%" }}>
            {/* Top Bar */}
            <div style={{ height: 50, backgroundColor: "#0078d4", padding: "0 10px", display: "flex", alignItems: "center" }}>
                <div style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Logo</div>
            </div>

            {/* Main Content */}
            <div style={{ display: "flex", flexGrow: 1 }}>
                {/* Left Resizable Panel */}
                <Resizable
                    width={leftWidth}
                    height={0}
                    onResizeStop={onLeftResizeStop}
                >
                    <LeftNav />
                </Resizable>

                {/* Middle Panel */}
                <div style={{ flexGrow: 1, background: "#ffffff", padding: 10 }}>
                    {children}
                </div>

                {/* Right Resizable Panel */}
                <Resizable
                    width={rightWidth}
                    height={0}
                    onResizeStop={onRightResizeStop}
                >
                    <div style={{ width: rightWidth, minWidth: 150, background: "#f3f3f3", overflow: "auto", padding: 10 }}>
                        <Chat />
                    </div>
                </Resizable>
            </div>
        </div>
    )
}
