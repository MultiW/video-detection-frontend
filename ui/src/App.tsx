import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import EventMonitor from './event-monitor/EventMonitor';

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
            <main className={this.props.classes.root}>
                <EventMonitor />
            </main>
        );
    }
}

export default withStyles(styles)(App);
