/**
 * @class JwtService
 */
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * @name JwtService
 */

class JwtService {
  /**
   * JwtService constructor
   * @param accesKey
   * @param refreshKey
   * @param accesTime
   * @param refreshTime
   */

  constructor(accesKey, refreshKey, accesTime, refreshTime) {
    this.accesKey = accesKey;
    this.refreshKey = refreshKey;
    this.refreshTime = refreshTime;
    this.accesTime = accesTime;
  }

  /**
   * Verify token
   * @param token
   * @param callback
   * @returns {*}
   */
  async verifyAcces(token) {
    return jwt.verify(token, this.accesKey, {});
  }
  async verifyRefresh(token) {
    return jwt.verify(token, this.refreshKey, {});
  }
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accesKey, {
      expiresIn: this.accesTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
/**
 * Export JwtService class
 * @type {JwtService}
 */
module.exports = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);
