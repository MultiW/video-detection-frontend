import React from 'react';
import { getEvents } from '../api/event-api';
import { StreamEvent } from '../api/stream-events';
import { EventsTable } from './EventsTable';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

interface EventMonitorProps {}

interface EventMonitorState {
    events?: StreamEvent[];
}

export class EventMonitor extends React.Component<EventMonitorProps, EventMonitorState> {
    constructor(props: EventMonitorProps) {
        super(props);

        this.state = {
            events: undefined,
        };
    }

    async componentDidMount(): Promise<void> {
        this.setState({
            events: await getEvents(),
        });
    }

    render(): React.ReactNode {
        return (
            <Container maxWidth="lg">
                {this.renderEventsTable()}
                {<div></div>}
            </Container>
        );
    }

    private renderEventsTable = (): React.ReactNode => {
        if (this.state.events) {
            return <EventsTable id="events-table-section" events={this.state.events} />;
        }
        return <CircularProgress />;
    };
}
