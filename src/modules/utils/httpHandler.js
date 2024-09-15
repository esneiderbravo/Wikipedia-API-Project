import HTTP from './http';

/**
 * HTTPHandler class
 */
class HTTPHandler {
  /**
   * GET request
   * @param {String} url Url to make the request. Ie, 'http://...'
   */
  static async get(url) {
    const response = await HTTP.get(url);
    return this.handleResponse(response);
  }

  /**
   * Handle HTTP response
   * @param {Object} response HTTP response. Ie, {data: {}, ...}
   */
  static handleResponse(response) {
    const { status } = response;
    if (status < 400) {
      const { data } = response;
      return [data, status];
    }
    const { data } = response;
    return [data, status];
  }
}

export default HTTPHandler;
