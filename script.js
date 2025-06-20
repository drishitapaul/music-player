const tracks = [
  'track1.mp3',
  'track2.mp3',
  'track3.mp3',
  'track4.mp3',
  'track5.mp3'
];

const covers = [
  'cover1.jpeg',
  'cover2.jpeg',
  'cover3.jpeg',
  'cover4.jpeg',
  'cover5.jpeg'
];

let currentTrack = 0;
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const playPauseIcon = document.getElementById('play-pause-icon');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const cover = document.getElementById('cover');
const title = document.getElementById('song-title');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const timeDisplay = document.getElementById('time-display');

// Play/Pause toggle
playPauseBtn.onclick = () => {
  if (audio.paused) {
    audio.play();
    playPauseIcon.setAttribute("d", "M6 19h4V5H6zm8-14v14h4V5h-4z"); // Pause icon
  } else {
    audio.pause();
    playPauseIcon.setAttribute("d", "M8 5v14l11-7z"); // Play icon
  }
};

// Auto revert to play icon when track ends
audio.onended = () => {
  playPauseIcon.setAttribute("d", "M8 5v14l11-7z");
};

// Next track
nextBtn.onclick = () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  updateTrack();
};

// Previous track
prevBtn.onclick = () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  updateTrack();
};

// Volume control
volume.oninput = () => {
  audio.volume = volume.value;
};

// Time update display
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  timeDisplay.textContent = `${current} / ${duration}`;
};

// Seekbar logic
progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

// Load track details
function updateTrack() {
  audio.src = `./assets/music/${tracks[currentTrack]}`;
  cover.src = `./assets/covers/${covers[currentTrack]}`;
  title.textContent = `Track ${currentTrack + 1}`;
  audio.play();
  playPauseIcon.setAttribute("d", "M6 19h4V5H6zm8-14v14h4V5h-4z"); // Show pause icon
}

// Time formatting
function formatTime(time) {
  if (isNaN(time)) return "00:00";
  const mins = Math.floor(time / 60).toString().padStart(2, '0');
  const secs = Math.floor(time % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}
