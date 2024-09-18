import React, { useContext, useEffect, useState } from 'react';
import DashboardContent from '../../components/dashboard/DashboardContent';
import dayjs from 'dayjs';
import { getFeaturedContent } from '../../services/wikipediaService';
import AppContext from '../../context/app';
import { setNotification } from '../../actions/state';

/**
 * DashboardContainer Component
 *
 * This component manages the state and logic for the dashboard view.
 * It fetches data from the Wikipedia service, handles pagination, and passes the necessary props to the DashboardContent component.
 *
 * @returns {React.JSX.Element} The rendered dashboard container component.
 */
const DashboardContainer = () => {
  const [, dispatch] = useContext(AppContext); // Get dispatch function from AppContext for notifications.
  const [language, setLanguage] = useState('en'); // State for selected language, default is 'en' (English).
  const [dateSelected, setDateSelected] = useState(dayjs(new Date())); // State for selected date, default is today's date.
  const [data, setData] = useState({}); // State to store fetched data from the Wikipedia service.
  const [todayFeaturedArticle, setTodayFeaturedArticle] = useState(null); // State to store today's featured article.
  const [previousDaysMostReadArticles, setPreviousDaysMostReadArticles] = useState({ articles: [], count: 0 }); // State for previous day's most-read articles.
  const [dailyFeaturedImage, setDailyFeaturedImage] = useState(null); // State to store the daily featured image.
  const [page, setPage] = useState(1); // State for current pagination page, default is page 1.
  const [rowsPerPage, setRowsPerPage] = useState(0); // State for rows per page in pagination.
  const [isLoading, setIsLoading] = useState(false); // State to indicate whether data is being loaded (for showing spinners or disabling actions).

  /**
   * useEffect Hook
   *
   * Updates the displayed featured article, image, and paginated most-read articles whenever the `data`, `page`, or `rowsPerPage` state changes.
   * Handles pagination logic for the previous day's most-read articles.
   */
  useEffect(() => {
    if (data) {
      setTodayFeaturedArticle(data?.tfa); // Set today's featured article from the fetched data.
      setDailyFeaturedImage(data?.image); // Set the daily featured image from the fetched data.

      const start = (page - 1) * rowsPerPage;
      const end = page * rowsPerPage;
      const limit = data?.mostread?.articles.length;
      const previousArticledPaginated = data?.mostread?.articles.slice(start, end <= limit ? end : limit); // Paginate the articles.

      setPreviousDaysMostReadArticles({ articles: previousArticledPaginated, count: data?.mostread?.articles.length }); // Update paginated articles and total count.
    }
  }, [data, page, rowsPerPage]);

  /**
   * handleSearch Function
   *
   * This function is triggered when the search button is clicked. It fetches the featured content
   * from the Wikipedia service based on the selected language and date. It also sets notification
   * messages based on the success or failure of the fetch operation.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleSearch = async () => {
    try {
      setIsLoading(true); // Start loading state.
      const [data, status] = await getFeaturedContent(language, dateSelected.format('YYYY/MM/DD')); // Fetch data from Wikipedia service.

      if (status === 200) {
        setData(data); // Update the data state with the fetched data.
        dispatch(
          setNotification({
            type: 'success',
            info: 'Data found with success!',
          }),
        ); // Dispatch a success notification.
      } else {
        dispatch(
          setNotification({
            type: 'error',
            info: data.message,
          }),
        ); // Dispatch an error notification if the status isn't 200.
      }
      setIsLoading(false); // Stop loading state.
    } catch (error) {
      console.error('Error getting featured content:', error); // Log any errors.
      dispatch(
        setNotification({
          type: 'error',
          info: 'Failed to fetch featured content.',
        }),
      ); // Dispatch an error notification in case of failure.
      setIsLoading(false); // Stop loading state.
    }
  };

  return (
    <DashboardContent
      language={language}
      setLanguage={setLanguage}
      dateSelected={dateSelected}
      setDateSelected={setDateSelected}
      handleSearch={handleSearch}
      todayFeaturedArticle={todayFeaturedArticle}
      previousDaysMostReadArticles={previousDaysMostReadArticles}
      dailyFeaturedImage={dailyFeaturedImage}
      page={page}
      setPage={setPage}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      isLoading={isLoading}
    />
  );
};

export default DashboardContainer;
