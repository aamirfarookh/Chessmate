
<h1>CHESSMATE is a real-time multiplayer chess application with real-time video and chat supporting features built using WEBRTC and socket.io. It also includes login/signup using JWT and Google OAuth.<h1> 

<h3>Features:</h3>

- Real-time multiplayer chess game: Players can play against each other in real-time. They can move pieces on the board and see the opponent's moves in real-time.
- Real-time video: Players can see each other's video streams in real-time while playing the game.
- Chat: Players can chat with each other while playing the game.
- Login/Signup: Users can sign up for the application using their email and password. They can also sign in using their Google account.
- JWT: JSON Web Token is used for user authentication and authorization.

<h3>Technologies Used:</h3>

- WEBRTC: For real-time video and audio communication.
- Socket.io: For real-time communication between the server and the client.
- Node.js: For server-side development.
- Express.js: For building the RESTful API.
- MongoDB: As the database for storing user information and game data.
- Google OAuth: For user authentication and authorization.
  
 <h3>Application Flow</h3>

| Feature  |  Coded       | Description  |
|----------|:-------------:|:-------------|
| Home Page | &#10004; | Navigate the Application |
| Login & Register | &#10004; | Add user and store in DB |
| Lobby | &#10004; | To enter is any specific room to play |
| Rooms | &#10004; | Play game with real time video and chat |
| Leader Board | &#10004; | Show different user levels |  

<h3>How to Run the Application:</h3>

- Clone the repository from GitHub.
- Install Node.js and MongoDB on your local machine.
- Run npm install in the project directory to install the dependencies.
- Create a .env file in the project directory and add the following environment variables:

<h3>Run npm start to start the application.</h3>

Open the application in your web browser at http://localhost:4500. <br>
<strong>Note:</strong> You will need to obtain your own Google OAuth client ID and client secret by creating a project on the Google Developers Console.

<h3>Contributors:</h3>
  
  - Amir Farooq Bhat: Landing Page | Leader Board | Gameplay Integration 
  - Avishek Singh: Implemented WebRTC and socket.io for Real-Time Video & Chat 
  - Parimal Pramanik: Coded chess gameplay logic & backend 
  - Raghavendra Jingade: Integrated Google OAuth & SMTP for OTP and Forgot password Integration 
  - Mahendra Mohane: Login Page | Register Page & Backend server integration 
 
<h3>Landing Page</h3>
  
![index.html]("./Frontend/assets/index.png")
  
<h3>Login Page</h3>
  
![index.html]("./Frontend/assets/login.png")  
  
<h3>Register Page</h3>
  
![index.html]("./Frontend/assets/register.png")
  
<h3>Forgot Password</h3>
  
![index.html]("./Frontend/assets/forget.png") 
  
<h3>Reset Password</h3>
  
![index.html]("./Frontend/assets/reset.png")
  
<h3>Lobby</h3>
  
![index.html]("./Frontend/assets/lobby.png")  
  
<h3>Room</h3>
  
![index.html]("./Frontend/assets/room.png")  
  
<h3>Leader Board</h3>
  
![index.html]("./Frontend/assets/leader.png")  
  
<h3>Deployed Links:</h3>
  
  - FrontEnd: https://chessly.netlify.app/
  - Backend: https://chessmate-backend-production.up.railway.app/
  
<h3>License:</h3>
This project is licensed under the MIT License. See the LICENSE file for details.
