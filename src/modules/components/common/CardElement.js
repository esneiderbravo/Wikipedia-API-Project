import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { CustomCard, CustomImage, StyledStamp } from '../../styles/CardElement.styled';
import { Grid2 } from '@mui/material';

/**
 * CardElement Component
 *
 * A functional component that displays card content with a read status.
 * The read status is stored in localStorage and persisted across reloads.
 * It also handles onClick events to open links or images in a new tab based on the element properties.
 *
 * @param {object} props - The component props.
 * @param {object} props.element - The element data for the card.
 * @param {array} props.properties - The list of properties to control what is displayed on the card.
 * @returns {React.JSX.Element} - The rendered card element.
 */
const CardElement = (props) => {
  const { element, properties } = props;
  const [isReadElements, setIsReadElements] = useState(JSON.parse(localStorage.getItem('readStatus')) || {});

  /**
   * Loads the read status from localStorage on component mount.
   * If no saved status is found, initializes an empty object.
   */
  useEffect(() => {
    const savedReadStatus = JSON.parse(localStorage.getItem('readStatus')) || {};
    setIsReadElements(savedReadStatus);
  }, []);

  /**
   * Updates localStorage whenever the read status changes.
   */
  useEffect(() => {
    localStorage.setItem('readStatus', JSON.stringify(isReadElements));
  }, [isReadElements]);

  return (
    <CustomCard
      /**
       * Handles the onClick event for the card.
       * Marks the element as read in localStorage and opens the appropriate link in a new tab.
       */
      onClick={() => {
        const savedReadStatus = JSON.parse(localStorage.getItem('readStatus')) || {};
        const tid = element?.tid;

        // Update read status
        setIsReadElements(() => ({
          ...savedReadStatus,
          [tid]: true,
        }));

        // Open content URL in a new tab if 'learn-more' property exists
        if (properties.includes('learn-more') && element?.content_urls) {
          window.open(element.content_urls.desktop.page, '_blank', 'noopener,noreferrer');
        }

        // Open full image in a new tab if 'full-image' property exists
        if (properties.includes('full-image') && element?.thumbnail) {
          window.open(element.thumbnail.source, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      <CardContent>
        {/* Displays a 'Read' stamp if the element has been marked as read */}
        {!!isReadElements[element?.tid] && (
          <StyledStamp>
            <Typography variant='caption'>Read</Typography>
          </StyledStamp>
        )}

        {/* Conditional rendering based on properties */}
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

        {properties.includes('views') && element?.views ? (
          <Typography variant='body2' mt={2}>
            Views: {element.views}
          </Typography>
        ) : null}

        {properties.includes('rank') && element?.rank ? (
          <Typography variant='body2' mt={2}>
            Rank: {element.rank}
          </Typography>
        ) : null}

        {properties.includes('lang') && element?.lang ? (
          <Typography variant='body2' mt={2}>
            Language: {element.lang}
          </Typography>
        ) : null}

        {properties.includes('revision') && element?.revision ? (
          <Typography variant='body2' mt={2}>
            Revision: {element.revision}
          </Typography>
        ) : null}

        {properties.includes('timestamp') && element?.timestamp ? (
          <Typography variant='body2' mt={2}>
            Timestamp: {element.timestamp}
          </Typography>
        ) : null}
      </CardContent>
    </CustomCard>
  );
};

CardElement.propTypes = {
  element: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
};

export default CardElement;
