/**
 * Groups general methods and attributes for to store values in browser memory..
 */
class LocalStorage {
  /**
   * Storage a given var value in localStorage identified by a var name
   *
   * @param {String} key
   *   Var name for to be identified in localStorage.
   * @param {String} value
   *   Var value for to be storage in localStorage.
   */
  static setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving ${key}: ${value}`);
    }
  }

  /**
   * Retrieves the localStorage value of a given var name
   *
   * @param {String} key
   *   Var name for to be identified in localStorage.
   * @@return {String}
   *   Var value storaged in localStorage.
   */
  static getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key}`);
    }
  }

  /**
   * Retrieves the localStorage value of a given var name
   *
   * @param {String} key
   *   Var name for to be identified in localStorage.
   * @@return {String}
   *   Var value storaged in localStorage.
   */
  static removeItem(key) {
    try {
      return localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}`);
    }
  }
}

export default LocalStorage;
