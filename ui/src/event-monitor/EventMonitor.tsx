import React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { fetchEvents } from '../api/eventApi';
import { StreamEvent } from '../objects/streamEvents';
import { EventsTable } from './events-table/EventsTable';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ScrollTableColumn, ScrollTableData } from '../common/ScrollTable';
import EventDetails from './event-details/EventDetails';
import { getRandomColor } from '../utils/randomColor';
import { Order } from '../api/eventSort';

const styles = (theme: Theme) =>
    createStyles({
        container: {
            height: '75vh',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            position: 'relative',
        },
        section: {
            padding: theme.spacing(2),
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
    selectedEvent?: StreamEvent;
}

class EventMonitor extends React.Component<EventMonitorProps, EventMonitorState> {
    constructor(props: EventMonitorProps) {
        super(props);

        this.state = {
            events: undefined,
        };
    }

    async componentDidMount(): Promise<void> {
        // TODO: somehow sync the default sorting between the API call here and the default sorting configured in EventsTable
        this.setState({
            events: await fetchEvents({ sortBy: 'videoStream', sortOrder: Order.Asc }),
        });
    }

    render(): React.ReactNode {
        const { classes } = this.props;
        const { selectedEvent } = this.state;

        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Left side of page: Table of all detected events */}
                    <Grid item xs={12} md={3} lg={4}>
                        <Paper className={classes.section}>{this.renderEventsTable()}</Paper>
                    </Grid>
                    {/* Right side of page: Image and predictions of the user selected event */}
                    <Grid item xs={12} md={9} lg={8} className={classes.eventDetailsGrid}>
                        <EventDetails streamEvent={selectedEvent} />
                    </Grid>
                </Grid>
            </Container>
        );
    }

    private renderEventsTable = (): React.ReactNode => {
        return (
            <EventsTable
                events={this.state.events}
                className={this.props.classes.eventsTable}
                onSelectRow={this.onSelectEvent}
                onSelectSort={this.onSelectSort}
            />
        );
    };

    private onSelectEvent = (row: ScrollTableData) => {
        if (this.state.selectedEvent === row.originalObject) {
            // Deselect row
            this.setState({ selectedEvent: undefined });
        } else {
            const selectedStreamEvent: StreamEvent = row.originalObject as StreamEvent;

            // assign colors to each predictions
            for (let i = 0; i < selectedStreamEvent.predictions.length; i++) {
                selectedStreamEvent.predictions[i].color = getRandomColor();
            }

            // Select row
            this.setState({ selectedEvent: selectedStreamEvent });
        }
    };

    private onSelectSort = async (column: ScrollTableColumn, isDesc: boolean): Promise<void> => {
        // Clear table data
        this.setState({ events: undefined });

        if (column.sortSettings) {
            const sortOrder: Order = isDesc ? Order.Desc : Order.Asc;
            this.setState({
                events: await fetchEvents({ sortBy: column.id, sortOrder: sortOrder }),
            });
        }
    };
}

export default withStyles(styles, { withTheme: true })(EventMonitor);
