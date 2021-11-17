//
// ─── OPPDATER ───────────────────────────────────────────────────────────────────

let gjenståendeTid = 0;

function oppdater() {
	// Hent de neste 5 eventene
	gapi.client.calendar.events
		.list({
			calendarId: "593nbfrgpc6v11jabv4rk44grk@group.calendar.google.com",
			timeMin: new Date().toISOString(),
			singleEvents: true,
			maxResults: 5,
			orderBy: "startTime",
		})
		.then((response) => {
			let sluttKl = [];
			let millisek = [];
			let eventer = response.result.items;

			// Finn slutt tidspunktet til eventene
			for (let i = 0; i < eventer.length; i++) {
				sluttKl[i] = new Date(eventer[i].end.dateTime);
				millisek.push(sluttKl[i].getTime());
			}
			const eventFerdig = Math.min(...millisek);
			const tidNå = new Date().getTime();

			// Finn ut hvor lenge det er til det første eventet er slutt
			gjenståendeTid = eventFerdig - tidNå;
		})
		.then(() => {
			// Funksjonen fyrer seg når "gjenståendeTid" er på 0
			setTimeout(() => {
				eventListe();
			}, gjenståendeTid);
		});
}
