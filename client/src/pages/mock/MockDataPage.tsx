import { Button, Card } from '@fluentui/react-components';
import React, { ReactNode, memo, useCallback, useEffect, useState } from 'react';
import { ragMockService } from '../../service/ragMockService';

export const MockDataPage: React.FC = memo((): ReactNode => {
    const [jsonData, setJsonData] = useState<string>("...");
    const [isLoading, setIsLoading] = useState(false);

    const executeAsync = useCallback(async (asyncFn: () => Promise<unknown>) => {
        try {
            setIsLoading(true);
            const result = await asyncFn();
            setJsonData(JSON.stringify(result, null, 4));
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        executeAsync(async () => {
            const result = await ragMockService.get();
            return result.data;
        });
    }, [executeAsync]);

    const handleSave = useCallback(() => {
        executeAsync(async () => {
            const result = await ragMockService.update(jsonData);
            return result.data;
        });
    }, [jsonData, executeAsync]);

    const handleRegenerate = useCallback(() => {
        executeAsync(async () => {
            const result = await ragMockService.gen();
            return result.data;
        });
    }, [executeAsync]);


    const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonData(event.target.value)
    }, []);

    return (
        <Card style={{ width: "100%", height: "100%" }}>
            <h2>
                Adjust RAG Retrieval Results for Testing
            </h2>
            <p>Assuming that the retrieval process collected below text from platforms such as Zoom Workspaces, Google Calendar, Google Docs etc... </p>
            <p>You can modify this mock data and use it to pose questions on the chat page.</p>
            <div>
                <Button appearance="primary" onClick={handleSave} disabled={isLoading}>Save to server</Button>
                <Button onClick={handleRegenerate} disabled={isLoading}>Regenerate (By ChatGPT)</Button>
            </div>
            <textarea
                style={{
                    width: "100%",
                    height: "100%",
                }}
                disabled={isLoading}
                value={jsonData}
                onChange={onChange}
            />
        </Card>
    );
});

MockDataPage.displayName = "MockDataPage";
