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
        Swal.fire({
          position: "centre",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "lobby.html"
        }, 2500)
      } else {
        Swal.fire({
          position: "centre",
          icon: "error",
          title: `${res.msg}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => console.log(err));
});


let googleBtn = document.getElementById("gbtn");

googleBtn.addEventListener("click",()=>{
  // window.location.href="leaderboard.html"
})
