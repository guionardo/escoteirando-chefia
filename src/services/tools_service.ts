import { Notify } from 'quasar';

export const notify = (message: string, type: string) => {
  Notify.create({ message: message, type: type });
};

export function dateAgeInSeconds (date: Date): number {
  return (new Date().getTime() - new Date(date).getTime()) / 1000
}