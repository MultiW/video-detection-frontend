import React from 'react';
import './App.css';
import { EventMonitor } from './event-monitor/event-monitor';

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="App">
                <EventMonitor />
            </div>
        );
    }
}

export default App;
