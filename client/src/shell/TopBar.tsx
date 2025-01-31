import React, { memo } from 'react';
import styles from "./TopBar.module.scss";

export const TopBar: React.FC = memo(() => {
    return (
        <div className={styles.topbar}>
        <div style={{ color: "white", fontSize: 20, fontWeight: "bold", padding: '16px 0' }}>Stand Alone Prototype</div>
    </div>
    );
});

TopBar.displayName = "TopBar";
