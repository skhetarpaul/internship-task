const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCompetitionInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.author = !isEmpty(data.author) ? data.author : "";
  
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.author)) {
    errors.name = "Author id field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};