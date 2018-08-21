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
    let {
      title,
      description,
    } = request.body;

    title = title.trim();
    description = description.trim();

    const errors = {};
    const rules = {
      validTitle: /^[a-zA-Z][a-zA-Z0-9\s]+$/,
      validDescription: /^[a-zA-Z][a-zA-Z0-9@#$&\\\s`.+,\"-]+$/,
      empty: /^(\S+)/,
      titleLength: /^[a-zA-Z][a-zA-Z0-9\s]{14,50}$/,
      descriptionLength: /^[a-zA-Z][a-zA-Z0-9@#$&%\\\s`()*.+,\'-]{49,500}$/,
    };

    if (!rules.empty.test(title)) {
      errors.titleEmpty = 'Sorry, your title cannot be empty.';
    }

    if (!rules.validTitle.test(title)) {
      errors.titleText = 'Sorry, your title must be a string of alphanumeric, and special characters and must start with a letter';
    }

    if (!rules.titleLength.test(title)) {
      errors.titleLength = 'Sorry your title must not be less than 15 or more than 50 characters.';
    }

    if (!rules.empty.test(description)) {
      errors.descriptionEmpty = 'Sorry, your description cannot be empty.';
    }

    if (!rules.validDescription.test(description)) {
      errors.descriptionText = 'Sorry, your description must be a string of alphanumeric, and special characters and must start with a letter';
    }

    if (!rules.descriptionLength.test(description)) {
      errors.descriptionLength = 'Sorry your description must not be less than 50 or more than 500 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return response.status(406).json({
        status: 406,
        success: false,
        errors,
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
    const idPattern = /^[0-9]{1,}/;
    if (!idPattern.test(id)) {
      return response.status(406).json({
        status: 406,
        success: false,
        error: 'Sorry the id you supplied is not a valid integer.',
      });
    }
    return next();
  }
}

export default  QuestionValidator;
