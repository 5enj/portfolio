// ========================
// ПЕРЕМИКАЧ МОВ UA / EN
// ========================
const langToggle = document.getElementById('langToggle');
let currentLang = 'ua';

langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'ua' ? 'en' : 'ua';
  langToggle.textContent = currentLang === 'ua' ? 'UA / EN' : 'EN / UA';
  document.querySelectorAll('[data-ua][data-en]').forEach(el => {
    el.textContent = currentLang === 'ua'
      ? el.getAttribute('data-ua')
      : el.getAttribute('data-en');
  });
});

// ========================
// HERO: PLAY / PAUSE
// ========================
const heroVideo = document.getElementById('heroVideo');
const heroVideoToggle = document.getElementById('heroVideoToggle');

function updateHeroVideoButton() {
  const isPaused = heroVideo.paused;
  heroVideoToggle.dataset.state = isPaused ? 'paused' : 'playing';
  heroVideoToggle.setAttribute(
    'aria-label',
    isPaused ? 'Відтворити відео' : 'Поставити відео на паузу'
  );
}

heroVideoToggle.addEventListener('click', () => {
  heroVideoToggle.classList.remove('is-changing');
  void heroVideoToggle.offsetWidth;
  heroVideoToggle.classList.add('is-changing');

  window.setTimeout(() => {
    if (heroVideo.paused) {
      heroVideo.play().catch(() => {});
    } else {
      heroVideo.pause();
    }
  }, 280);
});

heroVideo.addEventListener('play', updateHeroVideoButton);
heroVideo.addEventListener('pause', updateHeroVideoButton);
updateHeroVideoButton();

// ========================
// ДАНІ ВЕСІЛЬ
// ========================
const weddings = {
  'wedding1': {
    names: 'Anna & Sergiy',
    location: 'Lviv, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding1/film.mp4', duration: '00:00' },
    ]
  },
  'wedding2': {
    names: 'Maria & Ivan',
    location: 'Kyiv, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding2/film.mp4', duration: '00:00' },
    ]
  },
  'wedding3': {
    names: 'Olena & Dmytro',
    location: 'Odesa, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding3/film.mp4', duration: '00:00' },
    ]
  },
  'wedding4': {
    names: 'Юрій та Тетяна',
    location: 'Жовква, Акварель',
    videos: [
      { type: 'Фільм', src: 'videos/wedding4/film.mp4', duration: '00:00' },
      { type: 'Кліп',  src: 'videos/wedding4/clip.mp4', duration: '00:00' },
      { type: 'СДЄ',   src: 'videos/wedding4/sde.mp4',  duration: '00:00' },
    ]
  },
  'wedding5': {
    names: 'Natalia & Yuriy',
    location: 'Kharkiv, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding5/film.mp4', duration: '00:00' },
    ]
  },
  'wedding6': {
    names: 'Iryna & Bohdan',
    location: 'Vinnytsia, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding6/film.mp4', duration: '00:00' },
    ]
  },
  'wedding7': {
    names: 'Daryna & Oleksiy',
    location: 'Poltava, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding7/film.mp4', duration: '00:00' },
    ]
  },
  'wedding8': {
    names: 'Viktoria & Artem',
    location: 'Dnipro, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding8/film.mp4', duration: '00:00' },
    ]
  },
  'wedding9': {
    names: 'Larysa & Vasyl',
    location: 'Uzhhorod, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding9/film.mp4', duration: '00:00' },
    ]
  },
  'wedding10': {
    names: 'Oksana & Mykola',
    location: 'Chernivtsi, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding10/film.mp4', duration: '00:00' },
    ]
  },
  'wedding11': {
    names: 'Alina & Roman',
    location: 'Zaporizhzhia, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding11/film.mp4', duration: '00:00' },
    ]
  },
  'wedding12': {
    names: 'Yulia & Andriy',
    location: 'Ivano-Frankivsk',
    videos: [
      { type: 'Фільм', src: 'videos/wedding12/film.mp4', duration: '00:00' },
    ]
  },
  'wedding13': {
    names: 'Khrystyna & Pavlo',
    location: 'Ternopil, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding13/film.mp4', duration: '00:00' },
    ]
  },
  'wedding14': {
    names: 'Halyna & Serhiy',
    location: 'Rivne, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding14/film.mp4', duration: '00:00' },
    ]
  },
  'wedding15': {
    names: 'Tetiana & Oleh',
    location: 'Sumy, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding15/film.mp4', duration: '00:00' },
    ]
  },
  'wedding16': {
    names: 'Maryna & Taras',
    location: 'Lutsk, Ukraine',
    videos: [
      { type: 'Фільм', src: 'videos/wedding16/film.mp4', duration: '00:00' },
    ]
  },
};

// ========================
// VIDEO OVERLAY
// ========================
const overlay = document.getElementById('overlay');
const overlayVideo = document.getElementById('overlayVideo');
const overlayClose = document.getElementById('overlayClose');
const overlayNames = document.getElementById('overlayNames');
const overlayLocation = document.getElementById('overlayLocation');
const playlistTitle = document.getElementById('playlistTitle');
const playlistItems = document.getElementById('playlistItems');

function formatVideoDuration(duration) {
  if (!Number.isFinite(duration)) return '00:00';

  const totalSeconds = Math.floor(duration);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function openOverlay(weddingId, videoIndex = 0) {
  const wedding = weddings[weddingId];
  if (!wedding) return;

  overlayNames.textContent = wedding.names;
  overlayLocation.textContent = wedding.location;
  playlistTitle.textContent = wedding.names;

  playlistItems.innerHTML = '';
  wedding.videos.forEach((video, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item' + (index === videoIndex ? ' active' : '');
    item.innerHTML = `
      <div class="playlist-thumb">
        <video src="${video.src}" muted preload="metadata"></video>
      </div>
      <div class="playlist-item-info">
        <span class="playlist-item-type">${video.type}</span>
        <span class="playlist-item-duration">00:00</span>
      </div>
    `;

    const playlistVideo = item.querySelector('video');
    const durationElement = item.querySelector('.playlist-item-duration');

    playlistVideo.addEventListener('loadedmetadata', () => {
      durationElement.textContent = formatVideoDuration(playlistVideo.duration);
    });

    item.addEventListener('click', () => {
      switchVideo(weddingId, index);
    });
    playlistItems.appendChild(item);
  });

  switchVideo(weddingId, videoIndex);
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function switchVideo(weddingId, index) {
  const wedding = weddings[weddingId];
  const video = wedding.videos[index];

  document.querySelectorAll('.playlist-item').forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  overlayVideo.style.opacity = '0';
  overlayVideo.style.transition = 'opacity 300ms ease-out';

  setTimeout(() => {
    overlayVideo.src = video.src;
    overlayVideo.load();
    overlayVideo.play().catch(() => {});
    overlayVideo.style.opacity = '1';
  }, 300);
}

function closeOverlay() {
  overlay.classList.remove('active');
  overlayVideo.pause();
  overlayVideo.src = '';
  document.body.style.overflow = '';
}

// Клік на картку галереї
document.querySelectorAll('.card').forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;

  card.addEventListener('mouseenter', () => {
    video.play().catch(() => {});
  });

  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
  });

  card.addEventListener('click', () => {
    const weddingId = card.dataset.wedding;
    if (!weddingId) return;
    openOverlay(weddingId);
  });
});

// Закриття
overlayClose.addEventListener('click', closeOverlay);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeOverlay();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOverlay();
});

// ========================
// ПЛАВНА ПОЯВА КАРТОК
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `opacity 500ms ease-out ${index * 60}ms, transform 500ms ease-out ${index * 60}ms`;
  observer.observe(card);
});
