import React, { ReactNode, memo, useMemo } from 'react';
import { ChatResponse, Message } from '../../types';
import { List, ListItem, Text, Checkbox, Button, Tooltip } from '@fluentui/react-components';
import styles from "./PrepareMyDay.module.scss";
import { CalendarAddRegular, CalendarMonthRegular, WarningRegular } from '@fluentui/react-icons/fonts';
import { StoreState } from '../../redux/store';
import { useSelector } from 'react-redux';

// const data = JSON.parse("{\"summaryOftheDay\":\"Here is your day's breakdown across events and tasks.\",\"agenda\":[{\"startTime\":\"7:30 AM\",\"endTime\":\"8:30 AM\",\"agendaSubject\":\"Dentist Appointment\",\"agendaDetails\":\"Routine check-up and cleaning before starting the day.\",\"myPreparation\":\"\",\"source\":\"Google Personal Calendar\",\"isHighPriority\":false},{\"startTime\":\"10:00 AM\",\"endTime\":\"12:00 PM\",\"agendaSubject\":\"Meeting with AI Ethics Committee\",\"agendaDetails\":\"Join the ethics committee to discuss guidelines for responsible AI development.\",\"myPreparation\":\"Prepare notes on current AI systems ethics implications.\",\"source\":\"Zoom Working Calendar\",\"isHighPriority\":true},{\"startTime\":\"1:30 PM\",\"endTime\":\"3:00 PM\",\"agendaSubject\":\"Deep Learning Model Review\",\"agendaDetails\":\"Review the recent improvements in neural network architecture with the R&D team.\",\"myPreparation\":\"Bring prepared visualizations on model performance statistics.\",\"source\":\"Zoom Working Calendar\",\"isHighPriority\":true},{\"startTime\":\"3:30 PM\",\"endTime\":\"5:00 PM\",\"agendaSubject\":\"Algorithm Optimization and Performance Tuning\",\"agendaDetails\":\"Analyze current algorithm's efficiency and explore optimization techniques.\",\"myPreparation\":\"Prepare a report on resource utilization.\",\"source\":\"Zoom Working Calendar\",\"isHighPriority\":true},{\"startTime\":\"5:30 PM\",\"endTime\":\"6:30 PM\",\"agendaSubject\":\"Weekly AI Engineering Team Sync\",\"agendaDetails\":\"Weekly sync meeting to address team progress and upcoming deadlines.\",\"myPreparation\":\"Prepare a summary document of your team's achievements.\",\"source\":\"Zoom Working Calendar\",\"isHighPriority\":false},{\"startTime\":\"7:00 PM\",\"endTime\":\"9:00 PM\",\"agendaSubject\":\"Dinner with Family\",\"agendaDetails\":\"Reservation at Le Gourmet to celebrate Dad's birthday.\",\"myPreparation\":\"\",\"source\":\"Google Personal Calendar\",\"isHighPriority\":false}],\"todos\":[{\"shortSummary\":\"Reply to Tom about lunch plans.\",\"source\":\"Messengers from Friends\",\"isHighPriority\":false},{\"shortSummary\":\"Pick up groceries: veggies and milk.\",\"source\":\"Messengers from Wife and Mom\",\"isHighPriority\":true},{\"shortSummary\":\"Check the weather forecast for Seattle.\",\"source\":\"Messengers from Wife and Mom\",\"isHighPriority\":false}],\"reply\":\"Today is filled with important meetings, personal appointments, and family time. Be sure to prepare your notes and reports for the meetings, pick up groceries later, and remember to celebrate your Dad's birthday with dinner in the evening.\"}") as ChatResponse;

export const DisplayHighPriority: React.FC<{ isHighPriority: boolean }> = memo(({ isHighPriority }) => {
    if (isHighPriority) {
        return <Text style={{ color: 'red' }}><WarningRegular /></Text>
    }

    return null;
});

DisplayHighPriority.displayName = "DisplayHighPriority";

export const PrepareMyDay: React.FC = memo((): ReactNode => {
    const messages: Message[] = useSelector((state: StoreState) => state.messages.messages);
    const data = useMemo(() => {
        for (let i = messages.length - 1; i >= 0; i--) {
            const message = messages[i];
            if (message.role === 'assistant' && message.content && message.content[0] === '{') {
                const response = JSON.parse(message.content) as ChatResponse;
                if (response.agenda && response.agenda.length && response.todos && response.todos.length) {
                    return response;
                }
            }
        }
    }, [messages]);

    if (!data) {
        return null;
    }

    return (
        <div className={styles.mainContainer}>
            <div>
                <Text>{data.summaryOftheDay}</Text>
            </div>
            <div className={styles.section}>
                <Text weight='semibold'>
                    Agenda
                </Text>
                <List>
                    {data.agenda.map((item, index) => (
                        <ListItem key={index} style={{ marginBottom: '10px' }}>
                            <div>
                            <Text><DisplayHighPriority isHighPriority={item.isHighPriority} /><strong>{item.startTime} - {item.endTime}</strong> {item.agendaSubject}</Text>
                            <span className={styles.icon}>
                                <Tooltip content="Schedule a meeting" relationship="label">
                                    <Button size="small" icon={<CalendarMonthRegular />} />
                                </Tooltip>
                                <Tooltip content="Create a document" relationship="label">
                                    <Button size="small" icon={<CalendarAddRegular />} />
                                </Tooltip>
                            </span>
                            </div>
                            <div style={{color: "grey"}}>{item.agendaDetails}</div>
                            {/* <Text>Source: {item.source}</Text> */}
                            <div>
                                {item.myPreparation &&  <Checkbox style={{ color: 'blue' }} label={item.myPreparation} />}
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>
            <div className={styles.section}>
                <Text weight='semibold'>
                    To-Do List
                </Text>
                <List>
                    {data.todos.map((todo, index) => (
                        <ListItem key={index} style={{ marginBottom: '10px' }}>
                            <Checkbox label={todo.shortSummary} />
                            {/* <Text >Source: {todo.source}</Text> */}
                            <span className={styles.icon}>                                
                                <Tooltip content="Schedule a meeting" relationship="label">
                                    <Button size="small" icon={<CalendarMonthRegular />} />
                                </Tooltip>
                            </span>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
});

PrepareMyDay.displayName = "PrepareMyDay";
