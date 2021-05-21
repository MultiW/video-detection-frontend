import React from 'react';
import { getEvents } from '../api/event-api';
import { StreamEvents } from '../api/stream-events';

interface EventMonitorProps {}

interface EventMonitorState {
    isLoaded: boolean;
    events?: StreamEvents;
}

export class EventMonitor extends React.Component<EventMonitorProps, EventMonitorState> {
    constructor(props: EventMonitorProps) {
        super(props);

        this.state = {
            isLoaded: false,
            events: undefined,
        };
    }

    async componentDidMount(): Promise<void> {
        this.setState({
            isLoaded: true,
            events: await getEvents(),
        });
    }

    render(): React.ReactNode {
        return <div>ABC</div>;
    }
}
