import mockResponse from './eventData';
import { StreamEvent } from '../objects/streamEvents';
import { EventSortSettings, Order } from './eventSort';

export function fetchEvents(sort?: EventSortSettings): Promise<StreamEvent[]> {
    // TODO: replace with actual API call. This is a mock.
    return new Promise<StreamEvent[]>((resolve, reject) => {
        setTimeout(() => {
            const events: StreamEvent[] | undefined = getEvents(sort);
            if (events == null) {
                reject('Request to fetch events failed.');
            } else {
                resolve(events);
            }
        }, 1000); // 1s API response time
    });
}

function getEvents(sort?: EventSortSettings): StreamEvent[] | undefined {
    const events: StreamEvent[] = [...mockResponse.events]; // shallow copy

    if (sort) {
        // Determines sort direction. Defaults to Asc
        const sortMultiplier: number = sort.sortOrder === Order.Desc ? -1 : 1;

        if (sort.sortBy == 'timestamp') {
            return events.sort((a: StreamEvent, b: StreamEvent) =>
                a.timestamp > b.timestamp ? sortMultiplier * 1 : sortMultiplier * -1,
            );
        } else if (sort.sortBy == 'videoStream') {
            return events.sort((a: StreamEvent, b: StreamEvent) =>
                a.videoStream > b.videoStream ? sortMultiplier * 1 : sortMultiplier * -1,
            );
        } else {
            throw `Unexpected sort parameter: ${sort.sortBy}`;
        }
    }

    return events;
}
