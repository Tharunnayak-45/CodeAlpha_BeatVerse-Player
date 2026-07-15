const tracks = [
    {
        title: "Baguntundi",
        artist: "Sid Sriram, Nutana Mohan",
        src: "songs/Baguntundi.mp3",
        art: "images/Baguntundi.jpg"
    },
    {
        title: "Chikiri Chikiri",
        artist: "Mohit Chauhan",
        src: "songs/Chikiri Chikiri.mp3",
        art: "images/Chikiri.jpg"
    },
    {
        title: "Nijanga Nenena",
        artist: "Karthik",
        src: "songs/Nijanga Nenena.mp3",
        art: "images/Nijanga Nenena.jpg"
    },

    {
        title: "Humsafar",
        artist: "Sachet-Parampara",
        src: "songs/Humsafar.mp3",
        art: "images/Saiyaara.jpg"
    },
    {
        title: "Kitni Gardi Hai",
        artist: "Arjun Iyer, Christina Andrew",
        src: "songs/Kitni Gardi Hai.mp3",
        art: "images/Kitni Gardi Hai.jpg"
    },
    {
        title: "Oosupodu",
        artist: "Hemachandra Vedala",
        src: "songs/Oosupodu.mp3",
        art: "images/Fidaa.jpg"
    },
    {
        title: "Paradise Theme",
        artist: "Jangi Reddy, Arjun Chandi",
        src: "songs/Paradise-Theme.mp3",
        art: "images/Paradise.jpg"
    },
    {
        title: "Raga of Revenge",
        artist: "Anirudh Ravichander",
        src: "songs/Raga of Revenge.mp3",
        art: "images/rage.jpg"
    },
    {
        title: "Manasara",
        artist: "Geetha Madhuri",
        src: "songs/Manasara.mp3",
        art: "images/Manasara.jpg"
    },

    {
        title: "Rai Rai Raa Raa",
        artist: "Mohit Chauhan",
        src: "songs/Rai Rai Raa Raa.mp3",
        art: "images/Rai Rai Rara.jpg"
    },
    {
        title: "Saree",
        artist: "Mohit Chauhan",
        src: "songs/Saree.mp3",
        art: "images/Saree.jpg"
    },
    {
        title: "Bekhayali",
        artist: "Sachet Tandon",
        src: "songs/Bekhayali.mp3",
        art: "images/Bekhayali.jpg"
    },
    {
        title: "Pranam Pothunna",
        artist: "Hariharan",
        src: "songs/Pranam Pothunna.mp3",
        art: "images/Love Today.jpg"
    },
    {
        title: "Yemunnave Pilla",
        artist: "Peddapalli Rohith",
        src: "songs/Yemunnave Pilla.mp3",
        art: "images/Yemunnave Pilla.jpg"
    },
    {
        title: "Rubaroo",
        artist: "Bheems Cicerolio, Chinmayi Sripada",
        src: "songs/Rubaroo.mp3",
        art: "images/Dacoit.jpg"
    },
    {
        title: "Massa Massa",
        artist: "Sirivennela Seetharama Sastry",
        src: "songs/Massa Massa.mp3",
        art: "images/Chikiri.jpg"
    },
    {
        title: "Gira Gira",
        artist: "Mohit Chauhan",
        src: "songs/Gira Gira.mp3",
        art: "images/Gira Gira.jpg"
    },
    {
        title: "Emo Emo",
        artist: "Peddapalli Rohith",
        src: "songs/Emo Emo.mp3",
        art: "images/Emo Emo.jpg"
    },
    {
        title: "Inkem Inkem",
        artist: "Sid Sriram",
        src: "songs/Inkem Inkem.mp3",
        art: "images/Inkem Inkem.jpg"
    },
    {
        title: "Gehra Hua",
        artist: "Arjith Singh",
        src: "songs/Gehra Hua.mp3",
        art: "images/Gehra.jpg"
    },
    {
        title: "Apudo Ipudo",
        artist: "Siddarth",
        src: "songs/Apudo Ipudo.mp3",
        art: "images/Bomma.jpg"
    },
    {
        title: "Ammayi Ammayi",
        artist: "Anantha Sriram, Raghava Chaityana",
        src: "songs/Ammayi Ammayi.mp3",
        art: "images/Ammayi.jpg"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = -1;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let liked = new Set();
    let showLikedOnly = false;

    // ---------- Liked songs persistence ----------
    function loadLikedFromStorage() {
        try {
            const saved = JSON.parse(localStorage.getItem('likedTracks') || '[]');
            if (Array.isArray(saved)) {
                saved
                    .filter(index => Number.isInteger(index) && index >= 0 && index < tracks.length)
                    .forEach(index => liked.add(index));
            }
        } catch (err) {
            // ignore corrupt storage
        }
    }

    function saveLikedToStorage() {
        localStorage.setItem('likedTracks', JSON.stringify([...liked]));
    }

    loadLikedFromStorage();

    // ---------- DOM refs ----------
    const audio = document.getElementById('audioPlayer') || document.querySelector('audio');
    const playlistEl = document.getElementById('playlist');
    const queueListEl = document.getElementById('queueList');

    const trackTitle = document.getElementById('trackTitle');
    const trackArtist = document.getElementById('trackArtist');
    const albumArt = document.getElementById('albumArt');
    const bottomTitle = document.getElementById('bottomTitle');
    const bottomArtist = document.getElementById('bottomArtist');
    const bottomArt = document.getElementById('bottomArt');
    const playerPanel = document.getElementById('playerPanel');

    const playBtn = document.getElementById('playBtn');
    const bottomPlay = document.getElementById('bottomPlay');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const bPrevBtn = document.getElementById('bPrevBtn');
    const bNextBtn = document.getElementById('bNextBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const bShuffleBtn = document.getElementById('bShuffleBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const bRepeatBtn = document.getElementById('bRepeatBtn');

    const seekTrack = document.getElementById('seekTrack');
    const seekFill = document.getElementById('seekFill');
    const seekDot = document.getElementById('seekDot');
    const bSeekTrack = document.getElementById('bSeekTrack');
    const bSeekFill = document.getElementById('bSeekFill');
    const bSeekDot = document.getElementById('bSeekDot');
    const currentTimeEl = document.getElementById('currentTime');
    const durationTimeEl = document.getElementById('durationTime');
    const bCurrentTimeEl = document.getElementById('bCurrentTime');
    const bDurationTimeEl = document.getElementById('bDurationTime');
    const ringProgress = document.getElementById('ringProgress');

    const volumeTrack = document.getElementById('volumeTrack');
    const volumeFill = document.getElementById('volumeFill');
    const volumeDot = document.getElementById('volumeDot');

    const heartBtn = document.getElementById('heartBtn');
    const bottomHeart = document.getElementById('bottomHeart');
    const searchInput = document.getElementById('searchInput');
    const themeToggle = document.getElementById('themeToggle');

    const equalizer = document.getElementById('equalizer');
    const albumContainer = document.querySelector('.album-art');

    if (!audio) {
        console.error('Audio player element not found.');
        return;
    }
    if (!playlistEl) {
        console.error('Playlist element (#playlist) not found.');
        return;
    }

    // ---------- Equalizer bars ----------
    const barCount = 50;
    const bars = [];
    if (equalizer) {
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'eq-bar';
            equalizer.appendChild(bar);
            bars.push(bar);
        }
    }

    // ---------- Theme ----------
    let currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') document.body.classList.add('light-theme');

    function applyThemeUI() {
        if (!themeToggle) return;
        const spans = themeToggle.querySelectorAll('span');
        spans.forEach(s => s.classList.remove('active-theme'));
        if (currentTheme === 'light' && spans[0]) spans[0].classList.add('active-theme');
        if (currentTheme === 'dark' && spans[1]) spans[1].classList.add('active-theme');
    }
    applyThemeUI();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.classList.toggle('light-theme', currentTheme === 'light');
            localStorage.setItem('theme', currentTheme);
            applyThemeUI();
        });
    }

    // ---------- Heart / like state ----------
    function updateHeart() {
        const isLiked = liked.has(currentIndex);
        if (heartBtn) {
            heartBtn.textContent = isLiked ? '♥' : '♡';
            heartBtn.classList.toggle('liked', isLiked);
        }
        if (bottomHeart) {
            bottomHeart.textContent = isLiked ? '♥' : '♡';
            bottomHeart.classList.toggle('liked', isLiked);
        }
    }

    function toggleHeart() {
        if (currentIndex === -1) return;

        if (liked.has(currentIndex)) {
            liked.delete(currentIndex);
        } else {
            liked.add(currentIndex);
        }

        saveLikedToStorage();
        updateHeart();

        // Refresh whichever view is currently on screen so the change
        // shows up immediately, whether we're looking at "All Songs"
        // or "Liked Songs".
        renderPlaylist(searchInput ? searchInput.value : '', showLikedOnly);
    }

    const RING_CIRCUMFERENCE = 1106;

    audio.volume = 0.7;
    audio.muted = false;
    audio.preload = 'auto';

    // ---------- Dynamic background glow from album art ----------
    function applyAlbumGlow(imgSrc) {
        if (!playerPanel) return;
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = 40;
                canvas.height = 40;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, 40, 40);
                const data = ctx.getImageData(0, 0, 40, 40).data;
                let r = 0, g = 0, b = 0, count = 0;
                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                    count++;
                }
                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);
                playerPanel.style.setProperty('--glow-1', `rgba(${r}, ${g}, ${b}, 0.45)`);
                playerPanel.style.setProperty('--glow-2', `rgba(${Math.min(r + 40, 255)}, ${Math.max(g - 30, 0)}, ${Math.min(b + 60, 255)}, 0.3)`);
            } catch (err) {
                console.warn('Could not extract album color (falling back to default glow):', err);
            }
        };
        img.onerror = () => {
            // Missing/broken image file — just keep the default glow.
        };
        img.src = imgSrc;
    }

    // ---------- SINGLE SOURCE OF TRUTH for rendering song lists ----------
    // Renders BOTH the main playlist/library view (#playlist) and the
    // "Up Next" queue (#queueList). Handles filtering by search text
    // and by "liked only" mode. This replaces the old duplicate
    // renderLikedSongs() function so there's only one place that can
    // go out of sync.
    function renderPlaylist(filter = '', likedOnly = false) {
        playlistEl.innerHTML = '';
        if (queueListEl) queueListEl.innerHTML = '';

        const q = filter.trim().toLowerCase();

        const visibleTracks = tracks
            .map((track, i) => ({ track, i }))
            .filter(({ track, i }) => {
                if (likedOnly && !liked.has(i)) return false;
                if (q && !track.title.toLowerCase().includes(q) && !track.artist.toLowerCase().includes(q)) return false;
                return true;
            });

        if (!visibleTracks.length) {
            const message = likedOnly ? 'No liked songs yet.' : 'No tracks match your search.';
            const emptyEl = document.createElement('div');
            emptyEl.className = 'empty-message';
            emptyEl.textContent = message;
            playlistEl.appendChild(emptyEl);
            return;
        }

        visibleTracks.forEach(({ track, i }) => {
            const item = document.createElement('div');
            item.className = 'playlist-item' + (i === currentIndex ? ' playing' : '');
            item.innerHTML = `
            <img class="playlist-thumb" src="${track.art}" alt="">
            <div class="playlist-info">
                <div class="name">${track.title}</div>
                <div class="count">${track.artist}</div>
            </div>
            <button class="item-heart" data-index="${i}">${liked.has(i) ? '♥' : '♡'}</button>
        `;
            item.addEventListener('click', (e) => {
                if (e.target && e.target.classList && e.target.classList.contains('item-heart')) return;
                loadTrack(i, true);
            });
            const heartBtnItem = item.querySelector('.item-heart');
            heartBtnItem.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const idx = Number(ev.currentTarget.getAttribute('data-index'));
                if (liked.has(idx)) liked.delete(idx); else liked.add(idx);
                saveLikedToStorage();
                if (idx === currentIndex) updateHeart();
                renderPlaylist(filter, likedOnly);
            });
            playlistEl.appendChild(item);

            if (queueListEl) {
                const qItem = document.createElement('div');
                qItem.className = 'queue-item' + (i === currentIndex ? ' playing' : '');
                qItem.innerHTML = `
      <img class="queue-thumb" src="${track.art}" alt="">
      <div class="qname">${track.title}</div>
    `;
                qItem.addEventListener('click', () => loadTrack(i, true));
                queueListEl.appendChild(qItem);
            }
        });
    }

    function getVisibleTrackIndices(filter = '', likedOnly = false) {
        const q = filter.trim().toLowerCase();
        return tracks
            .map((track, i) => i)
            .filter(i => {
                const item = tracks[i];
                if (likedOnly && !liked.has(i)) return false;
                if (q && !item.title.toLowerCase().includes(q) && !item.artist.toLowerCase().includes(q)) return false;
                return true;
            });
    }

    function loadTrack(index, autoplay) {
        currentIndex = index;
        const track = tracks[index];
        try {
            audio.src = new URL(track.src, window.location.href).href;
        } catch (err) {
            audio.src = encodeURI(track.src);
        }
        audio.load();
        if (trackTitle) trackTitle.textContent = track.title;
        if (trackArtist) trackArtist.textContent = track.artist;
        if (albumArt) albumArt.src = track.art;
        if (bottomTitle) bottomTitle.textContent = track.title;
        if (bottomArtist) bottomArtist.textContent = track.artist;
        if (bottomArt) bottomArt.src = track.art;

        applyAlbumGlow(track.art);
        updateHeart();
        renderPlaylist(searchInput ? searchInput.value : '', showLikedOnly);

        if (autoplay) {
            audio.play().catch(() => {
                isPlaying = false;
                updatePlayIcons();
            });
        }
    }

    function updatePlayIcons() {
        const icon = isPlaying ? '⏸' : '▶';
        if (playBtn) playBtn.textContent = icon;
        if (bottomPlay) bottomPlay.textContent = icon;
    }

    function togglePlay() {
        if (currentIndex === -1) {
            loadTrack(0, true);
            return;
        }
        if (audio.paused) {
            audio.play().catch(() => { });
        } else {
            audio.pause();
        }
    }

    function playNext() {
        if (tracks.length === 0) return;

        const visibleIndices = getVisibleTrackIndices(searchInput ? searchInput.value : '', showLikedOnly);
        if (!visibleIndices.length) return;

        if (isShuffle) {
            let nextIndex = currentIndex;
            if (visibleIndices.length === 1) {
                nextIndex = visibleIndices[0];
            } else {
                do {
                    nextIndex = visibleIndices[Math.floor(Math.random() * visibleIndices.length)];
                } while (nextIndex === currentIndex);
            }
            loadTrack(nextIndex, true);
            return;
        }

        const currentPos = visibleIndices.indexOf(currentIndex);
        const nextPos = currentPos === -1 ? 0 : (currentPos + 1) % visibleIndices.length;
        loadTrack(visibleIndices[nextPos], true);
    }

    function playPrev() {
        if (tracks.length === 0) return;

        const visibleIndices = getVisibleTrackIndices(searchInput ? searchInput.value : '', showLikedOnly);
        if (!visibleIndices.length) return;

        const currentPos = visibleIndices.indexOf(currentIndex);
        const prevPos = currentPos === -1 ? visibleIndices.length - 1 : (currentPos - 1 + visibleIndices.length) % visibleIndices.length;
        loadTrack(visibleIndices[prevPos], true);
    }

    function formatTime(sec) {
        if (isNaN(sec)) return '00:00';
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function updateSeek() {
        const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        if (seekFill) seekFill.style.width = pct + '%';
        if (seekDot) seekDot.style.left = pct + '%';
        if (bSeekFill) bSeekFill.style.width = pct + '%';
        if (bSeekDot) bSeekDot.style.left = pct + '%';
        if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
        if (bCurrentTimeEl) bCurrentTimeEl.textContent = formatTime(audio.currentTime);
        if (durationTimeEl) durationTimeEl.textContent = formatTime(audio.duration);
        if (bDurationTimeEl) bDurationTimeEl.textContent = formatTime(audio.duration);

        if (ringProgress) {
            const offset = RING_CIRCUMFERENCE - (pct / 100) * RING_CIRCUMFERENCE;
            ringProgress.style.strokeDashoffset = offset;
        }
    }

    function seekTo(clientX, trackEl) {
        const rect = trackEl.getBoundingClientRect();
        const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
        if (audio.duration) {
            audio.currentTime = pct * audio.duration;
        }
    }

    function animateBars() {
        bars.forEach(bar => {
            const h = isPlaying ? Math.floor(Math.random() * 50) + 6 : 6;
            bar.style.height = h + 'px';
        });
    }

    // ---------- Event listeners ----------
    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (bottomPlay) bottomPlay.addEventListener('click', togglePlay);
    if (nextBtn) nextBtn.addEventListener('click', playNext);
    if (bNextBtn) bNextBtn.addEventListener('click', playNext);
    if (prevBtn) prevBtn.addEventListener('click', playPrev);
    if (bPrevBtn) bPrevBtn.addEventListener('click', playPrev);

    if (shuffleBtn) shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
        if (bShuffleBtn) bShuffleBtn.classList.toggle('active', isShuffle);
    });
    if (bShuffleBtn) bShuffleBtn.addEventListener('click', () => shuffleBtn && shuffleBtn.click());

    if (repeatBtn) repeatBtn.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
        if (bRepeatBtn) bRepeatBtn.classList.toggle('active', isRepeat);
    });
    if (bRepeatBtn) bRepeatBtn.addEventListener('click', () => repeatBtn && repeatBtn.click());

    if (seekTrack) seekTrack.addEventListener('click', (e) => seekTo(e.clientX, seekTrack));
    if (bSeekTrack) bSeekTrack.addEventListener('click', (e) => seekTo(e.clientX, bSeekTrack));

    if (volumeTrack) volumeTrack.addEventListener('click', (e) => {
        const rect = volumeTrack.getBoundingClientRect();
        const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        audio.volume = pct;
        if (volumeFill) volumeFill.style.width = (pct * 100) + '%';
        if (volumeDot) volumeDot.style.left = (pct * 100) + '%';
    });

    if (heartBtn) heartBtn.addEventListener('click', toggleHeart);
    if (bottomHeart) bottomHeart.addEventListener('click', toggleHeart);

    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayIcons();
        if (albumContainer) albumContainer.classList.add('playing');
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayIcons();
        if (albumContainer) albumContainer.classList.remove('playing');
    });

    audio.addEventListener('timeupdate', updateSeek);
    audio.addEventListener('loadedmetadata', updateSeek);

    audio.addEventListener('ended', () => {
        if (albumContainer) albumContainer.classList.remove('playing');
        if (isRepeat) {
            audio.currentTime = 0;
            audio.play().catch(() => { });
        } else {
            playNext();
        }
    });

    if (searchInput) searchInput.addEventListener('input', (e) => renderPlaylist(e.target.value, showLikedOnly));

    setInterval(animateBars, 200);

    // ---------- Nav buttons ----------
    // NOTE: your HTML uses id="likedNav" (not "likedSongsBtn") for the
    // "❤ Liked Songs" nav item, and there is no separate "all songs"
    // button — the Home nav item doubles as the "show everything" view.
    const likedNavBtn = document.getElementById("likedNav");
    const homeBtn = document.getElementById("homeBtn");

    function clearActiveNav(activeEl) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        if (activeEl) activeEl.classList.add('active');
    }

    if (likedNavBtn) {
        likedNavBtn.addEventListener('click', () => {
            showLikedOnly = true;
            document.body.classList.add('liked-page');
            if (searchInput) searchInput.value = '';
            clearActiveNav(likedNavBtn);
            renderPlaylist('', true);
        });
    }

    if (homeBtn) {
        homeBtn.addEventListener("click", () => {
            showLikedOnly = false;
            document.body.classList.remove("liked-page");
            if (searchInput) searchInput.value = "";
            clearActiveNav(homeBtn);
            renderPlaylist("", false);
            if (playlistEl) playlistEl.scrollTop = 0;
        });
    }

    // ---------- Initial render ----------
    renderPlaylist();
    if (volumeFill) volumeFill.style.width = '70%';
    if (volumeDot) volumeDot.style.left = '70%';
});