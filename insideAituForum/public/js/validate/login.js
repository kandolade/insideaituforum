const loginEmail = document.getElementById("loginEmail");
const loginPwd = document.getElementById("loginPassword");

const form = document.getElementById("loginForm");

//Event Listeners
form.addEventListener("submit", function (e) {
  checkRequired([loginEmail, loginPwd]);
  const iv2 = checkLength(loginEmail, 3, 34);
  const iv3 = checkLength(loginPwd, 6, 25);
  const iv4 = checkEmail(loginEmail);
  //        window.location = "/login";
  if (iv2 === true && iv3 === true && iv4 === true) {
    return true;
  } else {
    e.preventDefault();
  }
});
