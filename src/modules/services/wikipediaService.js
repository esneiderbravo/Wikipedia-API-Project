import HTTPHandler from '../utils/httpHandler';
import { WIKIPEDIA_API } from '../utils/constant';

/*
 * Get featured content by language and date
 * @param language {String} - language selected
 * @param date {String} - date selected
 * @return {Promise}
 * */
export const getFeaturedContent = async (language, date) => {
  const url = WIKIPEDIA_API + `/feed/v1/wikipedia/${language}/featured/${date}`;
  return await HTTPHandler.get(url);
};
