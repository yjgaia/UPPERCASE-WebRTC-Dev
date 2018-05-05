WebRTCDev.Answer = CLASS({

	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let rtcRoom = WebRTCDev.ROOM('RTC');
		
		let peerConnection = new RTCPeerConnection({
			iceTransportPolicy : 'relay',
			iceServers : [{
				urls : 'turn:localhost:18504',
				username : 'test',
				credential : 'test'
			}]
		});
		
		peerConnection.ondatachannel = (e) => {
			
			let dataChannel = e.channel;
			
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
			
			dataChannel.send('HELLO!!!');
		};
		
		// 인사를 보냅니다.
		rtcRoom.send('hello');
		
		// Offer를 받으면 Answer를 생성합니다.
		rtcRoom.on('offer', (sdp) => {
			
			peerConnection.setRemoteDescription(new RTCSessionDescription({
				type : 'offer',
				sdp : sdp
			}));
			
			// Answer 생성
			peerConnection.createAnswer((description) => {
				peerConnection.setLocalDescription(description);
				
				// Offer 전송
				rtcRoom.send({
					methodName : 'answer',
					data : description.sdp
				});
			},
			
			() => {
				// ignore.
			});
		});
		
		// Candidate를 받으면 등록합니다.
		rtcRoom.on('candidate', (candidate) => {
			peerConnection.addIceCandidate(new RTCIceCandidate({
				candidate : candidate
			}));
		});
	}
});
