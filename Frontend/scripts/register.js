//
let form = document.getElementById("formcontainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    full_name: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    // account_name: document.getElementById("accountname").value,
  };

  fetch("https://zany-lime-swordfish-cuff.cyclic.app/users/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.msg != "Registration Successful") {
        console.log(res.msg), alert(res.msg);
      } else {
        localStorage.setItem("fname", res.fname);
        console.log(res.msg);
        alert(res.msg);
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        // document.getElementById("accountname").value = "";
        window.location.href = "login.html";
      }
    })
    .catch((err) => console.log(err));
});
