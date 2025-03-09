import { differenceInDays, differenceInSeconds, parseISO, format, parse } from "date-fns";

type TimeInfo = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function timeCalculate(time: string, currentDate: Date): TimeInfo {
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(time)) {
        throw new Error("日期格式必须为yyyy-MM-dd HH:mm");
    }
    const startDateObj = parse(time, "yyyy-MM-dd HH:mm", new Date());
    const sendsDifference = differenceInSeconds(currentDate, startDateObj);
    const daysInfo = {
        days: Math.floor(sendsDifference / (24 * 60 * 60)),
        hours: Math.floor((sendsDifference % (24 * 60 * 60)) / (60 * 60)),
        minutes: Math.floor((sendsDifference % (60 * 60)) / 60),
        seconds: Math.floor(sendsDifference % 60),
    };

    return daysInfo;
}
