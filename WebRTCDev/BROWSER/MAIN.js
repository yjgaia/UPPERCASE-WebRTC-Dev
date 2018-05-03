WebRTCDev.MAIN = METHOD({

	run : (params) => {
		
		WebRTCDev.MATCH_VIEW({
			uri : 'offer',
			target : WebRTCDev.Offer
		});
		
		WebRTCDev.MATCH_VIEW({
			uri : 'answer',
			target : WebRTCDev.Answer
		});
	}
});
