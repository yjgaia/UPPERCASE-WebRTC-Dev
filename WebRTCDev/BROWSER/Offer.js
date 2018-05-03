WebRTCDev.Offer = CLASS({

	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let rtcRoom = WebRTCDev.ROOM('RTC');
		
		let peerConnection = new RTCPeerConnection({
			iceServers : [
			//	{url:'stun:stun.l.google.com:19302'}
			]
		});
		
		peerConnection.onicecandidate = (e) => {
			if (e.candidate !== TO_DELETE) {
				rtcRoom.send({
					methodName : 'candidate',
					data : e.candidate.candidate
				});
			}
		};
		
		// 인사를 받으면 Offer를 생성합니다.
		rtcRoom.on('hello', () => {
			
			let dataChannel = peerConnection.createDataChannel('test');
			
			dataChannel.onerror = (error) => {
				console.log('dataChannel error : ' + error);
			};
			dataChannel.onmessage = (e) => {
				console.log('received dataChannel data : ' + e.data);
			}
			dataChannel.onopen = ()	=> {
				console.log('dataChannel is opened');
			};
			dataChannel.onclose = () => {
				console.log('dataChannel is disconnected');
			};
			
			peerConnection.createOffer((description) => {
				peerConnection.setLocalDescription(description);
				
				// Offer 전송
				rtcRoom.send({
					methodName : 'offer',
					data : description.sdp
				});
			},
			
			() => {
				// ignore.
			});
		});
		
		// Answer를 받으면 연결합니다.
		rtcRoom.on('answer', (sdp) => {
			peerConnection.setRemoteDescription(new RTCSessionDescription({
				type : 'answer',
				sdp : sdp
			}));
		});
	}
});
