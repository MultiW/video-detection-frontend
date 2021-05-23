import React from 'react';
import { StreamEvent } from '../../api/streamEvents';
import { formatEpochTime, shortDateTimeFormat } from '../../utils/dateTimeUtil';
import { ScrollTable, ScrollTableColumn, ScrollTableData } from './ScrollTable';

interface EventsTableProps {
    events?: StreamEvent[];
    height?: string;
    onSelectRow?: (selectedRow: ScrollTableData) => void;
}

interface EventsTableState {}

export class EventsTable extends React.Component<EventsTableProps, EventsTableState> {
    constructor(props: EventsTableProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <ScrollTable
                title="Detected Events"
                data={this.formatTableData()}
                columns={this.getColumnsConfiguration()}
                height={this.props.height}
                isLoading={!!this.props.events}
                onSelectRow={this.props.onSelectRow}
            />
        );
    }

    private formatTableData = (): ScrollTableData[] => {
        if (this.props.events) {
            return this.props.events.map((event: StreamEvent) => {
                return {
                    id: `${event.imageSource}-${event.timestamp}`,
                    stream: event.videoStream,
                    timestamp: event.timestamp,
                    originalObject: event,
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
                format: this.formatTimestamp as (value: unknown) => React.ReactNode,
            },
        ];
    };

    private formatTimestamp(timestamp: number): React.ReactNode {
        return formatEpochTime(timestamp, shortDateTimeFormat);
    }
}
