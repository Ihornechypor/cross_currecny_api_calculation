import { subDays, parse } from 'date-fns';

export const updateSubDays = (date: string, day: number, type: string) => subDays(parse(date, type, new Date()), day);
