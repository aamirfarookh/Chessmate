let form2 = document.getElementById("resetpass");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    email: document.getElementById("user_email").value,
    password: document.getElementById("new_pass").value,
  };

  fetch("http://localhost:4500/user/resetpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.msg);
      if (res.msg === "Successfuly password changed") {
        alert(res.msg);
        window.location.href = "login.html";
      } else {
        alert(res.msg);
        window.location.href = "resetpass.html";
      }
    })
    .catch((err) => {
      console.log(err);
    });
});