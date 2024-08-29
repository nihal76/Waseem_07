window.songs = [
    {
        song: 'Enni Soni',
        artist : 'guru randhawa',
        image : 'Enni-Soni-From-Saaho--Hindi-2019-20190802024545-500x500.jpg',
        audio:'Enni Soni - Saaho 128 Kbps.mp3'
    },
    {
        song: 'Yaari No.1',
        artist : 'guru randhawa',
        image : 'Yaari-No-1-Yaari-Jam-Punjabi-2019-20220825171113-500x500.jpg',
        audio:"Yaari (No.1 Yaari Jam) - Vee, Guru Randhawa 128 Kbps.mp3"
    },
    {
        song: 'High rated Gabru',
        artist : 'guru randhawa',
        image : "High-Rated-Gabru-Punjabi-2017-500x500.jpg",
        audio:'High Rated Gabru - Nawabzaade 128 Kbps.mp3'
    },
    {
        song: 'Daaru wargi',
        artist : 'guru randhawa',
        image : 'maxresdefault.jpg',
        audio:"Daaru Wargi - Why Cheat India 128 Kbps.mp3"
    },   
    
]

window.songIndex = 0;
window.changeSong = 0;
window.audio = document.getElementsByTagName('audio')[0]
window.play = false;
window. loop = false;
window.pausePlay = document.getElementsByClassName('play')[0];  
window.loopSong = document.getElementsByClassName('loop')[0];
window.main = document.getElementsByTagName('main')[0];
window.nextIcon = document.getElementsByClassName('next')[0];
window.previousIcon = document.getElementsByClassName('previous')[0];
console.log('next'+nextIcon)
// keyboard events for pause/play
document.body.addEventListener('keydown',function(event){
    console.log(event.key)
    if(event.key == 'k' || event.key == ' ' || event.key == 'Enter'){
        if(play){
            play = false;
           audio.pause();
           }
           else{
               play = true;
               audio.play();
           }
    }
})

pausePlay.addEventListener('click',function(event){
    let audio = document.querySelector('#audio');
    if(!play){
     play = true;
     console.log( document.getElementsByClassName('start')[0])
    // document.getElementsByClassName('start')[0].innerHTML = ''
     console.log(pausePlay)
     pausePlay.setAttribute("class","fa-solid fa-pause fa-xl");
     pausePlay.style.cssText = 'position: relative;left: 3.4em; top:1em; color:red;'
    audio.play();
    }
    else{
        play = false;
        pausePlay.setAttribute("class","fa-solid fa-play fa-xl play");
        audio.pause();
    }
}) 
  
nextIcon.addEventListener('click',function(event){
    songIndex++;
  
  if(songIndex < songs.length){
    // fetch next song details
    let nextSong = songs[songIndex];

    // Update song title
    let songName = document.getElementsByTagName('h2')[0];
    songName.innerText = nextSong.song;

    // Update artist name
    let artist = document.querySelector('h4');
    artist.innerText = nextSong.artist;

    // Update image
    let image = document.querySelector('img');
    image.setAttribute("src", nextSong.image);
    // next song 
    let audio = document.getElementById('audio')
    audio.setAttribute("src", nextSong.audio);
    pausePlay.setAttribute("class","fa-solid fa-pause fa-xl");
     pausePlay.style.cssText = 'position: relative;left: 3.4em; top:1em; color:red;'
    audio.autoplay = true;
}
else if(songIndex >= songs.length){
    alert("No next song")
}
})

previousIcon.addEventListener('click',function(){
    // let currentAudio = document.getElementById('audio');
    // currentAudio.remove();
    songIndex--;
    if(songIndex >= 0){
//    update the previous song info
     let previousSong = songs[songIndex];
    //  song title
    let songName = document.getElementsByTagName('h2')[0];
    songName.innerText = previousSong.song;
    // artist name
    let artist = document.querySelector('h4');
    artist.innerText = previousSong.artist;
      // Update image
      let image = document.querySelector('img');
      image.setAttribute("src", previousSong.image);

    //   previous song 
      let audio = document.getElementById('audio')
    audio.setAttribute("src", previousSong.audio);
      pausePlay.setAttribute("class","fa-solid fa-pause fa-xl");
     pausePlay.style.cssText = 'position: relative;left: 3.4em; top:1em; color:red;'
    audio.autoplay = true;
    }
    else {
    alert("No previous song to display")
    }
})

// play song in loop
let loopElement = document.getElementsByClassName('loop')[0];
loopSong.addEventListener('click',function(){
    let audio = document.getElementsByTagName('audio')[0]
    // if a song is not playing in loop, set loop to true
    if(!loop){
    loop = true;
    audio.loop = true;
    loopElement.style.cssText = 'color:red;';
    // alert('loop on')
    }
    // if a song is already in loop , then set loop to false
    else{
        loop = false;
        audio.loop = false;
        loopElement.removeAttribute('style');
        // alert('loop off')
    }
})

// play next song automatically after the previous song has finished
// audio.duration 
// audio.currentTime in sec

audio.onended = function(){
    changeSong++;
    songIndex++;
    if(changeSong < songs.length){
        // get song info
        let songInfo = songs[songIndex];
        pausePlay.setAttribute("class","fa-solid fa-play fa-xl");
        let name = document.getElementsByTagName('h2')[0];
        name.innerText = songInfo.song
        let artist = document.getElementsByTagName('h4')[0];
        artist.innerText = songInfo.artist;
        let image = document.querySelector('img');
      image.setAttribute("src", songInfo.image);
      let audio = document.getElementById('audio')
    audio.setAttribute("src", songInfo.audio);
    audio.autoplay = true;
    }
    else{
        alert("No more songs in playlist")
    }
}



console.log(document.getElementsByClassName('nav')[0])