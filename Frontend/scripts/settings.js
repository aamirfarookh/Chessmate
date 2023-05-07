/**
* Online chess game with websockets, webworkers, and more
* @namespace CHESSAPP
*/
let CHESSAPP = {};
/**
* Directory where resources for chess pieces are
* @property imageDir
*/  
CHESSAPP.globalSettings = {
	imageDir : "images/",
	debug : false,
	live: false,
	port: 4500
};

var gameSettings = {
	containerID : "container",
	online: true,
	preferredColor: false
};



