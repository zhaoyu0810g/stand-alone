import { Button, Card } from '@fluentui/react-components';
import React, { ReactNode, memo, useCallback, useEffect, useState } from 'react';
import { ragMockService } from '../../service/ragMockService';

export const MockDataPage: React.FC = memo((): ReactNode => {
    const [jsonData, setJsonData] = useState<string>("...");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const result = await ragMockService.get();
            setJsonData(JSON.stringify(result.data, null, 4));
            setIsLoading(false);
        })();
    }, []);

    const handleSave = useCallback(async () => {
        try {
            setIsLoading(true);
            await ragMockService.update(jsonData);
        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [jsonData]);

    const handleRegenerate = useCallback(async () => {
        try {
            setIsLoading(true);
            const result = await ragMockService.gen();
            setJsonData(JSON.stringify(result.data, null, 4));
        } catch (error) {
            console.error("Error saving data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJsonData(event.target.value)
    }, []);

    return (
        <Card style={{ width: "100%", height: "100%" }}>
            <h2>
                Adjust RAG Retrieval Results for Testing
            </h2>
            <p>Assuming that the retrieval process can collected below text from platforms such as Zoom Workspaces, Google Calendar, Google Docs etc... </p>
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
