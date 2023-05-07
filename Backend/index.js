
// Improting all the required dependencies
const express = require("express");
const http = require("http");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { dbConnection } = require("./config/db");
const path = require("path")
const passport = require("passport")
const socketio = require('socket.io');
const { lboardRouter } = require("./routes/leaderboard.route");
const { userRouter } = require("./routes/user.route");




// Server configuration
const app = express();
const server = http.createServer(app);
let session = require("express-session");
const PORT = process.env.PORT || 4500;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: "chess secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(express.static(path.join(__dirname,"../Frontend")))

// console.log((path.join(__dirname,"../Frontend")))

// Basic endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"../Frontend/index.html"))
});


app.use("/leaderboard",lboardRouter)

app.use("/user", userRouter);


// socket config 
const fs = require("fs"),
url = require("url"),
port = process.env.PORT || 5000,
queue = {
	'W' : [],
	'B' : [],
	'U' : [] //undefined (player does not care which color)
};

var io = socketio(server)

/* websocket server 
   all sent with JSON encoding
   */
/**
@class GameList singleton which defines the gamelist linked list
**/
var GameList = (function(){
	/**
	@class Node defines a linked list node
	@param obj the object the node contains
	@param next the next node
	**/
	var Node = function(obj, next){
		this.obj = obj;
		this.next = next;
	};
	var that = {},
		rear = null,//circular linked list, this is a pointer to the last node
		size = 0,//size of linked list
		unique = 0; //functions as game id

	/**
	Adds a game to the game list circular linked list
	@method addGame
	@param {Object} white the white player's socket
	@param {Object} black the black player's socket
	**/
	that.addGame = function(white, black){
		if(rear == null){
			rear = new Node(new Game(white, black, unique), null);
			rear.next = rear;
		}
		else{
			var newNode = new Node(new Game(white, black, unique), rear.next);
			rear.next = newNode;
			rear = newNode;
		}
		size++;
		unique++;
		that.showGames();
	}

	that.removeGame = function(gid){
		console.log("Removing game" + gid);
		if(rear == null){
			console.log("Problem -- removing game from null list");
			return;	
		}
		/* 
			linear search, not digging this, perhaps later if this ever gets popular (not very likely) use an AVL tree or hash table
		*/
		var ptr = rear.next, prev = rear;
		if(ptr == null) return;

		do{
			if(ptr.obj.gid == gid){
				//remove this guy
				console.log("Removing game " + gid);
				if(ptr.next == ptr){
					//linked list of one node
					rear = null;
				}
				else{
					prev.next = ptr.next;
					ptr.next = null;
					if(ptr == rear){
						rear = prev;
					}
				}
				size--;
				that.showGames();
				return;
			}
			prev = ptr;
			ptr = ptr.next;
		}while(ptr != rear.next);
	};
/* for debugging */
	that.showGames = function(){
		if(rear == null){
			console.log("List empty");
			return;
		}
		var ptr = rear.next;
		var str = "Game List:\n";
		do{
			str += ptr.obj.gid + " ";
			ptr = ptr.next;
		}while(ptr != rear.next)
		console.log(str);
	}
	return that;
}());


var Game = function(w, b, gid){

	var that = this,//reference in event functions
		disconnected = false;

	that.wPlayer = w;
	that.bPlayer = b;
	that.gid = gid;
	that.waitingForPromotion = false;


	console.log("Game started");

	//remove the listener which removes it from the queue (since it no longer is on the queue)
	that.wPlayer.removeAllListeners('disconnect');
	that.bPlayer.removeAllListeners('disconnect');

	that.wPlayer.on('disconnect', function(){
		//alert other player
		if(that.bPlayer != null){
			that.bPlayer.emit('partnerDisconnect');
		}
		that.wPlayer = null;
		that.destroy();
	});

	that.bPlayer.on('disconnect', function(){
		if(that.wPlayer != null){
			that.wPlayer.emit('partnerDisconnect');
		}
		that.bPlayer = null;
		that.destroy();
	});

	that.wPlayer.on('chat', function(data){
		if(!disconnected){
			that.bPlayer.emit('chat', data);
		}
	});

	that.bPlayer.on('chat', function(data){
		if(!disconnected){
			that.wPlayer.emit('chat', data);
		}
	});

	that.wPlayer.on('movemade', function(data){
		console.log("White player made a move");
		if(!disconnected){
			that.bPlayer.emit('opposing_move', data);
		}
	});
	that.bPlayer.on('movemade', function(data){
		console.log("Black player made a move");
		if(!disconnected){
			that.wPlayer.emit('opposing_move', data);
		}
	});

	that.destroy = function(){
		disconnected = true;
		if(that.wPlayer == null && that.bPlayer == null){
			GameList.removeGame(that.gid);
		}
	}
	//all event listeners to w and b sockets for communication
	that.init();

	return that;
};
Game.prototype = {
	wPlayer : null,
	bPlayer : null,
	init: function(){
		//send messages to wPlayer and bPlayer that game has started, and give them the color assigned (since they may not know the color)
		this.wPlayer.emit("matchfound", {
			color: 'W'
		});
		this.bPlayer.emit("matchfound", {
			color: 'B'
		});
	}
}



//may need to add some securing to prevent thread accidents in the following method later
io.sockets.on('connection', function (sk) {
	var w = null,
	b = null,
	skColor = false;
	console.log("web socket connection recieved");


	sk.on('setup', function (data) {
  	 //remove this event once match is found and setup is complete  
  	 sk.on('disconnect', function(){
  	 	if(!!queue[skColor]){
  	 		var index = queue[skColor].indexOf(sk);
  	 		console.log("Removing player from queue");
  	 		queue[skColor].splice(index,1);
  	 	}
  	 });
  	 console.log(data);
  	 skColor = data.color;
  	 if(!skColor){skColor = 'U';}

  	 if(skColor == 'W'){
  	 	if(queue['B'].length > 0){
  	 		b = queue['B'].shift();
  			//start new game
  			GameList.addGame(sk, b);
  		}
  		else if(queue['U'].length > 0){
  			b = queue['U'].shift();
  			//start new game
  			GameList.addGame(sk, b);
  		}
  		else{
  			queue['W'].push(sk);
  		}
  	}
  	else if(skColor == 'B'){
  		if(queue['W'].length > 0){
  			w = queue['W'].shift();
  			//start new game
  			GameList.addGame(w, sk);
  		}
  		else if(queue['U'].length > 0){
  			w = queue['U'].shift();
  			//start new game
  			GameList.addGame(w, sk);
  		}
  		else{
  			queue['B'].push(sk);
  		}
  	}
  	else{ 
  		//either white or no color specified, add player to whichever queue is waiting for oponent
  		if(queue['W'].length > 0){
  			w = queue['W'].shift();
  			//start new game
  			GameList.addGame(w, sk);
  		}
  		else if(queue['B'].length > 0){
  			b = queue['B'].shift();
  			//start new game
  			GameList.addGame(sk, b);
  		}
  		else if(queue['U'].length > 0){
  			w = queue['U'].shift();//just give it to white
  			//start new game
  			GameList.addGame(w, sk);
  		}
  		else{
  			queue['U'].push(sk);
  		}
  	}

  });
});

// Listening to connections made to server
server.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
    await dbConnection;
    console.log("Connection established to database");
  } catch (error) {
    console.log(error);
  }
});
