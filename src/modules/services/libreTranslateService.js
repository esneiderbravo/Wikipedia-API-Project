import HTTPHandler from '../utils/httpHandler';
import { LIBRE_TRANSLATE_API } from '../utils/constant';

/*
 * Use libre translate API to translate content
 * @param content {String} - content to be translated
 * @param target_language {String} - target language
 * @return {Promise}
 * */
export const translateContentWithLibreTranslate = async (content, target_language) => {
  const body = JSON.stringify({
    q: content,
    source: 'auto',
    target: target_language,
  });
  return await HTTPHandler.post(LIBRE_TRANSLATE_API, body);
};

/*
 * Get languages supported by libre translate API
 * @return {Promise}
 * */
export const getLanguagesSupportedByLibreTranslate = async () => {
  return await HTTPHandler.get(LIBRE_TRANSLATE_API + 'languages');
};
