import { subDays, parse } from 'date-fns';

export const updateSubDays = (date: string, day: number) => subDays(parse(date, 'MMM d, yyyy', new Date()), day);
