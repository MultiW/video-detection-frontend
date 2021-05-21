import mockResponse from './event_data';
import { StreamEvents } from './stream-events';

export function getEvents(): Promise<StreamEvents> {
    // TODO: replace with actual API call. This is a mock.
    return new Promise<StreamEvents>((resolve) => {
        console.log('Making API call for events.');
        setTimeout(() => {
            resolve(mockResponse);
        }, 1000); // 1s API response time
    });
}
