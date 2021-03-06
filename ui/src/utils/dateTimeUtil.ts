import dayjs from 'dayjs';

export const shortDateTimeFormat = 'M/D/YYYY HH:mm:ss';
export const longDateTimeFormat = 'MMM D, YYYY h:mm A';

/**
 * Formats the given Epoch time. Use the user's device's timezone.
 *
 * epochSeconds: epoch UTC time
 */
export function formatEpochTime(epochSeconds: number, formatTemplate: string): string {
    return dayjs.unix(epochSeconds).format(formatTemplate);
}
