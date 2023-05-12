const baseServerUrl = `http://localhost:4500`

console.log(document.cookie)

const access_token = document.cookie
.split('; ')
.find(row => row.startsWith('JAA_access_token=')).split('=')[1];



async function isLoginValid(){
  try {
    const req = await fetch(`${baseServerUrl}/auth`,{
      headers:{
          "content-type":"application/json",
           Authorization:access_token
      }  
  });
  const res = await req.json();
  if(res.status === 200){

  }
  else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please login first",
      showConfirmButton: false,
      timer: 2400
    });
    setTimeout(() => {
      window.location.href ="login.html"
    }, 3000);
  }
  } catch (error) {
    console.log(error)
  }
}


let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chat_container = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activechat_container = false;

chatButton.addEventListener('click', () => {
  if (activechat_container) {
    chat_container.style.display = 'none';
  } else {
    chat_container.style.display = 'block';
  }

  activechat_container = !activechat_container;
});

let displayFrame = document.getElementById('stream__box')
let videoFrames = document.getElementsByClassName('video__container')
let userIdInDisplayFrame = null;

let expandVideoFrame = (e) => {

  let child = displayFrame.children[0]
  if(child){
      document.getElementById('streams__container').appendChild(child)
  }

  displayFrame.style.display = 'block'
  displayFrame.appendChild(e.currentTarget)
  userIdInDisplayFrame = e.currentTarget.id

  for(let i = 0; videoFrames.length > i; i++){
    if(videoFrames[i].id != userIdInDisplayFrame){
      videoFrames[i].style.height = '100px'
      videoFrames[i].style.width = '100px'
    }
  }

}

for(let i = 0; videoFrames.length > i; i++){
  videoFrames[i].addEventListener('click', expandVideoFrame)
}


let hideDisplayFrame = () => {
    userIdInDisplayFrame = null
    displayFrame.style.display = null

    let child = displayFrame.children[0]
    document.getElementById('streams__container').appendChild(child)

    for(let i = 0; videoFrames.length > i; i++){
      videoFrames[i].style.height = '300px'
      videoFrames[i].style.width = '300px'
  }
}

displayFrame.addEventListener('click', hideDisplayFrame)








