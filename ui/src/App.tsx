import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import EventMonitor from './event-monitor/EventMonitor';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = createStyles({
    root: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
    },
});

class App extends React.Component<WithStyles<typeof styles>> {
    constructor(props: WithStyles<typeof styles>) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography component="h1" variant="h6">
                            Video Stream Events
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={this.props.classes.root}>
                    <EventMonitor />
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(App);
