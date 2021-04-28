import { Notify } from 'quasar';

export const notify = (message: string, type: string) => {
  Notify.create({ message: message });
};
