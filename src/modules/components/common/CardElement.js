import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { CustomImage } from '../../styles/CardElement.styled';
import { Grid2 } from '@mui/material';

/**
 * Card Content Component
 * @return {React.JSX.Element}
 */
const CardElement = (props) => {
  const { element, properties } = props;
  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 250,
        minHeight: 400,
        maxHeight: 400,
        overflowY: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        p: 2,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent>
        {properties.includes('titles.normalized') && element?.titles ? (
          <Typography
            variant='h6'
            component='div'
            sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', mb: 4, color: '#333' }}
            mb={5}
          >
            {element.titles.normalized}
          </Typography>
        ) : null}
        {properties.includes('title') && element?.title ? (
          <Typography
            variant='h6'
            component='div'
            sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', mb: 4, color: '#333' }}
            mb={5}
          >
            {element.title}
          </Typography>
        ) : null}
        {properties.includes('thumbnail') && element?.thumbnail ? (
          <Grid2 sx={{ display: 'flex', justifyContent: 'center' }} mb={5}>
            <CustomImage src={element.thumbnail.source} alt='thumbnail' />
          </Grid2>
        ) : null}
        {properties.includes('extract') && element?.extract ? (
          <Typography variant='body2' sx={{ textAlign: 'justify' }}>
            {element.extract}
          </Typography>
        ) : null}
        {properties.includes('description.text') && element?.description ? (
          <Typography variant='body2'>{element.description.text}</Typography>
        ) : null}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        {properties.includes('learn-more') && element?.content_urls ? (
          <Button
            size='small'
            onClick={() => {
              window.open(element.content_urls.desktop.page, '_blank', 'noopener,noreferrer');
            }}
          >
            Learn More
          </Button>
        ) : null}
        {properties.includes('full-image') && element?.thumbnail ? (
          <Button
            size='small'
            onClick={() => {
              window.open(element.thumbnail.source, '_blank', 'noopener,noreferrer');
            }}
          >
            Full Image
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

CardElement.propTypes = {
  element: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
};

export default CardElement;
