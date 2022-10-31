console.log('Welcome to Spotify');

let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =  document.getElementById('myProgressBar');
let gif =  document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs=[
    {songsName: "Mortals - Warriyo", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songsName: "Huma-Huma", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songsName: "Invincible - Deaf Kev", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songsName: "My Heart - Different Heaven & EH!DE ", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songsName: "Heroes Tonight - Janji", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songsName: "Throne - Bring me the horizon", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songsName: "Heroes(we could be) - Alesso", filepath:"songs/7.mp3", coverPath: "covers/7.jpg"},
    {songsName: "Sub Urban - Cradles", filePath:"songs/8.mp3", coverPath: "covers/8.jpg"},
]


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songsName;
})


//audioElement.play();
//handle play/pause click

masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
    
}
)


//listen to events
audioElement.addEventListener('timeupdate', () =>{
    

    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
   
    myProgressBar.value = progress;
}
)
myProgressBar.addEventListener('change', () =>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');



})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${index+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime= 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    } )
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})