/* Google API - Setup */
function handleClientLoad() {
	gapi.load("client:auth2", initClient);
}

function initClient() {
	gapi.client
		.init({
			apiKey: "AIzaSyAD0zH-5cPFqyxRKvMD2d8ONzBmco6yC90",
			discoveryDocs: [
				"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
			],
			clientId:
				"325028874797-d7ojmgh2t4v1j2errni0ljq66f0mg473.apps.googleusercontent.com",

			scope: "https://www.googleapis.com/auth/calendar",
		})
		.then(
			function () {
				gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
				updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			},
			function (error) {
				console.log(JSON.stringify(error, null, 2));
			}
		);
}

function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		console.log("Du er logget inn!");
		eventListe();
	} else {
		console.log("Du må logge inn");
		gapi.auth2.getAuthInstance().signIn();
	}
}
