const textToSpeechTextarea = document.getElementById('text-to-speech');
const speakButton = document.getElementById('speak-btn');
const downloadButton = document.getElementById('download-btn');
const audioElement = document.getElementById('audio');

speakButton.addEventListener('click', () => {
    const text = textToSpeechTextarea.value;
    textToSpeech(text);
});

downloadButton.addEventListener('click', () => {
    const blob = new Blob([audioElement.src], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speech.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

function textToSpeech(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.lang = 'en-US';

    speechSynthesis.speak(speech);

    speech.onend = function() {
        const blob = new Blob([new Uint8Array(audioData)], { type: 'audio/mpeg' });
        const audioURL = URL.createObjectURL(blob);
        audioElement.src = audioURL;
    };
}