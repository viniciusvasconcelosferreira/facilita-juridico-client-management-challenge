import { format, parseISO } from 'date-fns';

export const addDateMask = (dateString, mask = 'dd/MM/yyyy HH:mm:ss') => {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, mask);
};