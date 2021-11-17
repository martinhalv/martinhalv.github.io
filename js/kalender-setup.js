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
				console.log("Velkommen!");
				eventListe();
			},
			function (error) {
				console.log(JSON.stringify(error, null, 2));
			}
		);
}
