import React from 'react';
import { Grid2 } from '@mui/material';
import NotificationContent from '../notification/NotificationContent';
import { CustomBox } from '../../styles/Dashboard.styled';

/**
 * Header Content Component
 * @return {React.JSX.Element}
 */
const HeaderContent = () => {
  return (
    <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2}>
      <Grid2 item xs={12} md={8} display='flex' justifyContent='center'>
        <NotificationContent />
      </Grid2>
    </CustomBox>
  );
};

export default HeaderContent;
