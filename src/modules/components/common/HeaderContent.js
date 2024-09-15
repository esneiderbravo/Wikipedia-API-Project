import React from 'react';
import { Grid } from '@mui/material';
import NotificationContent from '../notification/NotificationContent';

/**
 * Header Content Component
 * @return {React.JSX.Element}
 */
const HeaderContent = () => {
  return (
    <Grid container spacing={2} justifyContent='center' position='fixed'>
      <Grid item xs={12} md={8} display='flex' justifyContent='center'>
        <NotificationContent />
      </Grid>
    </Grid>
  );
};

export default HeaderContent;
