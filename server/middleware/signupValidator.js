import CheckDuplicates from './checkDuplicates';

/**
 * @class Signup Validator
 */
class SignupValidator {
  /**
   * validate user signup input length and content
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateSignup(request, response, next) {
    const {
      fullname,
      username,
      email,
      password,
    } = request.body;

    if (fullname && username && email && password) {
      const errors = {};
      const rules = {
        validFullname: /^[a-zA-Z][a-zA-Z\s]+$/,
        validUsername: /^[a-zA-Z][a-zA-Z0-9\s]+$/,
        validEmail: /^[a-zA-Z][a-zA-Z0-9._-]{3,}@[a-zA-Z0-9]+.[a-zA-Z]{2,4}/,
        validPassword: /^[\S]+$/,
        empty: /^(\S+)/,
        fullnameLength: /^[a-zA-Z][a-zA-Z\s]{10,}$/,
        usernameLength: /^[a-zA-Z][a-zA-Z0-9\s]{5,}/,
        emailLength: /^[a-zA-Z][a-zA-Z0-9._-]{3,}@[a-zA-Z0-9]+.[a-zA-Z]{2,4}/,
        passwdLength: /^[\S]{8,}$/,
      };

      const emailExists = CheckDuplicates.checkDuplicateEmail(email);
      const usernameExists = CheckDuplicates.checkDuplicateUsername(username);

      if (!rules.empty.test(fullname)) {
        errors.fullnameEmpty = 'Your full name is required';
      }

      if (!rules.validFullname.test(fullname)) {
        errors.fullnameText = 'Invalid full name: your full name can only contain letters and spaces';
      }

      if (!rules.fullnameLength.test(fullname)) {
        errors.fullnameLength = 'Your full name must not be less than 10 characters';
      }

      if (!rules.empty.test(username)) {
        errors.usernameEmpty = 'Your username is required';
      }

      if (!rules.validUsername.test(username)) {
        errors.usernameText = 'Sorry! This username is invalid. Usernames cannot contain special characters or start with numbers.';
      }

      if (!rules.usernameLength.test(username)) {
        errors.usernameLength = 'Your username cannot be less than 5 characters';
      }

      if (!rules.empty.test(email)) {
        errors.emailEmpty = 'Your email is required';
      }

      if (!rules.validEmail.test(email)) {
        errors.emailText = 'Sorry, your email address is invalid. Enter a correct one.';
      }

      if (!rules.emailLength.test(email)) {
        errors.emailLength = 'Sorry your email address must not be less than 10 characters';
      }

      if (!rules.empty.test(password)) {
        errors.passwdEmpty = 'Your password is required';
      }

      if (!rules.validPassword.test(password)) {
        errors.emailLength = 'Sorry, your password cannot contain spaces.';
      }

      if (!rules.passwdLength.test(password)) {
        errors.passwdLength = 'Sorry your password must not be less than 8 characters';
      }
      if (emailExists) {
        errors.duplicateEmail = 'Sorry, this email address is taken';
      }

      if (usernameExists) {
        errors.duplicateUsername = 'Sorry, this username is taken';
      }

      if (Object.keys(errors).length > 0) {
        return response.status(406).json({
          statusCode: 406,
          success: false,
          error: errors,
        });
      }
      return next();
    }

    return response.status(406).json({
      statusCode: 406,
      success: false,
      error: 'Sorry! all fields are required',
    });
  }
}

export default SignupValidator;
