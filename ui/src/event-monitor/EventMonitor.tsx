import React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { fetchEvents } from '../api/eventApi';
import { StreamEvent } from '../api/streamEvents';
import { EventsTable } from './events-table/EventsTable';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ScrollTableColumn } from '../common/ScrollTable';
import EventDetails from './event-details/EventDetails';
import { getRandomColor } from '../utils/randomColor';
import { Order } from '../api/eventSort';
import EventFilter from './../api/eventFilter';
import { EventSortSettings } from './../api/eventSort';
import cloneDeep from 'lodash/cloneDeep';

const styles = (theme: Theme) =>
    createStyles({
        container: {
            height: '75vh',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            position: 'relative',
        },
        eventsTableSection: {
            padding: theme.spacing(2),
            paddingTop: 0,
        },
        eventsTable: { height: '75vh' },
        eventDetailsGrid: {
            display: 'flex',
            flexDirection: 'column',
        },
    });

interface EventMonitorProps extends WithStyles<typeof styles> {}

interface EventMonitorState {
    events?: StreamEvent[];
    selectedRowIndex?: number;
    filter: EventFilter;
    sort?: EventSortSettings;
}

class EventMonitor extends React.Component<EventMonitorProps, EventMonitorState> {
    constructor(props: EventMonitorProps) {
        super(props);

        this.state = {
            events: undefined,
            filter: this.blankFilter,
        };
    }

    async componentDidMount(): Promise<void> {
        // Fetch events
        // TODO: somehow sync the default sorting between the API call here and the default sorting configured in EventsTable
        const defaultSort: EventSortSettings = {
            sortBy: 'videoStream',
            sortOrder: Order.Asc,
        };
        this.setState({
            events: await fetchEvents(defaultSort),
            sort: defaultSort,
        });
    }

    render(): React.ReactNode {
        const { classes } = this.props;
        const { filter, selectedRowIndex } = this.state;

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Left side of page: Table of all detected events */}
                    <Grid item xs={12} md={3} lg={4}>
                        <Paper className={classes.eventsTableSection}>
                            <EventsTable
                                events={this.state.events}
                                className={this.props.classes.eventsTable}
                                onSelectRow={this.onSelectEvent}
                                selectedRowIndex={selectedRowIndex}
                                onSelectSort={this.onSelectSort}
                                // Filter
                                filterConfig={{
                                    updateFilter: this.updateFilter,
                                    filter: filter,
                                    isFilterApplied: !this.isFilterBlank(),
                                }}
                            />
                        </Paper>
                    </Grid>
                    {/* Right side of page: Image and predictions of the user selected event */}
                    <Grid item xs={12} md={9} lg={8} className={classes.eventDetailsGrid}>
                        <EventDetails streamEvent={this.getSelectedEvent()} />
                    </Grid>
                </Grid>
            </Container>
        );
    }

    private isFilterBlank = (): boolean => {
        const { filter } = this.state;
        return !filter.label && filter.scoreRange?.min == null && filter.scoreRange?.max == null;
    };

    private blankFilter: EventFilter = { label: '', scoreRange: {} };

    private updateFilter = async (filter: EventFilter) => {
        const { sort } = this.state;

        this.clearTable();
        this.clearSelection();

        this.setState({
            filter: cloneDeep(filter),
            events: await fetchEvents(sort, filter),
        });
    };

    private onSelectEvent = (selectedRowIndex?: number) => {
        const { events } = this.state;
        this.setState({ selectedRowIndex: selectedRowIndex });

        if (selectedRowIndex != null && events != null) {
            const selectedEvent: StreamEvent = events[selectedRowIndex];

            // assign colors to each predictions
            for (let i = 0; i < selectedEvent.predictions.length; i++) {
                selectedEvent.predictions[i].color = getRandomColor();
            }
        }
    };

    private onSelectSort = async (column: ScrollTableColumn, isDesc: boolean): Promise<void> => {
        const sortOrder: Order = isDesc ? Order.Desc : Order.Asc;
        const newSortSettings: EventSortSettings = { sortBy: column.id, sortOrder: sortOrder };

        this.clearTable();
        this.clearSelection();

        if (column.sortSettings) {
            this.setState({
                sort: newSortSettings,
                events: await fetchEvents(newSortSettings, this.state.filter),
            });
        }
    };

    private clearTable = () => {
        this.setState({ events: undefined });
    };

    private clearSelection = () => {
        this.setState({ selectedRowIndex: undefined });
    };

    private getSelectedEvent = (): StreamEvent | undefined => {
        const { events, selectedRowIndex } = this.state;

        if (events != null && selectedRowIndex != null) {
            return events[selectedRowIndex];
        }
        return undefined;
    };
}

export default withStyles(styles, { withTheme: true })(EventMonitor);
