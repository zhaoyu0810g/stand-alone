import { Card, Checkbox } from '@fluentui/react-components';
import React, { ReactNode, memo } from 'react';

export const MockConnector: React.FC = memo((): ReactNode => {
    return (
        <Card>
            <h3>Connected</h3>
            <>
                {["Google Personal Calendar", "Google Working Calendar", "Zoom workspace", "Messengers"].map((item, index) => {
                    return <Checkbox key={index} label={item} checked={true} readOnly={true} />
                })}
            </>
            <h3>Let's Connect More ...</h3>
            <p>Coming soon</p>
            <>
                {["Microsoft Teams", "Salesforce", "Outlook", "Slack", "Trello", "Asana", "GitHub", "Dropbox", "OneDrive", "Jira"].map((item, index) => {
                    return <Checkbox key={index} label={item} checked={false} readOnly={true} />
                })}
            </>
        </Card>
    );
});

MockConnector.displayName = "MockConnector";
