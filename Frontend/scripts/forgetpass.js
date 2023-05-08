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
      Swal.fire({
        position: "centre",
        icon: "success",
        title: "OTP sent Successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        position: "centre",
        icon: "error",
        title: `${err.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
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
        Swal.fire({
          position: "centre",
          icon: "success",
          title: "Verified Successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "resetpass.html"
        }, 2500)
      } else {
        Swal.fire({
          position: "centre",
          icon: "error",
          title: "Incorrect OTP",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
    .catch((err) => console.log(err));
});