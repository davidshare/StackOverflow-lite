/**
 * @class Answer Validator
 */

class AnswerValidator {
  /**
   *  validate Answer input length and content
   *  @param {Object} request
   *  @param {Object} response
   *
   *  @callback {Function} next
   *
   *  @return {Object} json
   */
  static validateAnswer(request, response, next) {
    const {
      answer,
      userid,
    } = request.body;

    const { id } = request.params;

    const errors = {};
    const rules = {
      validAnswer: /^[a-zA-Z][a-zA-Z0-9@#!$&%\\\s`()*.+,\'-]+$/,
      empty: /^(\S+)/,
      answerLength: /^[a-zA-Z][a-zA-Z0-9@#!$&%\\\s`()*.+,\'-]{49,}$/,
      validId: /^[0-9]{1,}/,
    };

    if (!rules.validId.test(id)) {
      errors.questionId = 'Sorry the question id must not be empty and must be an Integer';
    }

    if (!rules.validId.test(userid)) {
      errors.userId = 'Sorry the user id must not be empty and must be an Integer';
    }

    if (!rules.empty.test(answer)) {
      errors.answerEmpty = 'The answer field is required';
    }

    if (!rules.validAnswer.test(answer)) {
      errors.answerText = 'Sorry, your answer must be a string of alphanumeric, and special characters and must start with a letter';
    }

    if (!rules.answerLength.test(answer)) {
      errors.answerLength = 'Your answer should not be less than 50 characters';
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
}

export default AnswerValidator;
