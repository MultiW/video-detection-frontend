import React from 'react';
import { StreamEvent } from '../../api/streamEvents';
import { formatEpochTime, shortDateTimeFormat } from '../../utils/dateTimeUtil';
import { ScrollTable, ScrollTableColumn, ScrollTableData, MuiSortOrder } from '../../common/ScrollTable';
import EventsFilterDialog, { EventsFilterFormValues } from './EventsFilterDialog';
import EventFilter from '../../api/eventFilter';

interface FilterConfig {
    filter: EventFilter; // current filter applied to data
    updateFilter: (filter: EventFilter) => void;
    isFilterApplied: boolean; // are any filters applied to the data
}

interface EventsTableProps {
    events?: StreamEvent[];
    className?: string;
    style?: React.CSSProperties;

    // Row selection
    onSelectRow?: (selectedRowIndex?: number) => void;
    selectedRowIndex?: number;

    onSelectSort?: (column: ScrollTableColumn, isDesc: boolean) => void;
    filterConfig: FilterConfig;
}

interface EventsTableState {
    filterDialogOpen: boolean;
}

export class EventsTable extends React.Component<EventsTableProps, EventsTableState> {
    constructor(props: EventsTableProps) {
        super(props);
        this.state = {
            filterDialogOpen: false,
        };
    }

    render(): React.ReactNode {
        const { className, events, onSelectRow, selectedRowIndex, onSelectSort, style, filterConfig } = this.props;
        const { filter, isFilterApplied } = filterConfig;
        const { filterDialogOpen } = this.state;

        return (
            <React.Fragment>
                <ScrollTable
                    title="Events"
                    className={className}
                    data={this.formatTableData()}
                    columns={this.getColumnsConfiguration()}
                    style={style}
                    isLoading={!events}
                    onSelectRow={onSelectRow}
                    selectedRowIndex={selectedRowIndex}
                    onSelectSort={onSelectSort}
                    // Filter
                    onClickFilter={this.handleClickOpen}
                    isFilterApplied={isFilterApplied}
                />
                <EventsFilterDialog
                    open={filterDialogOpen}
                    handleClose={this.handleClose}
                    handleSubmit={this.handleSubmit}
                    initialFormValues={{
                        label: filter?.label ?? '',
                        scoreRange: {
                            min: filter?.scoreRange?.min,
                            max: filter?.scoreRange?.max,
                        },
                    }}
                />
            </React.Fragment>
        );
    }

    // ==============
    // === Filter ===
    // ==============

    private handleClickOpen = () => {
        this.setState({ filterDialogOpen: true });
    };

    private handleClose = () => {
        this.setState({ filterDialogOpen: false });
    };

    private handleSubmit = (values: EventsFilterFormValues) => {
        this.handleClose();

        this.props.filterConfig.updateFilter({
            label: values.label,
            scoreRange: {
                min: values.scoreRange.min == '' ? undefined : values.scoreRange.min,
                max: values.scoreRange.max == '' ? undefined : values.scoreRange.max,
            },
        });
    };

    // =============
    // === Table ===
    // =============

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
