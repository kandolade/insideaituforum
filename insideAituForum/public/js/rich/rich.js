
function makeBold() {
  const editor = document.getElementById("editor");
  editor.focus();
  if (document.getElementById("bold").isToggled) {
    document.execCommand("bold");
    document.getElementById("bold").style.backgroundColor = "black";
    document.getElementById("bold").isToggled = false;
  } else {
    document.execCommand("bold");
    document.getElementById("bold").style.backgroundColor = "red";
    document.getElementById("bold").isToggled = true;
  }
}

function dopp() {
  const editor = document.getElementById("editor");
  editor.focus();
  if (document.getElementById("increase").isToggled) {
    document.execCommand("fontSize", true, "4");
    document.getElementById("increase").style.backgroundColor = "black";
    document.getElementById("increase").isToggled = false;
  } else {
    document.execCommand("fontSize", true, "4");
    // document.getElementById("increase").style.backgroundColor = "red";
    document.getElementById("increase").isToggled = true;
  }
}

function dop2() {
  const editor = document.getElementById("editor");
  editor.focus();
  if (document.getElementById("decrease").isToggled) {
    document.execCommand("fontSize", true, "2");
    document.getElementById("decrease").style.backgroundColor = "black";
    document.getElementById("decrease").isToggled = false;
  } else {
    document.execCommand("fontSize", true, "2");
    document.getElementById("decrease").isToggled = true;
  }
}

function makeItalic() {
  const editor = document.getElementById("editor");
  editor.focus();
  if (document.getElementById("italic").isToggled) {
    document.execCommand("italic");
    document.getElementById("italic").style.backgroundColor = "black";
    document.getElementById("italic").isToggled = false;
  } else {
    document.execCommand("italic");
    document.getElementById("italic").style.backgroundColor = "red";
    document.getElementById("italic").isToggled = true;
  }
}

function doUnderline() {
  const editor = document.getElementById("editor");
  editor.focus();
  document.execCommand("underline");
  if (document.getElementById("underline").isToggled) {
    document.getElementById("underline").style.backgroundColor = "black";
    document.getElementById("underline").isToggled = false;
  } else {
    document.getElementById("underline").style.backgroundColor = "red";
    document.getElementById("underline").isToggled = true;
  }
}

function doAddImage() {
  const editor = document.getElementById("editor");
  editor.focus();
  var image_url = prompt("Image URL:");
  if (image_url != "") {
    document.execCommand("insertImage", false, image_url);
  } else {
    alert("You must set a URL!");
  }
}

function justifyLeft() {
  const editor = document.getElementById("editor");
  editor.focus();
  document.execCommand("justifyLeft");
}

function justifyCenter() {
  const editor = document.getElementById("editor");
  editor.focus();
  document.execCommand("justifyCenter");
}

function justifyRight() {
  const editor = document.getElementById("editor");
  editor.focus();
  document.execCommand("justifyRight");
}

function doSetTextColor() {
  const editor = document.getElementById("editor");
  editor.focus();
  var text_color = prompt("CSS Color:");
  if (text_color !== "") {
    document.execCommand("foreColor", false, text_color);
  } else {
    alert("You must set a Color!");
  }
}
