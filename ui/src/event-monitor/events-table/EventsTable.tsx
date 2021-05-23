import React from 'react';
import { StreamEvent } from '../../objects/streamEvents';
import { formatEpochTime, shortDateTimeFormat } from '../../utils/dateTimeUtil';
import { ScrollTable, ScrollTableColumn, ScrollTableData } from '../../common/ScrollTable';

interface EventsTableProps {
    events?: StreamEvent[];
    className?: string;
    onSelectRow?: (selectedRow: ScrollTableData) => void;
    style?: React.CSSProperties;
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
                className={this.props.className}
                data={this.formatTableData()}
                columns={this.getColumnsConfiguration()}
                style={this.props.style}
                isLoading={!this.props.events}
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
