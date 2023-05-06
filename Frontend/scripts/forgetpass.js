let form2 = document.getElementById("getotp");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    email: document.getElementById("user_email").value,
  };

  fetch("http://localhost:4500/user/getotp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.msg);
      alert(res.msg);
    })
    .catch((err) => {
      console.log(err);
      alert(res.msg);
    });
});

let form = document.getElementById("verifyOTP");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    otp: document.getElementById("otp").value,
  };

  console.log(payload.otp);

  fetch("http://localhost:4500/user/verifyotp", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.msg);
      if (res.msg === "OTP verification successful") {
        alert(res.msg);
        window.location.href = "resetpass.html";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => console.log(err));
});