import axios from 'axios';

/**
 * HTTP helper
 */
class HTTP {
  /**
   * GET request
   * @param {String} url url to make the request
   */
  static async get(url) {
    try {
      let request = {
        method: 'get',
        url,
      };

      return await axios(request);
    } catch (error) {
      return error;
    }
  }
}

export default HTTP;
