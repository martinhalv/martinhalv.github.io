//
// ─── LAST INN EVENTER ───────────────────────────────────────────────────────────

let html = "";
let antallEventer = 10;
let dato = "";
function eventListe() {
	gapi.client.calendar.events
		.list({
			calendarId: "593nbfrgpc6v11jabv4rk44grk@group.calendar.google.com",
			timeMin: new Date().toISOString(),
			singleEvents: true,
			maxResults: antallEventer,
			orderBy: "startTime",
			//syncToken: syncToken,
		})
		.then(function (response) {
			lagEventliste(response);
			lastInn();
		})
		.then(() => {
			html = "";
		});
}

//
// ─── EVENTLISTE ─────────────────────────────────────────────────────────────────

function lagEventliste(responseItem) {
	let eventer = responseItem.result.items;
	for (let i = 0; i < eventer.length; i++) {
		lagEventObjekt(eventer[i]);
	}
}

//
// ─── EVENTOBJEKT ────────────────────────────────────────────────────────────────

function lagEventObjekt(eventer) {
	let eventObjekt = {
		iCalUID: eventer.iCalUID,
		eventDato: eventer.start.dateTime,
		eventNavn: eventer.summary,
		eventRom: eventer.location,
		eventStart: eventer.start.dateTime,
		eventSlutt: eventer.end.dateTime,
		eventBeskrivelse: eventer.description,
	};

	formaterEventbokser(eventObjekt);
}

//
// ─── LAG EVENTBOKSER ────────────────────────────────────────────────────────────

function formaterEventbokser(event) {
	let tid = datoFormat(event);
	let dato = "";
	let eventDato = "";
	let wrapper = document.createElement("div");
	let eventBoks = document.createElement("div");
	let eventNavn = document.createElement("p");
	let eventRom = document.createElement("p");
	let eventKl = document.createElement("p");
	let deler = document.createElement("hr");
	let eventTekst = document.createElement("p");

	if (tid.dato !== "") {
		dato = tid.dato.charAt(0).toUpperCase() + tid.dato.slice(1);
		eventDato = document.createElement("p");
		eventDato.textContent = dato;
		eventDato.setAttribute("class", "dato");
		wrapper.append(eventDato);
	}

	eventNavn.textContent = event.eventNavn;
	eventRom.textContent = event.eventRom;
	eventKl.textContent = tid.startKl;
	eventKl.textContent += " - ";
	eventKl.textContent += tid.sluttKl;
	eventTekst.textContent = event.eventBeskrivelse;

	wrapper.setAttribute("class", "event-boks-wrapper");
	eventBoks.setAttribute("class", `event-boks ${småBokstaver(eventRom)}`);

	eventNavn.setAttribute("class", "event-navn");
	eventRom.setAttribute("class", `rom farge-${småBokstaver(eventRom)}`);
	eventKl.setAttribute("class", "klokkeslett");
	eventTekst.setAttribute("class", "beskrivelse");

	wrapper.append(eventBoks);
	eventBoks.append(eventNavn, eventRom, eventKl, deler, eventTekst);

	html += wrapper.innerHTML;
	document.getElementById("eventer").innerHTML = html;
}

//
// ─── DATOFORMATERING ────────────────────────────────────────────────────────────

function datoFormat(dato) {
	formatertTid = {
		dato: new Date(dato.eventDato).toLocaleString("no-NO", {
			weekday: "short",
			day: "2-digit",
			month: "2-digit",
		}),
		startKl: new Date(dato.eventStart).toLocaleString("no-NO", {
			hour: "2-digit",
			minute: "2-digit",
		}),
		sluttKl: new Date(dato.eventSlutt).toLocaleString("no-NO", {
			hour: "2-digit",
			minute: "2-digit",
		}),
		måned: new Date(dato.eventDato).toLocaleString("no-NO", {
			month: "long",
		}),
	};
	formatertTid.dato = sjekkDato(formatertTid);
	return formatertTid;
}

//
// ─── SJEKK DATO ─────────────────────────────────────────────────────────────────

let nyDato = "";
let forrigeDato = "";
function sjekkDato(dato) {
	if (dato.dato === forrigeDato) {
		nyDato = "";
	} else {
		nyDato = dato.dato;
		forrigeDato = dato.dato;
	}
	return nyDato;
}

//
// ─── LAST INN-KNAPP ─────────────────────────────────────────────────────────────

function lastInn() {
	document.getElementById("last-inn").addEventListener("click", function () {
		antallEventer += 10;
		gapi.load("client", eventListe);
	});
}

function småBokstaver(navn) {
	return navn.textContent.toLowerCase();
}
