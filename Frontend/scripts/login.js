let form = document.getElementById("formcontainer");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  fetch(`http://localhost:4500/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.msg == "Login success") {
        window.location.href = "lobby.html"
      } else {
       alert("Something went wrong")
      }
    })
    .catch((err) => console.log(err));
});


let googleBtn = document.getElementById("gbtn");

googleBtn.addEventListener("click",()=>{
  // window.location.href="leaderboard.html"
})
