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
    let {
      answer,
    } = request.body;

    const { id } = request.params;

    answer = answer.trim();

    const errors = {};
    const rules = {
      validAnswer: /^[a-zA-Z][a-zA-Z0-9@#$&\\\s`.+,\"-]+$/,
      empty: /^(\S+)/,
      answerLength: /^[a-zA-Z][a-zA-Z0-9@#$&%\\\s`()*.+,\'-]{49,500}$/,
      questionId: /^[0-9]{1,}/,
    };

    if (!rules.questionId.test(id)) {
      errors.questionId = 'Sorry the questionId must be an Integer';
    }

    if (!rules.empty.test(answer)) {
      errors.answerEmpty = 'Sorry, your answer cannot be empty.';
    }

    if (!rules.validAnswer.test(answer)) {
      errors.answerText = 'Sorry, your answer must be a string of alphanumeric, and special characters and must start with a letter';
    }

    if (!rules.answerLength.test(answer)) {
      errors.answerLength = 'Sorry your answer must not be less than 50 or more than 500 characters.';
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
}

export default AnswerValidator;
