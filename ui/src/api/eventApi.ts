import mockResponse from './eventData';
import { StreamEvent, Score } from './streamEvents';
import { EventSortSettings, Order } from './eventSort';
import EventFilter from './eventFilter';

export function fetchEvents(sort?: EventSortSettings, filter?: EventFilter): Promise<StreamEvent[]> {
    // TODO: replace with actual API call. This is a mock.
    return new Promise<StreamEvent[]>((resolve, reject) => {
        setTimeout(() => {
            const events: StreamEvent[] | undefined = getEvents(sort, filter);
            if (events == null) {
                reject('Request to fetch events failed.');
            } else {
                resolve(events);
            }
        }, 1000); // 1s API response time
    });
}

function getEvents(sort?: EventSortSettings, filter?: EventFilter): StreamEvent[] | undefined {
    let events: StreamEvent[] = [...mockResponse.events]; // shallow copy

    if (filter) {
        events = events.filter((value: StreamEvent) => {
            for (let i = 0; i < value.predictions.length; i++) {
                for (let j = 0; j < value.predictions[i].scores.length; j++) {
                    const score: Score = value.predictions[i].scores[j];
                    const min: number | undefined = filter.scoreRange?.min;
                    const max: number | undefined = filter.scoreRange?.max;

                    // Filter for label. Keep if filter.label is not set
                    const matchesLabelsFilter: boolean =
                        !filter.label || filter.label.toLowerCase() == score.label.toLowerCase();

                    // Filter for score. Keep if filter's min/max is not set
                    const matchesScoresFilter: boolean =
                        (min === undefined || score.score >= min) && (max === undefined || score.score <= max);

                    if (matchesLabelsFilter && matchesScoresFilter) {
                        // Keep event because this score passes all filters
                        return true;
                    }
                }
            }
            return false;
        });
    }

    if (sort) {
        // Determines sort direction. Defaults to Asc
        const sortMultiplier: number = sort.sortOrder === Order.Desc ? -1 : 1;

        if (sort.sortBy == 'timestamp') {
            events = events.sort((a: StreamEvent, b: StreamEvent) =>
                a.timestamp > b.timestamp ? sortMultiplier * 1 : sortMultiplier * -1,
            );
        } else if (sort.sortBy == 'videoStream') {
            events = events.sort((a: StreamEvent, b: StreamEvent) =>
                a.videoStream > b.videoStream ? sortMultiplier * 1 : sortMultiplier * -1,
            );
        } else {
            throw `Unexpected sort parameter: ${sort.sortBy}`;
        }
    }

    return events;
}
