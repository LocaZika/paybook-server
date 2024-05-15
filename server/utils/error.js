/**
 *
 * @param {HttpResponse} res set response object.
 * @param {string} message set message to show in the response.
 * @returns HttpResponse json.
 */
export const badRequest = (res, message) => res.status(400).json({ message });
/**
 *
 * @param {object} res set response object.
 * @param {object} body set request body.
 * @param {string[]} model set model object.
 * @returns Http response.
 */
export const checkExistedBody = (res, body, model) => {
  if (!body) {
    return badRequest(res, "You must provide a body!");
  }
  console.log("Checking: ", body);
  for (const key in body) {
    if (Object.hasOwnProperty.call(body, key)) {
      const isExistedKey = model.includes[key];
      if (!isExistedKey) {
        return badRequest(res, `${key} is required!`);
      }
    }
  }
  return true;
};
/**
 *
 * @param {any} value Set the value to check.
 * @param {string} type Set the type of value to check.
 * @returns boolean
 */
export const isValidValue = (value, type) => {
  if (!value || typeof value != type) {
    return false;
  }
  return true;
};
/**
 *
 * @param {any} value Set the value to check.
 * @returns true if the value is truthy.
 */
export const isExistValue = (value) => (value ? true : false);
