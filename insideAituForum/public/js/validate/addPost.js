const postContent = document.getElementById("postContent");
const postTitle = document.getElementById("postTitle");

const form = document.getElementById("add-post-form");
document.getElementById("bold").isToggled = false;

const editor = document.getElementById("editor");
editor.focus();

const toolbar = document.getElementById("toolbar");
editor.addEventListener("click", () => {});
form.addEventListener("submit", function (e) {
  const fetchDiv = document.getElementById("editor").innerHTML;
  const encoded = encodeURI(fetchDiv);
  var hiddenMarkup = document.getElementById("hiddenMarkup");
  hiddenMarkup.value = fetchDiv;

  document.getElementById("hiddenMarkup2").value = document.getElementById(
    "editor"
  ).innerText;

  let tagsArray = document.getElementById("tagsArray");
  let allTags = document.getElementsByClassName("tagsInput");

  let tempString = "";
  for (let i = 0; i < allTags.length; i++) {
    if (tempString === "") {
      tempString = `${allTags[0].value}`;
    } else {
      tempString = `${tempString},${allTags[i].value}`;
    }
  }
  tagsArray.value = tempString;

  const title = document.getElementById("postTitle");
});

function addInput() {
  const parentDiv = document.getElementById("addInput");
  const newDiv = document.createElement("input");
  newDiv.className = "tagsInput";
  parentDiv.appendChild(newDiv);
}
function deleteInput() {
  const parentDiv = document.getElementById("addInput");
  var x = parentDiv.lastChild;
  if (x.className !== "tagsInput") return;
  x.remove();
}
form.addEventListener("submit", function (e) {
  const title = document.getElementById("postTitle");

  checkRequired([title]);
  const iv2 = checkLength(title, 5, 340);
  if (iv2 === true) {
    return true;
  } else {
    e.preventDefault();
  }
});

const toggleAnswer = document.getElementById("toggleAnswer");
const toggleAnswerDiv = document.getElementById("toggleAnswerDiv");

toggleAnswer.addEventListener("click", (e) => {
  toggleAnswerDiv.style.display === "none"
    ? (toggleAnswerDiv.style.display = "block")
    : (toggleAnswerDiv.style.display = "none");
});
