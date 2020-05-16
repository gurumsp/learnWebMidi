//const song = ['data:audio/mid;base64,TVRoZAAAAAYAAQABAMBNVHJrAAAARwD/WAQEAhgIAP9RAwehIAD/AwlOZXcgVHJhY2sAwHMAkDxkMoA8MIEOkDxkMoA8MIEOkDxkMoA8MIEOkDxkgT+APDAB/y8A'];
const player = MIDI.Player;



const startMidi = () => {
    console.log("I'm starting the MIDI");
    player.timeWarp = 1; // speed the song is played back
    player.loadFile(song[0], player.start);
    player.addListener(playerListener);
}

const stopMidi = () => {
	player.stop();
}

const checkMidi = () => {
    MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var note = 50; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);
		}
	});
}
const playerListener = (data) => {
    console.log("The data is " + JSON.stringify(data));
}