const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update toggle button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Update volume and playback speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub to a specific point
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volumeSlider.addEventListener('input', handleRangeUpdate);
playbackSlider.addEventListener('input', handleRangeUpdate);

skipButtons.forEach(button => button.addEventListener('click', skip));

progress.addEventListener('click', scrub);
