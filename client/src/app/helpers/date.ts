import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

const now = new Date();

const dateToStr = (date: Date) => format(date, 'd, LLL', { locale: ru });

export const todayString = dateToStr(now)
  .split('')
  .filter((str) => str !== ',' && str !== '.')
  .join('');
