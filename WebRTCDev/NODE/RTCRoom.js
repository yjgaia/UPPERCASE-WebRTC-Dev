WebRTCDev.RTCRoom = OBJECT({

	init : (inner, self) => {
		
		WebRTCDev.ROOM('RTC', (clientInfo, on, off, send, broadcastExceptMe) => {
			
			on('hello', () => {
				broadcastExceptMe({
					methodName : 'hello'
				});
			});
			
			on('offer', (sdp, ret) => {
				broadcastExceptMe({
					methodName : 'offer',
					data : sdp
				});
			});
			
			on('answer', (sdp, ret) => {
				broadcastExceptMe({
					methodName : 'answer',
					data : sdp
				});
			});
			
			on('candidate', (candidate, ret) => {
				broadcastExceptMe({
					methodName : 'candidate',
					data : candidate
				});
			});
		});
	}
});
