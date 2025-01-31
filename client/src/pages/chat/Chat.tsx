import React, { useState } from 'react';
import { chatService } from '../../service/chatService';
import { Message } from '../../types';

// const count = useSelector((state: any) => state.counter.value)
// const dispatch = useDispatch()
// dispatch(increment())

const MessageDisplay: React.FC<{ message: Message }> = ({ message }) => {
    if (!message) return null;

    let content = message.content;
    if (message.role === 'assistant' && message.content[0] === "{") {
        content = JSON.parse(message.content).reply;
    }

    return <div >
        <p><strong>{message.role}</strong> {content}</p>
    </div>
};

export const Chat: React.FC = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!message.trim()) return;

        const userMessage: Message = { role: 'user', content: message };
        const newMessages = [...chatHistory, userMessage];

        const assistantMessage: Message = { role: 'assistant', content: '...' };
        setChatHistory([...newMessages, assistantMessage]);
        setMessage('');
        setLoading(true);

        try {
            const response = await chatService.post(newMessages);
            setChatHistory(response.data);
        } catch (error) {
            console.error('Error fetching response from ChatGPT:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {chatHistory.map((message, index) => (
                    <MessageDisplay message={message} key={index} />
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
