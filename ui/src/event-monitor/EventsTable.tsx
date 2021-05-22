import React from 'react';
import { StreamEvent } from '../api/stream-events';
import { ScrollTable, ScrollTableColumn, ScrollTableData } from './ScrollTable';

interface EventsTableProps {
    id?: string;
    events: StreamEvent[];
}

interface EventsTableState {}

export class EventsTable extends React.Component<EventsTableProps, EventsTableState> {
    constructor(props: EventsTableProps) {
        super(props);
    }

    render(): React.ReactNode {
        return <ScrollTable data={this.formatTableData()} columns={this.getColumnsConfiguration()} />;
    }

    private formatTableData = (): ScrollTableData[] => {
        if (this.props.events) {
            return this.props.events.map((event: StreamEvent) => {
                return {
                    id: `${event.imageSource}-${event.timestamp}`,
                    stream: event.videoStream,
                    timestamp: event.timestamp,
                };
            });
        }
        return [];
    };

    private getColumnsConfiguration = (): ScrollTableColumn[] => {
        return [
            {
                id: 'stream',
                label: 'Video Stream',
            },
            {
                id: 'timestamp',
                label: 'Time',
            },
        ];
    };
}
