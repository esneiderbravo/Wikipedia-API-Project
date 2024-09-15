import React, { useContext, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AppContext from '../../context/app';

const NotificationContent = () => {
  const [notificationType, setNotificationType] = useState(null);
  const [notificationInfo, setNotificationInfo] = useState(null);
  const [state] = useContext(AppContext);
  const { notification } = state;

  useEffect(() => {
    setNotificationType(notification.type);
    setNotificationInfo(notification.info);

    const timeoutId = setTimeout(() => {
      setNotificationType(null);
      setNotificationInfo(null);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  return (
    <>
      {notificationType && (
        <Alert severity={notificationType} sx={{ width: '40%' }}>
          {notificationInfo}
        </Alert>
      )}
    </>
  );
};

NotificationContent.propTypes = {};

export default NotificationContent;
