const signupEmail = document.getElementById("signupEmail");
const signupPwd = document.getElementById("signupPassword");
const confirmSignupPwd = document.getElementById("confirmSignupPassword");

const form = document.getElementById("signup-form");

form.addEventListener("submit", function (e) {
  checkRequired([signupEmail, signupPwd]);
  const iv2 = checkLength(signupEmail, 3, 34);
  const iv3 = checkLength(signupPwd, 6, 25);
  const iv4 = checkEmail(signupEmail);
  const iv5 = checkLength(confirmSignupPassword, 6, 25);
  const iv6 = checkPasswordMatch(signupPwd, confirmSignupPwd);
  const iv7 = checkLength(signupName, 3, 34);

  if (
    iv2 === true &&
    iv3 === true &&
    iv4 === true &&
    iv5 === true &&
    iv6 === true &&
    iv7 === true
  ) {
    return true;
  } else {
    e.preventDefault();
  }
});
