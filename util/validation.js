function isEmpty(value) {
  return !value || value.trim() === '';
}

function userCredentialsAreValid(email, password) {
  return (
    email && email.includes('@') && password && password.trim().length >= 6
  );
}

function userDetailsAreValid(email, password, name, age, mobile_no, city,danceform) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(age) &&
    !isEmpty(mobile_no) &&
    !isEmpty(city) &&
    !isEmpty(danceform)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
