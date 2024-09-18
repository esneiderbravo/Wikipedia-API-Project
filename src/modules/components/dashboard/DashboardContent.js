import React, { useEffect } from 'react';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
  TextField,
  Grid2,
  Pagination,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControlLabel,
  Switch,
  FormGroup,
} from '@mui/material';
import PropTypes from 'prop-types';
import { AVAILABLE_LANGUAGES, ROWS_PER_PAGE_OPTIONS } from '../../utils/constant';
import { CustomBox, CustomButton } from '../../styles/Dashboard.styled';
import { DatePicker } from '@mui/x-date-pickers';
import CardElement from '../common/CardElement';
import LoadingContent from '../common/LoadingContent';
import { useInView } from 'react-intersection-observer';
import { Search as SearchIcon } from '@mui/icons-material';
import commonsLogo from '../../../resources/commons-logo.png';

/**
 * DashboardContent Component
 * Displays the main content for the dashboard, including language selection,
 * date picker, featured articles, and pagination for previous day's most read articles.
 *
 * @param {Object} props - Component props
 * @param {string} props.language - Currently selected language code
 * @param {Function} props.setLanguage - Function to update the selected language
 * @param {Date} props.dateSelected - Currently selected date
 * @param {Function} props.setDateSelected - Function to update the selected date
 * @param {Function} props.handleSearch - Function to trigger search
 * @param {Object} props.todayFeaturedArticle - Data for today's featured article
 * @param {Object} props.previousDaysMostReadArticles - Data for previous day's most read articles
 * @param {Object} props.dailyFeaturedImage - Data for today's featured image
 * @param {number} props.page - Current page number for pagination
 * @param {Function} props.setPage - Function to update the current page number
 * @param {number} props.rowsPerPage - Number of rows displayed per page
 * @param {Function} props.setRowsPerPage - Function to update the number of rows per page
 * @param {boolean} props.isLoading - Flag indicating if content is loading
 * @param {array} props.languageSupportedList - List with language supported from libre translate API
 *
 * @return {React.JSX.Element} Rendered component
 */
const DashboardContent = ({
  language,
  setLanguage,
  dateSelected,
  setDateSelected,
  handleSearch,
  todayFeaturedArticle,
  previousDaysMostReadArticles,
  dailyFeaturedImage,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  isLoading,
  languageSupportedList,
}) => {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1.0,
  });
  const [open, setOpen] = React.useState(false);
  const [cardPropsConfig, setCardPropsConfig] = React.useState([
    {
      label: 'Title',
      selected: true,
      value: ['titles.normalized'],
    },
    {
      label: 'Tumbnail',
      selected: true,
      value: ['thumbnail'],
    },
    {
      label: 'Extract',
      selected: true,
      value: ['extract', 'description.text'],
    },
    {
      label: 'Activate click event',
      selected: true,
      value: ['learn-more', 'full-image'],
    },
    {
      label: 'Views',
      selected: false,
      value: ['views'],
    },
    {
      label: 'Rank',
      selected: false,
      value: ['rank'],
    },
    {
      label: 'Language',
      selected: false,
      value: ['lang'],
    },
    {
      label: 'Revision',
      selected: false,
      value: ['revision'],
    },
    {
      label: 'Timestamp',
      selected: false,
      value: ['timestamp'],
    },
    {
      label: 'Translate button',
      selected: false,
      value: ['translate'],
    },
  ]);

  /**
   * Handles the change in view and updates rows per page if in view
   */
  useEffect(() => {
    if (inView && !isLoading) {
      setRowsPerPage(rowsPerPage + 5);
    }
  }, [inView]);

  /**
   * Extracts the selected values from card properties configuration
   *
   * @param {Array} data - Array of card properties configuration
   * @return {Array} List of extracted selected values
   */
  const extractSelectedValues = (data) => {
    return data.filter((item) => item.selected).flatMap((item) => item.value);
  };

  /**
   * Updates the card configuration state by modifying the 'selected' property of the item
   * that matches the label of the new configuration. The updated item will replace the
   * corresponding item in the state array.
   *
   * @param {Object} newConfig - The new configuration object to update the card properties.
   * @param {string} newConfig.label - The label of the item to be updated.
   * @param {boolean} newConfig.selected - The new value for the 'selected' property.
   */
  const updateCardPropsConfig = (newConfig) => {
    setCardPropsConfig((prevConfig) =>
      prevConfig.map((item) => (item.label === newConfig.label ? { ...item, selected: newConfig.selected } : item)),
    );
  };

  /**
   * Renders language selection options
   *
   * @return {React.JSX.Element[]} Array of MenuItem components for language selection
   */
  const renderLanguageOptions = () =>
    AVAILABLE_LANGUAGES.map((lang) => (
      <MenuItem key={lang.id} value={lang.code}>
        {lang.label}
      </MenuItem>
    ));

  /**
   * Renders the featured article for today
   *
   * @return {React.JSX.Element} Rendered CardElement or a message if no content is available
   */
  const renderTodayFeaturedArticle = () =>
    todayFeaturedArticle ? (
      <CardElement
        element={todayFeaturedArticle}
        properties={extractSelectedValues(cardPropsConfig)}
        languageSupportedList={languageSupportedList}
      />
    ) : (
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#333',
        }}
      >
        No featured content available this date.
      </Typography>
    );

  /**
   * Renders the featured image for today
   *
   * @return {React.JSX.Element} Rendered CardElement or a message if no content is available
   */
  const renderDailyFeaturedImage = () =>
    dailyFeaturedImage ? (
      <CardElement
        element={dailyFeaturedImage}
        properties={extractSelectedValues(cardPropsConfig)}
        languageSupportedList={languageSupportedList}
      />
    ) : (
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#333',
        }}
      >
        No featured image available this date.
      </Typography>
    );

  /**
   * Renders the most read articles from the previous days
   *
   * @return {React.JSX.Element} Array of CardElement components or a message if no articles are available
   */
  const renderPreviousDaysMostReadArticles = () =>
    previousDaysMostReadArticles?.articles?.length ? (
      previousDaysMostReadArticles.articles.map((article) => (
        <Grid2 item xs={12} sm={6} md={4} key={article.tid}>
          <CardElement
            element={article}
            properties={extractSelectedValues(cardPropsConfig)}
            languageSupportedList={languageSupportedList}
          />
        </Grid2>
      ))
    ) : (
      <Typography
        variant='subtitle1'
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: '#333',
        }}
      >
        No previous days content available this date.
      </Typography>
    );

  /**
   * Opens the configuration dialog
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Closes the configuration dialog
   */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CustomBox container p={2} spacing={2}>
      <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2} mt={2} mb={2}>
        <Grid2 container spacing={2} justifyContent='center' mb={5}>
          <Grid2 item xs={12} display='flex' flexDirection='column' alignItems='center'>
            <img src={`${commonsLogo}`} alt='commonsLogo' width={120} height={120} />
            <Typography
              variant='h4'
              align='center'
              sx={{
                fontWeight: 'bold',
                mb: 4,
                color: '#333',
              }}
            >
              Wikipedia - Featured content API
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} justifyContent='center'>
          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <Typography variant='subtitle1'>Language:</Typography>
              <Select id='language-select' value={language} onChange={(event) => setLanguage(event.target.value)} aria-label='Language'>
                {renderLanguageOptions()}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <Typography variant='subtitle1'>Date:</Typography>
              <DatePicker
                value={dateSelected}
                onChange={(newDate) => setDateSelected(newDate)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </FormControl>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} mt={3.2}>
            <CustomButton variant='outlined' onClick={handleClickOpen}>
              Config props
            </CustomButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
              <DialogTitle id='alert-dialog-title'>{'Configure props'}</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  <FormGroup>
                    {cardPropsConfig.map((cardProp) => (
                      <FormControlLabel
                        key={cardProp.label}
                        control={
                          <Switch
                            checked={cardProp.selected}
                            onChange={() =>
                              updateCardPropsConfig({
                                label: cardProp.label,
                                selected: !cardProp.selected,
                              })
                            }
                          />
                        }
                        label={cardProp.label}
                      />
                    ))}
                  </FormGroup>
                </DialogContentText>
              </DialogContent>
              <DialogActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Button variant='contained' color='error' onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} mt={3.2}>
            <CustomButton variant='contained' size='large' onClick={handleSearch} startIcon={<SearchIcon />}>
              Search
            </CustomButton>
          </Grid2>
        </Grid2>
      </CustomBox>
      {isLoading ? (
        <LoadingContent />
      ) : (
        <Grid2 container spacing={2} display='flex' flexDirection='column'>
          <Grid2 item xs={12} md={8}>
            <CustomBox
              container
              display='flex'
              justifyContent='center'
              p={2}
              xs={12}
              md={12}
              sx={{ flexDirection: { xs: 'column', md: 'row' } }}
            >
              <Grid2 item xs={12} m={10}>
                <Typography variant='h6' align='center'>
                  {"Today's Featured Article"}
                </Typography>
                <Grid2 container spacing={2} justifyContent='center' mt={2}>
                  {renderTodayFeaturedArticle()}
                </Grid2>
              </Grid2>
              <Grid2 item xs={12} m={10}>
                <Typography variant='h6' align='center'>
                  Daily Featured Image
                </Typography>
                <Grid2 container spacing={2} justifyContent='center' mt={2}>
                  {renderDailyFeaturedImage()}
                </Grid2>
              </Grid2>
            </CustomBox>
          </Grid2>
          <Grid2 item xs={12} md={4} display='flex' justifyContent='center'>
            <CustomBox container display='flex' flexDirection='column' p={2} width='100%'>
              <Grid2 item xs={12}>
                {previousDaysMostReadArticles?.count > 0 && (
                  <Grid2
                    container
                    spacing={2}
                    mt={2}
                    mb={2}
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Grid2 item xs={12} mt={2}>
                      <FormControl
                        fullWidth
                        size='small'
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Typography variant='subtitle1' sx={{ marginRight: 2 }}>
                          Cards per Page:
                        </Typography>
                        <Select
                          value={rowsPerPage}
                          onChange={(event) => {
                            setRowsPerPage(event.target.value);
                            setPage(1);
                          }}
                        >
                          {ROWS_PER_PAGE_OPTIONS.map((value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid2>
                    <Grid2 item xs={12} mt={2}>
                      <Stack spacing={2} alignItems='center'>
                        <Pagination
                          count={Math.ceil(previousDaysMostReadArticles.count / rowsPerPage)}
                          page={page}
                          onChange={(event, value) => setPage(value)}
                        />
                      </Stack>
                    </Grid2>
                  </Grid2>
                )}
                <Typography variant='h6' align='center' m={10}>
                  {"Previous Day's Most Read Articles"}
                </Typography>
                <Grid2 container spacing={2} justifyContent='center'>
                  {renderPreviousDaysMostReadArticles()}
                </Grid2>
              </Grid2>
              <div ref={loadMoreRef} />
            </CustomBox>
          </Grid2>
        </Grid2>
      )}
    </CustomBox>
  );
};

DashboardContent.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  dateSelected: PropTypes.object.isRequired,
  setDateSelected: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  todayFeaturedArticle: PropTypes.object,
  previousDaysMostReadArticles: PropTypes.object,
  dailyFeaturedImage: PropTypes.object,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  languageSupportedList: PropTypes.array.isRequired,
};

export default DashboardContent;
