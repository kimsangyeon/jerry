/**
 * Created by son on 2019-03-05.
 */
function connect(){
	sock = new SockJS(window.location.origin + '/stomp');
	stompClient = Stomp.over(sock);
	stompClient.connect({}, function(frame){
		stompClient.subscribe('/subscribe/logs', onMessageForLogs);
		stompClient.subscribe('/subscribe/accessLogs', onMessageForAccessLogs);
		stompClient.subscribe('/subscribe/errorLogs', onMessageForErrorLogs);
		stompClient.subscribe('/subscribe/usage', onMessageForUsage);
		stompClient.debug = null;
	});
}

function onMessageForLogs(message){
	if (message.body === "" || !clientConfig.checkedLog()) {
		return;
	}
	renderer.drawLog(message.body);
}

function onMessageForAccessLogs(message){
	if (message.body === "" || !clientConfig.checkedAccess()) {
		return;
	}

	var oData = JSON.parse(message.body);
	renderer.drawAccessLogs(oData);
	if (!!oData && oData.accessLogs.length === 0) {
		return;
	}

	var date = moment().add(0, 'd').format();
	var successCnt = 0;
	var failCnt = 0;
	oData.accessLogs.forEach(function (item) {
		var aData = item.split(' ');
		var length = aData.length;
		for (var i = 0; i < length; i++) {
			var code = Number(aData.pop());

			if (!!code && (code >= 200 && code <= 308)) {
				successCnt++;
				break;
			}
			if (!!code && (code >= 400 && code <= 599)) {
				failCnt++;
				break;
			}
		}
	});

	var oSuccess = {
		x: date,
		y: successCnt
	};
	var oFail = {
		x: date,
		y: failCnt
	};
	renderer.updateChart(oSuccess, oFail);
}

function onMessageForErrorLogs(message){
	if (message.body === "" || !clientConfig.checkedError()) {
		return;
	}
	renderer.drawErrorElem(JSON.parse(message.body));
}

function onMessageForUsage(message){
	if (message.body === "") {
		return;
	}
	renderer.drawUsage(JSON.parse(message.body));
}