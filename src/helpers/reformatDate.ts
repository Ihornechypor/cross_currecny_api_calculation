import { format } from 'date-fns';

export const reformatDate = (date: Date, type: string) => format(date, type);
