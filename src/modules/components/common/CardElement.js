import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { CustomCard, CustomImage, StyledStamp } from '../../styles/CardElement.styled';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid2,
  MenuItem,
  Select,
} from '@mui/material';
import { CustomButton } from '../../styles/Dashboard.styled';
import { setNotification } from '../../actions/state';
import { translateContentWithLibreTranslate } from '../../services/libreTranslateService';

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
 * @param {array} props.languageSupportedList - List with language supported from libre translate API
 * @returns {React.JSX.Element} - The rendered card element.
 */
const CardElement = (props) => {
  const { element, properties, languageSupportedList } = props;
  const [isReadElements, setIsReadElements] = useState(JSON.parse(localStorage.getItem('readStatus')) || {});
  const [open, setOpen] = React.useState(false);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [contentTranslated, setContentTranslated] = useState({});

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

  /**
   * Handles the click event for the card.
   * Marks the element as read in localStorage and opens the appropriate link in a new tab.
   */
  const handleCardClick = (event) => {
    if (open) {
      event.stopPropagation();
      return;
    }

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
  };

  /**
   * Handles the click event for the translation button.
   * Stops the click event from propagating to the card.
   */
  const handleTranslateButtonClick = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  /**
   * Closes the configuration dialog
   */
  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  /**
   * Closes the configuration dialog
   */
  const translateContent = async (event, element) => {
    event.stopPropagation();
    const content = element?.extract || element?.description;
    try {
      const [data, status] = await translateContentWithLibreTranslate(content, targetLanguage);

      if (status === 200) {
        setContentTranslated(data);
      } else {
        setNotification({
          type: 'error',
          info: data.message,
        });
      }
    } catch (error) {
      console.error('Error getting translating with libre translate API:', error);
      setNotification({
        type: 'error',
        info: 'Error getting translating with libre translate API.',
      });
    }
  };

  /**
   * Renders available languages options
   *
   * @return {React.JSX.Element[]} Array of MenuItem components for language selection
   */
  const renderLanguageOptions = () =>
    languageSupportedList.map((lang) => (
      <MenuItem key={lang.code} value={lang.code}>
        {lang.name}
      </MenuItem>
    ));

  return (
    <CustomCard onClick={handleCardClick}>
      <CardContent>
        {!!isReadElements[element?.tid] && (
          <StyledStamp>
            <Typography variant='caption'>Read</Typography>
          </StyledStamp>
        )}
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
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        {properties.includes('translate') ? (
          <Grid2 item xs={12} sm={6} md={4} mt={3.2}>
            <CustomButton variant='outlined' onClick={handleTranslateButtonClick}>
              Translate Extract
            </CustomButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
              <DialogTitle id='alert-dialog-title'>{'Translate'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <Grid2 item xs={12} sm={6} md={4} mb={4}>
                    <FormControl fullWidth>
                      <Typography variant='subtitle1'>Language:</Typography>
                      <Select
                        id='language-select'
                        value={targetLanguage}
                        onChange={(event) => {
                          event.stopPropagation();
                          setTargetLanguage(event.target.value);
                        }}
                        aria-label='Language'
                      >
                        {renderLanguageOptions()}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                      {contentTranslated ? (
                        <Typography variant='body2' sx={{ textAlign: 'justify' }}>
                          {contentTranslated.translatedText}
                        </Typography>
                      ) : (
                        ''
                      )}
                    </FormControl>
                  </Grid2>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Button variant='contained' color='success' onClick={(event) => translateContent(event, element)}>
                  Translate
                </Button>
                <Button variant='contained' color='error' onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid2>
        ) : null}
      </CardActions>
    </CustomCard>
  );
};

CardElement.propTypes = {
  element: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  languageSupportedList: PropTypes.array.isRequired,
};

export default CardElement;
