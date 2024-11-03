
export const millisToDateString = (millis: number) => {
    const date = new Date(millis);
    const m = date.getMonth() + 1;
    const month = (m < 10 ? '0' : '') + m.toString();
    const day = (date.getDate() < 10 ? '0': '') + date.getDate().toString();
    return `${day}.${month}.${date.getFullYear()}`
}

export const millisToUtcDate = (millis: number) => {
    const date = new Date(millis);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return utcDate;
}

const paddedNumberString = (num: number) => {
    return num < 10 ? ('0' + num.toString()) : num.toString();
}

export const millisToTimeSpan = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);
    const secondsStr = paddedNumberString(seconds);
    const minutesStr = paddedNumberString(minutes);
    const hoursStr = paddedNumberString(hours);
    if (days > 0) {
        return `${days}d${hoursStr}:${minutesStr}:${secondsStr}`;
    }
    else {
        return `${hoursStr}:${minutesStr}:${secondsStr}`;
    }
}
