import React, { useContext, useEffect, useState } from 'react';
import DashboardContent from '../../components/dashboard/DashboardContent';
import dayjs from 'dayjs';
import { getFeaturedContent } from '../../services/wikipediaService';
import AppContext from '../../context/app';
import { setNotification } from '../../actions/state';
import { getLanguagesSupportedByLibreTranslate } from '../../services/libreTranslateService';

/**
 * DashboardContainer Component
 *
 * This component manages the state and logic for the dashboard view.
 * It fetches data from the Wikipedia service, handles pagination, and passes the necessary props to the DashboardContent component.
 *
 * @returns {React.JSX.Element} The rendered dashboard container component.
 */
const DashboardContainer = () => {
  const [, dispatch] = useContext(AppContext);
  const [language, setLanguage] = useState('en');
  const [dateSelected, setDateSelected] = useState(dayjs(new Date()));
  const [data, setData] = useState({});
  const [todayFeaturedArticle, setTodayFeaturedArticle] = useState(null);
  const [previousDaysMostReadArticles, setPreviousDaysMostReadArticles] = useState({ articles: [], count: 0 });
  const [dailyFeaturedImage, setDailyFeaturedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [languageSupportedList, setLanguageSupportedList] = useState([]);

  /**
   * useEffect Hook
   *
   * Updates the displayed featured article, image, and paginated most-read articles whenever the `data`, `page`, or `rowsPerPage` state changes.
   * Handles pagination logic for the previous day's most-read articles.
   */
  useEffect(() => {
    if (data) {
      setTodayFeaturedArticle(data?.tfa);
      setDailyFeaturedImage(data?.image);

      const start = (page - 1) * rowsPerPage;
      const end = page * rowsPerPage;
      const limit = data?.mostread?.articles.length;
      const previousArticledPaginated = data?.mostread?.articles.slice(start, end <= limit ? end : limit);

      setPreviousDaysMostReadArticles({ articles: previousArticledPaginated, count: data?.mostread?.articles.length });
    }
  }, [data, page, rowsPerPage]);

  /**
   * useEffect Hook
   *
   * Fetches the list of supported languages from the LibreTranslate API when the component mounts.
   */
  useEffect(() => {
    getLanguagesSupported();
  }, []);

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
      setIsLoading(true);
      const [data, status] = await getFeaturedContent(language, dateSelected.format('YYYY/MM/DD'));

      if (status === 200) {
        setData(data);
        dispatch(
          setNotification({
            type: 'success',
            info: 'Data found with success!',
          }),
        );
      } else {
        dispatch(
          setNotification({
            type: 'error',
            info: data.message,
          }),
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting featured content:', error);
      dispatch(
        setNotification({
          type: 'error',
          info: 'Failed to fetch featured content.',
        }),
      );
      setIsLoading(false);
    }
  };

  /**
   * Fetches the list of supported languages from the LibreTranslate API.
   *
   * This function makes an asynchronous call to the LibreTranslate API to get the
   * languages supported. If the API request is successful, it updates the state with
   * the supported languages. If the request fails or returns an error status, it
   * dispatches an error notification and logs the error.
   * @returns {Promise<void>} - A promise that resolves when the function completes.
   */
  const getLanguagesSupported = async () => {
    try {
      const [data, status] = await getLanguagesSupportedByLibreTranslate();

      if (status === 200) {
        setLanguageSupportedList(data);
      } else {
        dispatch(
          setNotification({
            type: 'error',
            info: data.message,
          }),
        );
      }
    } catch (error) {
      console.error('Error getting language supported by libre translate API:', error);
      dispatch(
        setNotification({
          type: 'error',
          info: 'Failed to fetch language supported libre translate API.',
        }),
      );
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
      languageSupportedList={languageSupportedList}
    />
  );
};

export default DashboardContainer;
