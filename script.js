let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-US"; // Use "hi-IN" for Hindi
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const hour = new Date().getHours();
  if (hour < 12) {
    speak("Good morning Sir");
  } else if (hour < 16) {
    speak("Good afternoon Sir");
  } else {
    speak("Good evening Sir");
  }
}

window.addEventListener("load", wishMe);

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "inline-block";
  voice.style.display = "none";

  if (message.includes("hello")) {
    speak("Hello Sir, how can I help you?");
  } else if (message.includes("who are you")) {
    speak("I am your virtual assistant, created by Anurag Sir.");
  } else if (message.includes("open google")) {
    speak("Opening Google.");
    window.open("https://www.google.com", "_blank");
  } else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    speak("The time is " + time);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleDateString([], { day: 'numeric', month: 'long' });
    speak("Today's date is " + date);
  } else {
    speak("This is what I found on the internet.");
    window.open(`https://www.google.com/search?q=${message}`, "_blank");
  }
}
