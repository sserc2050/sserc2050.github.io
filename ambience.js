(() => {
  const tracks = ['assets/music/1.mp3', 'assets/music/2.mp3', 'assets/music/3.mp3', 'assets/music/4.mp3'];
  const audio = new Audio();
  audio.preload = 'auto';
  audio.volume = 0.35;
  let current = 0;
  let isPlaying = false;
  const modal = document.getElementById('ambiencePopup');
  const playButton = document.getElementById('ambiencePlay');
  const silentButton = document.getElementById('ambienceSilent');
  const toggle = document.getElementById('ambienceToggle');

  function setTrack(index) {
    current = index;
    audio.src = tracks[current];
    audio.load();
  }
  async function startMusic() {
    if (!audio.src) setTrack(0);
    try {
      await audio.play();
      isPlaying = true;
      modal.hidden = true;
      toggle.hidden = false;
      toggle.textContent = '♫ Ambience: ON';
      toggle.setAttribute('aria-pressed', 'true');
    } catch (error) {
      isPlaying = false;
      toggle.hidden = false;
      toggle.textContent = '♫ Play ambience';
      toggle.setAttribute('aria-pressed', 'false');
      modal.hidden = false;
    }
  }
  audio.addEventListener('ended', () => {
    current = (current + 1) % tracks.length;
    setTrack(current);
    if (isPlaying) audio.play().catch(() => {
      isPlaying = false;
      modal.hidden = false;
      toggle.textContent = '♫ Play ambience';
      toggle.setAttribute('aria-pressed', 'false');
    });
  });
  playButton.addEventListener('click', () => startMusic());
  silentButton.addEventListener('click', () => {
    modal.hidden = true;
    toggle.hidden = false;
    toggle.textContent = '♫ Play ambience';
    toggle.setAttribute('aria-pressed', 'false');
  });
  toggle.addEventListener('click', async () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      toggle.textContent = '♫ Play ambience';
      toggle.setAttribute('aria-pressed', 'false');
    } else {
      await startMusic();
    }
  });
  setTrack(0);
  startMusic();
})();
