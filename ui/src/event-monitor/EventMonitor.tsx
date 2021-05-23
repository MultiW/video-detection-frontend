import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { getEvents } from '../api/eventApi';
import { StreamEvent } from '../objects/streamEvents';
import { EventsTable } from './events-table/EventsTable';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ScrollTableData } from './events-table/ScrollTable';
import EventDetails from './event-details/EventDetails';
import { getRandomColor } from '../utils/randomColor';

const styles = (theme: Theme) => ({
    container: {
        height: '100vh',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    section: {
        padding: theme.spacing(2),
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
        this.setState({
            events: await getEvents(),
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
                    <Grid item xs={12} md={9} lg={8}>
                        <Paper>
                            <EventDetails streamEvent={selectedEvent} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    private renderEventsTable = (): React.ReactNode => {
        return <EventsTable events={this.state.events} height="75vh" onSelectRow={this.onSelectEvent} />;
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
}

export default withStyles(styles, { withTheme: true })(EventMonitor);
