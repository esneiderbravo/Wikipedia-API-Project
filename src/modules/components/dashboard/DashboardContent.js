import React from 'react';
import { Button, FormControl, MenuItem, Select, Typography, TextField, Grid2, Pagination, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { AVAILABLE_LANGUAGES, ROWS_PER_PAGE_OPTIONS } from '../../utils/constant';
import { CustomBox } from '../../styles/Dashboard.styled';
import { DatePicker } from '@mui/x-date-pickers';
import CardElement from '../common/CardElement';
import LoadingContent from '../common/LoadingContent';

/**
 * DashboardContent Component
 * @return {React.JSX.Element}
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
}) => {
  const renderLanguageOptions = () =>
    AVAILABLE_LANGUAGES.map((lang) => (
      <MenuItem key={lang.id} value={lang.code}>
        {lang.label}
      </MenuItem>
    ));

  const renderTodayFeaturedArticle = () =>
    todayFeaturedArticle ? (
      <CardElement element={todayFeaturedArticle} properties={['titles.normalized', 'thumbnail', 'extract', 'learn-more']} />
    ) : (
      <Typography variant='subtitle1'>No featured content available this date.</Typography>
    );

  const renderDailyFeaturedImage = () =>
    dailyFeaturedImage ? (
      <CardElement element={dailyFeaturedImage} properties={['title', 'thumbnail', 'description.text', 'full-image']} />
    ) : (
      <Typography variant='subtitle1'>No featured image available this date.</Typography>
    );

  const renderPreviousDaysMostReadArticles = () =>
    previousDaysMostReadArticles?.articles?.length ? (
      previousDaysMostReadArticles.articles.map((article) => (
        <Grid2 item xs={12} sm={6} md={4} key={article.tid}>
          <CardElement element={article} properties={['titles.normalized', 'thumbnail', 'extract', 'learn-more']} />
        </Grid2>
      ))
    ) : (
      <Typography variant='subtitle1'>No previous days content available this date.</Typography>
    );

  return (
    <CustomBox container p={2} spacing={2}>
      <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2} mt={2}>
        <Grid2 container spacing={2} justifyContent='center' mb={5}>
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
          <Grid2 item xs={12} sm={6} md={4} mt={4}>
            <Button variant='contained' size='large' fullWidth onClick={handleSearch}>
              Search
            </Button>
          </Grid2>
        </Grid2>
      </CustomBox>
      {isLoading ? (
        <LoadingContent />
      ) : (
        <Grid2 container spacing={2}>
          <Grid2 item xs={12} md={8}>
            <CustomBox container display='flex' flexDirection='row' justifyContent='center' p={2}>
              <Grid2 item xs={12} m={10}>
                <Typography variant='h4' align='center'>
                  {"Today's Featured Article"}
                </Typography>
                <Grid2 container spacing={2} justifyContent='center' mt={2}>
                  {renderTodayFeaturedArticle()}
                </Grid2>
              </Grid2>
              <Grid2 item xs={12} m={10}>
                <Typography variant='h4' align='center'>
                  Daily Featured Image
                </Typography>
                <Grid2 container spacing={2} justifyContent='center' mt={2}>
                  {renderDailyFeaturedImage()}
                </Grid2>
              </Grid2>
            </CustomBox>
          </Grid2>
          <Grid2 item xs={12} md={4}>
            <CustomBox container display='flex' flexDirection='column' p={2}>
              <Grid2 item xs={12}>
                <Typography variant='h4' align='center'>
                  {"Previous Day's Most Read Articles"}
                </Typography>
                <Grid2 container spacing={2} justifyContent='center' mt={2}>
                  {renderPreviousDaysMostReadArticles()}
                </Grid2>
                {previousDaysMostReadArticles?.count > 0 && (
                  <Grid2
                    container
                    spacing={2}
                    mt={3}
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
              </Grid2>
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
};

export default DashboardContent;
