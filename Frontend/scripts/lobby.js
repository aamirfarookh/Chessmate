

const baseServerUrl = `http://localhost:4500`

console.log(document.cookie)

const token = document.cookie
.split('; ')
.find(row => row.startsWith('JAA_access_token=')).split('=')[1];

async function isLoginValid(){
     try {
        const req = await fetch(`${baseServerUrl}/auth`,{
            headers:{
                "content-type":"application/json",
                 Authorization:token
            }  
        });
        const res = await req.json();
        if(res.status == 200){
            let form = document.getElementById('lobby__form')

            let displayName = sessionStorage.getItem('display_name')
            if(displayName){
                form.name.value = displayName
            }
            
            form.addEventListener('submit', (e) => {
                e.preventDefault()
                sessionStorage.setItem('display_name', e.target.name.value)
            
                let inviteCode = e.target.room.value
                if(!inviteCode){
                    inviteCode = String(Math.floor(Math.random() * 10000))
                }
                window.location = `/room.html?room=${inviteCode}` 
                
            })
        }
        else{
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

isLoginValid()






