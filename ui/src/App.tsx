import React from 'react';
import { EventMonitor } from './event-monitor/EventMonitor';
import Container from '@material-ui/core/Container';

class App extends React.Component {
    render(): React.ReactNode {
        return (
            // <Container maxWidth="lg">
            //     <EventMonitor />
            // </Container>
            <main>
                <EventMonitor />
            </main>
        );
    }
}

export default App;
