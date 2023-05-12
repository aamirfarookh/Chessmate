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
        localStorage.setItem("chessmate-email",payload.email);
        console.log(document.cookie)
        const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('JAA_access_token='))
      .split('=')[1];
      console.log(token);
        Swal.fire({
          position: "centre",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 2400,
          position:"center"
        });
        setTimeout(() => {
          window.location.href = "lobby.html"
        }, 2500)
      }
       else {
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
