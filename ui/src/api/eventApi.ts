import mockResponse from './eventData';
import { StreamEvent } from '../objects/streamEvents';

export function getEvents(): Promise<StreamEvent[]> {
    // TODO: replace with actual API call. This is a mock.
    return new Promise<StreamEvent[]>((resolve) => {
        console.log('Making API call for events.');
        setTimeout(() => {
            resolve(mockResponse.events);
        }, 1000); // 1s API response time
    });
}
