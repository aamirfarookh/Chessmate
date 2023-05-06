let form = document.getElementById("formcontainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  fetch("https://zany-lime-swordfish-cuff.cyclic.app/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.token) {
        alert("Wrong login Credentials");
      } else {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", res.email);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        alert("Login Successful!");
        window.location.href = "./index.html";
      }
    })
    .catch((err) => console.log(err));
});
