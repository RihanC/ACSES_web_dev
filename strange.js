document.addEventListener('DOMContentLoaded', () => {
  const bulbs = Array.from(document.querySelectorAll('.bulb'));
  const btnLights = document.getElementById('btnLights');
  const btnSound  = document.getElementById('btnSound');
  const scene     = document.getElementById('scene');
  const portal    = document.getElementById('portal');
  const starsCont = document.getElementById('stars');
  const bgMusic   = document.getElementById('bgMusic'); // 🎵 your custom music

  // --- State
  let lightsOn = true;
  let isUpside = false;
  let isPlaying = false;

  // create stars
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = (Math.random() * 100) + '%';
    s.style.top  = (Math.random() * 100) + '%';
    s.style.opacity = (0.3 + Math.random() * 0.9).toFixed(2);
    s.style.transform = 'scale(' + (0.4 + Math.random() * 1.6) + ')';
    starsCont.appendChild(s);
  }

  // bulbs click toggles
  bulbs.forEach(b => {
    b.addEventListener('click', () => {
      b.classList.toggle('on');
    });
  });

  function setLights(on) {
    bulbs.forEach(b => b.classList.toggle('on', on));
    btnLights.textContent = on ? 'Lights: On' : 'Lights: Off';
  }

  // Lights button
  btnLights.addEventListener('click', () => {
    lightsOn = !lightsOn;
    setLights(lightsOn);
  });

  // Scene flip
  scene.addEventListener('click', () => {
    isUpside = !isUpside;
    scene.classList.toggle('upside', isUpside);
  });

  // --- Music toggle (uses <audio> element)
  function toggleSound() {
    if (!isPlaying) {
      bgMusic.play().catch(err => {
        console.warn("Music play failed:", err);
        alert("Autoplay blocked. Please click the button to allow sound.");
      });
      isPlaying = true;
      btnSound.textContent = "Sound: On";
    } else {
      bgMusic.pause();
      isPlaying = false;
      btnSound.textContent = "Sound: Off";
    }
  }

  btnSound.addEventListener("click", toggleSound);

  // Keyboard shortcuts: L, S
  window.addEventListener("keydown", e => {
    const k = e.key.toLowerCase();
    if (k === "l") {
      lightsOn = !lightsOn;
      setLights(lightsOn);
    } else if (k === "s") {
      toggleSound();
    }
  });

  // small portal breathing
  setInterval(() => {
    const blur = 6 + Math.random() * 7;
    portal.style.filter = `blur(${blur}px) saturate(${1 + Math.random() * 0.5})`;
  }, 1800);

  // initial UI
  setLights(lightsOn);
  btnSound.textContent = "Sound: Off";

  console.log('Stranger Nights ready — keys: L (lights) S (sound).');
});
