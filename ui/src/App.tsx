import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import EventMonitor from './event-monitor/EventMonitor';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: 'flex',
        },
        title: {
            paddingTop: theme.spacing(2),
            color: 'colorTextPrimary',
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
                        <Typography align="center" component="h1" variant="h6">
                            Video Stream Monitor
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <EventMonitor />
                </main>
                {/* <Container component="main" className={this.props.classes.root} maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={this.props.classes.title} align="center" component="h1" variant="h3">
                                Video Stream Monitor
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <EventMonitor />
                        </Grid>
                    </Grid>
                </Container> */}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);
