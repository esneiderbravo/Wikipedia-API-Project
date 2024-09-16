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
    try {
      const response = await HTTP.get(url);
      return this.handleResponse(response);
    } catch (error) {
      console.error('Error in HTTP GET request:', error.message);
      return [{ error: 'Failed to make request' }, 500];
    }
  }

  /**
   * Handle HTTP response
   * @param {Object} response HTTP response. Ie, {data: {}, status: 200}
   */
  static handleResponse(response) {
    const { status, data } = response;

    // Check if status indicates a successful request (2xx range)
    if (status >= 200 && status < 400) {
      return [data, status];
    }

    // Handle cases where the status indicates an error (4xx or 5xx)
    return [{ error: 'Request failed', details: data }, status];
  }
}

export default HTTPHandler;
