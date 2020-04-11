const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateSubmissionsInput(data) {
  let errors = {};

  data.image = !isEmpty(data.image) ? data.image : "";
  data.competition = !isEmpty(data.competition) ? data.competition : "";
  data.author = !isEmpty(data.author) ? data.author : "";

  if (Validator.isEmpty(data.image)) {
    errors.image = "Image field is required";
  }

  if (Validator.isEmpty(data.author)) {
    errors.name = "Author id field is required";
  }


  if (Validator.isEmpty(data.competition)) {
    errors.competition = "competition id field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};