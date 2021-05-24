import React from 'react';
import { StreamEvent } from '../../objects/streamEvents';
import { formatEpochTime, shortDateTimeFormat } from '../../utils/dateTimeUtil';
import { ScrollTable, ScrollTableColumn, ScrollTableData, MuiSortOrder } from '../../common/ScrollTable';

interface EventsTableProps {
    events?: StreamEvent[];
    className?: string;
    onSelectRow?: (selectedRow: ScrollTableData) => void;
    style?: React.CSSProperties;
    onSelectSort?: (column: ScrollTableColumn, isDesc: boolean) => void;
}

interface EventsTableState {}

export class EventsTable extends React.Component<EventsTableProps, EventsTableState> {
    constructor(props: EventsTableProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <ScrollTable
                title="Events"
                className={this.props.className}
                data={this.formatTableData()}
                columns={this.getColumnsConfiguration()}
                style={this.props.style}
                isLoading={!this.props.events}
                onSelectRow={this.props.onSelectRow}
                onSelectSort={this.props.onSelectSort}
            />
        );
    }

    private formatTableData = (): ScrollTableData[] => {
        if (this.props.events) {
            return this.props.events.map((event: StreamEvent) => {
                return {
                    id: `${event.imageSource}-${event.timestamp}`,
                    originalObject: event,
                    ...event,
                };
            });
        }
        return [];
    };

    private getColumnsConfiguration = (): ScrollTableColumn[] => {
        return [
            {
                id: 'videoStream',
                label: 'Video Stream',
                sortSettings: {
                    defaultOrder: MuiSortOrder.Asc,
                    isDefault: true,
                },
            },
            {
                id: 'timestamp',
                label: 'Time',
                sortSettings: {
                    defaultOrder: MuiSortOrder.Desc,
                },
                format: this.formatTimestamp as (row: ScrollTableData, value: unknown) => React.ReactNode,
            },
        ];
    };

    private formatTimestamp(row: ScrollTableData, timestamp: number): React.ReactNode {
        return formatEpochTime(timestamp, shortDateTimeFormat);
    }
}
