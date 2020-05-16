let midi, data, midiConsole

const log = logStr => {
    if (midiConsole) {
        midiConsole.textContent = midiConsole.textContent + " "+ logStr
    }
}

const onMidiStateChanged = e => {
    console.log("The MIDI state changed " + e.port.name + " " + e.port.manufacturer + ' ' + e.port.state)
    log("The MIDI state changed " + e.port.name + " " + e.port.manufacturer + ' ' + e.port.state)
}

const onMidiFail = error => {
    // when we get a failed response, run this code
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

const onMIDIMessage = message => {
    data = message.data
    log('MIDI Data ' + data);
    console.log('MIDI Data ', data);
}

const onMidiConnected = midiAccess => {
    midi = midiAccess
    const inputs = midiAccess.inputs.values()
    const outputs = midiAccess.outputs.values()

    midiAccess.onstatechange = onMidiStateChanged

    if(midiAccess.inputs.size === 0) {
        log('No MIDI Device connected. Connect and try again')
    }

    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

const captureMidi = () => {
    midiConsole = document.querySelector('#midiconsole')
    if (navigator.requestMIDIAccess) {
        console.log("RequestMIDIAccess is available")
        navigator.requestMIDIAccess({sysex: true}).then(onMidiConnected, onMidiFail)
    } else {
        log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim ");
    }
}