import React, { useEffect } from 'react';
import { Button, FormControl, MenuItem, Select, Typography, TextField, Grid2, Pagination, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { AVAILABLE_LANGUAGES, ROWS_PER_PAGE_OPTIONS } from '../../utils/constant';
import { CustomBox } from '../../styles/Dashboard.styled';
import { DatePicker } from '@mui/x-date-pickers';
import CardElement from '../common/CardElement';
import LoadingContent from '../common/LoadingContent';
import { useInView } from 'react-intersection-observer';
import { Search as SearchIcon } from '@mui/icons-material';
import commonsLogo from '../../../resources/commons-logo.png';

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
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && !isLoading) {
      setRowsPerPage(rowsPerPage + 5);
    }
  }, [inView]);

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

  const renderDailyFeaturedImage = () =>
    dailyFeaturedImage ? (
      <CardElement element={dailyFeaturedImage} properties={['title', 'thumbnail', 'description.text', 'full-image']} />
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

  const renderPreviousDaysMostReadArticles = () =>
    previousDaysMostReadArticles?.articles?.length ? (
      previousDaysMostReadArticles.articles.map((article) => (
        <Grid2 item xs={12} sm={6} md={4} key={article.tid}>
          <CardElement element={article} properties={['titles.normalized', 'thumbnail', 'extract', 'learn-more']} />
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

  return (
    <CustomBox container p={2} spacing={2}>
      <CustomBox container display='flex' flexDirection='column' alignItems='center' p={2} mt={2}>
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
            <Button
              variant='contained'
              size='large'
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: '#00669b',
                color: '#fff',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
                borderRadius: '8px',
                px: 4,
                py: 2,
              }}
            >
              Search
            </Button>
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
};

export default DashboardContent;
