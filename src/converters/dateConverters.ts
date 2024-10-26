
export const ticksToDateString = (ticks: number) => {
    const date = new Date(ticks);
    const m = date.getMonth() + 1;
    const month = (m < 10 ? '0' : '') + m.toString();
    const day = (date.getDate() < 10 ? '0': '') + date.getDate().toString();
    return `${day}.${month}.${date.getFullYear()}`
}

export const ticksToUtcDate = (ticks: number) => {
    const date = new Date(ticks);
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return utcDate;
}
