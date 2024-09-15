import React from 'react';
import { Button, FormControl, MenuItem, Select, Typography, TextField, Grid2, Pagination } from '@mui/material';
import PropTypes from 'prop-types';
import { AVAILABLE_LANGUAGES } from '../../utils/constant';
import { CustomBox } from '../../styles/Dashboard.styled';
import { DatePicker } from '@mui/x-date-pickers';
import CardElement from '../common/CardElement';
import { Stack } from '@mui/system';

/**
 * DashboardContent Component
 * @return {React.JSX.Element}
 */
const DashboardContent = (props) => {
  const {
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
  } = props;

  /**
   * Render language options
   */
  const renderLanguageOptions = () =>
    AVAILABLE_LANGUAGES.map((language) => (
      <MenuItem key={language.id} value={language.code}>
        {language.label}
      </MenuItem>
    ));

  /**
   * Render today featured article
   */
  const renderTodayFeaturedArticle = () => {
    if (todayFeaturedArticle) {
      return <CardElement element={todayFeaturedArticle} properties={['titles.normalized', 'thumbnail', 'extract', 'learn-more']} />;
    }
    return <Typography variant='subtitle1'>No featured content available today.</Typography>;
  };

  /**
   * Render daily featured image
   */
  const renderDailyFeaturedImage = () => {
    if (dailyFeaturedImage) {
      return <CardElement element={dailyFeaturedImage} properties={['title', 'thumbnail', 'description.text', 'full-image']} />;
    }
    return <Typography variant='subtitle1'>No featured content available today.</Typography>;
  };

  /**
   * Render Previous day's most read articles.
   */
  const renderPreviousDaysMostReadArticles = () => {
    if (previousDaysMostReadArticles?.articles) {
      return previousDaysMostReadArticles?.articles.map((article) => (
        <Grid2 key={article.tid}>
          <CardElement element={article} properties={['titles.normalized', 'thumbnail', 'extract', 'learn-more']} />
        </Grid2>
      ));
    }
    return <Typography variant='subtitle1'>No previous days content available today.</Typography>;
  };

  return (
    <>
      <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2}>
        <Grid2 container spacing={2} justifyContent='center'>
          <Grid2 item xs={12}>
            <Typography variant='h4' align='center'>
              Wikipedia - Featured content API
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} justifyContent='center'>
          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <Typography variant='subtitle1'>Language:</Typography>
              <Select
                labelId='language-select-label'
                id='language-select'
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                inputProps={{ 'aria-label': 'Language' }}
              >
                {renderLanguageOptions()}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4}>
            <FormControl fullWidth size='small'>
              <Typography variant='subtitle1'>Date:</Typography>
              <DatePicker
                value={dateSelected}
                onChange={(newDate) => setDateSelected(newDate)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </FormControl>
          </Grid2>
          <Grid2 item xs={12} sm={6} md={4} mt={'auto'}>
            <Button
              variant='contained'
              size='large'
              fullWidth
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
          </Grid2>
        </Grid2>
      </CustomBox>
      <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2}>
        <Grid2 container spacing={2} justifyContent='center'>
          <Grid2 item xs={12}>
            <Typography variant='h4' align='center'>
              {"Today's featured article"}
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} justifyContent='center' mt={5}>
          {renderTodayFeaturedArticle()}
        </Grid2>
      </CustomBox>
      <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2}>
        <Grid2 container spacing={2} justifyContent='center'>
          <Grid2 item xs={12}>
            <Typography variant='h4' align='center'>
              {'Daily featured image from Wikimedia Commons'}
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} justifyContent='center' mt={5}>
          {renderDailyFeaturedImage()}
        </Grid2>
      </CustomBox>
      <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2}>
        <Grid2 container spacing={2} justifyContent='center'>
          <Grid2 item xs={12}>
            <Typography variant='h4' align='center'>
              {"Previous day's most read articles."}
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} justifyContent='center' mt={5}>
          {renderPreviousDaysMostReadArticles()}
        </Grid2>
        <Grid2 container spacing={2} justifyContent='center' mt={5}>
          <Stack>
            <Pagination
              count={previousDaysMostReadArticles?.count > 0 ? parseInt(previousDaysMostReadArticles.count / rowsPerPage) : 0}
              page={page}
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Stack>
        </Grid2>
      </CustomBox>
    </>
  );
};

DashboardContent.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  dateSelected: PropTypes.object.isRequired,
  setDateSelected: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  todayFeaturedArticle: PropTypes.object.isRequired,
  previousDaysMostReadArticles: PropTypes.array.isRequired,
  dailyFeaturedImage: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};

export default DashboardContent;
