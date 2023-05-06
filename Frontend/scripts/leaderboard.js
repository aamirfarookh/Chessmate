 
 let tbody = document.querySelector("tbody");
 let baseServerUrl = `http://localhost:4500`


 async function fetchUsers(){
   try {
     const req = await fetch(`${baseServerUrl}/leaderboard`);
     const res = await req.json();
     console.log(res)
      appendRow(res.splice(0,10))
   } catch (error) {
     console.log(error)
   }
 }
window.addEventListener("load",()=>{
 fetchUsers()
})


 function makeRow(i,name,wins,losses,draws,level){
   return `<tr>
         <td class="ranking">${i}</td>
         <td class="player-name">
           <img
             src="/assets/king.png"
             alt="Player 2"
             class="player-photo"
           />
           <p>${name}</p>
         </td>

         <td class="wins"><span class="win">${wins}</span></td>
         <td class="losses"><span class="loss">${losses}</span></td>
         <td class="draws"><span class="draw">${draws}</span></td>
         <td><span class="rank">${level}</span></td>
       </tr>`
 }


 function appendRow(users){
      tbody.innerHTML ="";
      console.log(users)
      let mapped = users.map((user,i)=>{
       let level ="";
       if(user.nor_of_wins<5){
         level = "BEGINNER"
       }
       else if(user.nor_of_wins>=5 && user.nor_of_wins<=20){
         level = "AMATUER"
       }
       else if(user.nor_of_wins>20 && user.nor_of_wins<=50){
         level = "INTERMEDIATE"
       }
       else if(user.nor_of_wins>50){
         level = "EXPERT/MASTER"
       }
       return makeRow(i+1,user.full_name,user.nor_of_wins,user.nor_of_games,user.nor_of_wins,level)
      }).join(" ");
     console.log(mapped)
      tbody.innerHTML =mapped
 }