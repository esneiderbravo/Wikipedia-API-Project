import React, { useContext, useEffect, useState } from 'react';
import DashboardContent from '../../components/dashboard/DashboardContent';
import dayjs from 'dayjs';
import { getFeaturedContent } from '../../services/wikipediaService';
import AppContext from '../../context/app';
import { setNotification } from '../../actions/state';

/**
 * DashboardContainer Component
 * Renders the DashboardContent component.
 * Can be extended to include logic for fetching data or handling user interactions.
 * @return React.JSX.Element
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
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
   * Handle user interaction with search button
   * */
  const handleSearch = async () => {
    try {
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
    } catch (error) {
      console.error('Error getting featured content:', error);
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
    />
  );
};

export default DashboardContainer;
