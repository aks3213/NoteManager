const isoTimestamp = "2023-12-23T09:25:21.043Z";
const date = new Date(isoTimestamp);

// Formatting options for date and time
const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
};

// Convert to a human-readable string
export const humanReadableTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString('en-US', options);
}
