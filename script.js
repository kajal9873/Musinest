console.log("Welcome to Musinest");

let songIndex = 0;
let audioElement = new Audio('songs/Lover.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Lover", filepath: "songs/Lover.mp3", coverPath: "images/lover.jpeg"},
    {songName: "Do You Know", filepath: "songs/Do You Know.mp3", coverPath: "images/Do you know.jpg"},
    {songName: "Desh Mere", filepath: "songs/Desh Mere - Bhuj The Pride Of India 128 Kbps.mp3", coverPath: "images/Desh Mere.jpg"},
    {songName: "Chak De India", filepath: "songs/Chak De India - Chak De! India 128 Kbps.mp3", coverPath: "images/Chak de india.jpg"},
    {songName: "Zinda", filepath: "songs/Zinda - Bhaag Milkha Bhaag 128 Kbps.mp3", coverPath: "images/Zinda.jpg"},
    {songName: "Chak Lein De", filepath: "songs/Chak Lein De - Chandni Chowk To China 128 Kbps.mp3", coverPath: "images/Chak lein de.jpg"},
    {songName: "Besabriyaan", filepath: "songs/Besabriyaan - M.S. Dhoni - The Untold Story 128 Kbps.mp3", coverPath: "images/Besabriyaan.jpg"},
    {songName: "Kesariya", filepath: "songs/Kesariya (PenduJatt.Com.Se).mp3", coverPath: "images/kesariya.jpg"}
];

// Load cover images and names
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/Pause main button
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Progress Bar Update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Play clicked song
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    audioElement.play();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filepath;
    audioElement.play();
});

document.getElementById('masterSongName').innerText = songs[songIndex].songName;

