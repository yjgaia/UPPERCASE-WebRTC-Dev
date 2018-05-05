/*
 * TURN 서버를 생성하는 CLASS
 */
global.TURN_SERVER = CLASS({

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.port
		//REQUIRED: params.username
		//REQUIRED: params.credential
		
		let port = params.port;
		let username = params.username;
		let credential = params.credential;
		
		let Turn = require('node-turn');
		
		let credentials = {};
		credentials[username] = credential;
		
		let server = new Turn({
			listeningPort : port,
			authMech : 'long-term',
			credentials : credentials
		});
		
		server.start();
	}
});
