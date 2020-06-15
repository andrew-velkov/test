import * as type from 'constants/other';

export const addNotification = (data) => ({
  type: type.NOTIFICATION_ADD,
  payload: data,
});

export const removeNotification = (data) => ({
  type: type.NOTIFICATION_REMOVE,
  payload: data,
});
