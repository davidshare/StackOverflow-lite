/**
 * @class Signin Validator
 */
class SigninValidator {
  /**
   * validate user signin input length and content
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateSignin(request, response, next) {
    const {
      username,
      password,
    } = request.body;

    if (username && password) {
      const errors = {};
      const rules = {
        validUsername: /^[a-zA-Z][a-zA-Z0-9\s]+$/,
        validPasswd: /^[\S]+$/,
        empty: /^(\S+)/,
        usernameLength: /^[a-zA-Z][a-zA-Z0-9\s]{5,}/,
        passwdLength: /^[\S]{8,}$/,
      };

      if (!rules.empty.test(username)) {
        errors.usernameEmpty = 'The username is required';
      }

      if (!rules.validUsername.test(username)) {
        errors.usernameText = 'Sorry, your username must be a string of alphanumeric and number characters, and must start with a letter';
      }

      if (!rules.usernameLength.test(username)) {
        errors.usernameLength = 'Sorry your description must not be less than 5 characters';
      }

      if (!rules.empty.test(password)) {
        errors.passwdEmpty = 'Your password is required';
      }

      if (!rules.validPasswd.test(password)) {
        errors.emailLength = 'Sorry, your password cannot contain spaces.';
      }

      if (!rules.passwdLength.test(password)) {
        errors.passwdLength = 'Sorry your password must not be less than 8 characters';
      }

      if (Object.keys(errors).length > 0) {
        return response.status(406).json({
          status: 406,
          success: false,
          error: errors,
        });
      }
      return next();
    }

    return response.status(406).json({
      status: 406,
      success: false,
      error: 'Sorry! both your username and password are required',
    });
  }
}

export default SigninValidator;
