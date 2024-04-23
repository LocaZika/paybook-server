import jwt from 'jsonwebtoken';

/**
 * 
 * @param {object | string} data Set data to convert to token string.
 * @returns token string.
 */
export const generateToken = (data) => jwt.sign(data, process.env.JWT_SECRET, {
  // expires in seconds
  expiresIn: process.env.JWT_EXPIRES_IN * 1000,
});
/**
 * 
 * @param {string} token Set the token string to decode.
 * @returns Decoded data.
 */
export const decodedToken = (token) => jwt.verify(token, process.env.JWT_SECRET);