/**
 * @class Question Validator
 */
class QuestionValidator {
  /**
   * validate Question input length and content
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateQuestion(request, response, next) {
    const {
      title,
      description,
      userid,
    } = request.body;

    const errors = {};
    const rules = {
      validTitle: /^[a-zA-Z][a-zA-Z0-9\s?.,:]+$/,
      validDescription: /^[a-zA-Z][a-zA-Z0-9@#!$&%\\\s`()*.+,\'-]+$/,
      empty: /^(\S+)/,
      titleLength: /^[a-zA-Z][a-zA-Z0-9\s?.,:]{10,150}$/,
      descriptionLength: /^[a-zA-Z][a-zA-Z0-9@#!$&%\\\s`()*.+,\'-]{49,}$/,
      validId: /^[0-9]{1,}/,
    };

    if (!rules.empty.test(title)) {
      errors.titleEmpty = 'The title field is required';
    }
    if (!rules.validId.test(userid)) {
      errors.userid = 'Sorry you must supply an integer as the id';
    }

    if (!rules.validTitle.test(title)) {
      errors.titleText = 'The title field can only have alphanumeric characters';
    }

    if (!rules.titleLength.test(title)) {
      errors.titleLength = 'Sorry the title must not be less than 10 characters';
    }

    if (!rules.empty.test(description)) {
      errors.descriptionEmpty = 'The description field is required';
    }

    if (!rules.validDescription.test(description)) {
      errors.descriptionText = 'Sorry, your description must be a string of alphanumeric, and special characters and must start with a letter';
    }

    if (!rules.descriptionLength.test(description)) {
      errors.descriptionLength = 'Sorry your description must not be less than 50 or more than 500 characters';
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

  /**
   * validate Question Id
   * @param {Object} request
   * @param {Object} response
   *
   * @callback {Function} next
   *
   * @return {Object} json
   */
  static validateQuestionId(request, response, next) {
    const { id } = request.params;
    if (!id) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: 'Sorry! the userid is required',
      });
    }
    const idPattern = /^[0-9]{1,}/;
    if (!idPattern.test(id)) {
      return response.status(406).json({
        statusCode: 406,
        success: false,
        error: 'Sorry the question id must be an integer',
      });
    }
    return next();
  }
}

export default QuestionValidator;
