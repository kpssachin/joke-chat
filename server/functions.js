// TODO: function to validate the data
function isValid(params) {
  return params.name && params.name.toString().trim() !== '' &&
    params.content && params.content.toString().trim() !== '';
}

module.exports = {
  isValid
};