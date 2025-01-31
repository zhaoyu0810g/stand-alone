import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../../store';

export const Chat: React.FC = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ user: string, bot: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const count = useSelector((state: any) => state.counter.value)
    const dispatch = useDispatch()

    const chatGPTToken = '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'; // Replace with your actual token

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!message.trim()) return;

        const newMessage = { user: message, bot: '' };
        setChatHistory([...chatHistory, newMessage]);
        setMessage('');
        setLoading(true);

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4o',
                    //   model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: `You are a helpful assistant. All your responses should strictly follow the JSON format below:
                            {
                              "title": "Document Title",
                              "summary": "A short summary of the document",
                              "content": "The detailed content of the document"
                            }
                      
                            Any response you give must be structured exactly as shown, and include only the required fields. Do not provide any other information or commentary.`
                        },
                        { role: 'user', content: message }
                    ],
                    max_tokens: 150,
                    temperature: 0.7,
                },
                {
                    headers: {
                        Authorization: `Bearer ${chatGPTToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const botMessage = response.data.choices[0].message.content.trim(); // Adjusted to match response structure
            setChatHistory((prev) => [...prev, { user: message, bot: botMessage }]);
        } catch (error) {
            console.error('Error fetching response from ChatGPT:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment {count}
            </button>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <p><strong>You:</strong> {chat.user}</p>
                        <p><strong>ChatGPT:</strong> {chat.bot}</p>
                    </div>
                ))}
                {loading && <p>Loading...</p>}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type your message here..."
                    style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                />
                <button type="submit" style={{ padding: '8px', marginTop: '10px' }}>Send</button>
            </form>
        </div>
    );
};
