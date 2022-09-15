let confirmPass = () => {
  let pass1 = document.getElementById("spswd").value;
  let pass2 = document.getElementById("cpswd").value;
  let errortab = document.getElementById("error");
  if (pass1 !== pass2) {
    errortab.innerHTML = "Passwords do not match";
    errortab.setAttribute("style", "color:red;");
    return false;
  } else {
    errortab.innerHTML = "Passwords Matched";
    errortab.setAttribute("style", "color:green;");
    return true;
  }
};

let validateUsername = () => {
  const nameRegex = /^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9~!@#$%^&*()';":.,/?])/;
  let errortab = document.getElementById("uerror");
  let username = document.getElementById("uname").value;
  if (!nameRegex.test(username)) {
    document.getElementById("uerror").innerHTML = "Invalid Username";
    errortab.setAttribute("style", "color:red;");
    return false;
  } else {
    document.getElementById("uerror").innerHTML = "";
    return true;
  }
};

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && (event.key === "m" || event.key === "M")) {
    let ele = document.body;
    ele.classList.toggle("dark-mode");
  }
});

function submit_form(e) {
  e.preventDefault();
  const name = document.getElementById("mname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("uname").value;
  const lead = document.getElementById("lead").value;
  const mems = Array.from(document.querySelectorAll("#members>li"));
  let m = [];
  for (let i = 0; i < mems.length; i++) {
    m.push(mems[i].innerHTML);
  }
  console.log(m);
  if (validateUsername() && confirmPass()) {
    alert(
      JSON.stringify({
        Name: name,
        Email: email,
        Username: username,
        "Team Lead": lead,
        "Team Members": m,
      })
    );
    return true;
  } else {
    return false;
  }
}

function drags() {
  let dragged;

  dragged = null;

  document.addEventListener("dragstart", (event) => {
    return (dragged = event.target);
  });

  document.addEventListener("dragover", function (event) {
    return event.preventDefault();
  });

  document.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.className === "dest") {
      dragged.parentNode.removeChild(dragged);
      return event.target.appendChild(dragged);
    }
  });
}

function dragd() {
  let dragged;

  dragged = null;

  document.addEventListener("dragstart", (event) => {
    return (dragged = event.target);
  });

  document.addEventListener("dragover", function (event) {
    return event.preventDefault();
  });

  document.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.className === "source") {
      dragged.parentNode.removeChild(dragged);
      return event.target.appendChild(dragged);
    }
  });
}
