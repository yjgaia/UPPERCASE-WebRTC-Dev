WebRTCDev.MAIN = METHOD({

	run : (addRequestListener, addPreprocessor) => {
		
		TURN_SERVER({
			port : 18504
		}, (requestInfo, content, response) => {
			console.log('IP: ' + requestInfo.ip + ', Port: ' + requestInfo.port + ', Content: ' + content);
		});
	}
});
