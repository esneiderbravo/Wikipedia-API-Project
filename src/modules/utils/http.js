import axios from 'axios';

/**
 * HTTP helper
 */
class HTTP {
  /**
   * GET request
   * @param {String} url URL to make the request
   * @returns {Object} HTTP response or error response
   */
  static async get(url) {
    try {
      return await axios.get(url); // Return the successful response object
    } catch (error) {
      // If error response exists, return it; otherwise, provide a generic error message
      if (error.response) {
        // Error from server (response status not 2xx)
        return error.response;
      }

      // Network error or request never left (e.g., timeout, no connection)
      return {
        data: { error: 'Network error or request failed to send' },
        status: 500,
      };
    }
  }

  /**
   * POST request
   * @param {String} url Url to make the request. Ie, 'http://...'
   * @param {Object} body Data to be created. Ie, {'target': 'en', ...}
   */
  static async post(url, body) {
    try {
      return await axios({
        method: 'post',
        url,
        headers: { 'Content-Type': 'application/json' },
        data: body,
      });
    } catch (error) {
      return error;
    }
  }
}

export default HTTP;
