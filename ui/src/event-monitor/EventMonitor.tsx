import React from 'react';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { getEvents } from '../api/eventApi';
import { StreamEvent } from '../api/streamEvents';
import { EventsTable } from './EventsTable';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ScrollTableData } from './ScrollTable';
import EventDetails from './EventDetails';

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
                    <Grid item xs={12} md={3} lg={4}>
                        <Paper className={classes.section}>{this.renderEventsTable()}</Paper>
                    </Grid>
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
            // Select row
            this.setState({ selectedEvent: row.originalObject as StreamEvent });
        }
    };
}

export default withStyles(styles, { withTheme: true })(EventMonitor);
