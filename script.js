const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist')
currentTimeEl = document.getElementById('current-time')
durationEl = document.getElementById('duration')
progress = document.getElementById('progress')
playerProgress = document.getElementById('player-progress')
prevBtn = document.getElementById('prev')
nextBtn = document.getElementById('next')
playBtn = document.getElementById('play')
background = document.getElementById('bg-img')


const music = new Audio()

const songs = [
    {
        path: 'assets/Lil Durk - All My Life ft. J. Cole.mp3',
        displayName: 'All My Life',
        cover: 'assets/All My Life.jpg',
        artist: 'Lil Durk ft. J.Cole',
    },
    {
        path: 'assets/Central Cee x Dave - Sprinter.mp3',
        displayName: 'Sprinter',
        cover: 'assets/Sprinter.jpg',
        artist: 'Central Cee ft. Dave',
    },
    {
        path: 'assets/Russ - 3-15.mp3',
        displayName: '3:15',
        cover: 'assets/Russ.jpg',
        artist: 'Russ',
    },
];

let musicIndex = 0;
let isPlaying = false;

function toggePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    // Change the play button
    playBtn.classList.replace('bx-play', 'bx-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    // Change the pause button
    playBtn.classList.replace('bx-pause', 'bx-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', toggePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
