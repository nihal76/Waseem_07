document.addEventListener('DOMContentLoaded', function() {
    let playAgain = document.getElementsByClassName('nav')[0];
    let para;
    let box = false;  // Track whether the popup is shown or hidden
    let secondPage = document.getElementById('favPlaylist');

    if (playAgain) {
        playAgain.addEventListener('click', function(event) {
            if (!box) {
                // Create and display the popup menu
                para = document.createElement('div');
                para.setAttribute('id', 'menu');
                para.innerHTML = `
                    <p id="restart">Restart</p>
                    <br>
                    <p id="favourites">Favourites</p>
                `;
                para.style.cssText = 'background-color:#cba0a0; color:black; font-weight:bold; cursor:pointer; padding:1.2em;';
                box = true;
                document.getElementsByClassName('songs')[0].insertAdjacentElement('afterbegin', para);

                // Add event listener to the "favourites" icon
                let favIcon = document.getElementsByClassName('fav')[0];
                favIcon.addEventListener('click', function() {
                    let curSong = {
                        song: songs[songIndex].song,
                        artist: songs[songIndex].artist
                    };

                    let curSong_local = JSON.stringify(curSong);
                    localStorage.setItem("songInfo", curSong_local);

                    let info = JSON.parse(localStorage.getItem('songInfo'));
                    let div = document.createElement('div');
                    div.innerHTML = `<p>${info.song}</p><br><p>${info.artist}</p>`;
                    div.style.cssText = 'background-color:lightgrey;padding:1em;margin:1em 2em;';
                    div.children[0].style.cssText = 'color:darkred; font-weight:bold;font-size:large;';
                    div.children[2].style.cssText = 'font-size:small;';
                    secondPage.insertAdjacentElement('afterbegin', div);
                });

                // Add event listener to the popup menu
                para.addEventListener('click', function(event) {
                    if (event.target.innerText == 'Restart') {
                        let userChoice = confirm("Would you like to play again?");
                        if (userChoice) {
                            box = false;
                            document.getElementsByClassName('songs')[0].removeChild(para);

                            let firstSong = songs[0];

                            let songName = document.getElementsByTagName('h2')[0];
                            songName.innerText = firstSong.song;

                            let artist = document.querySelector('h4');
                            artist.innerText = firstSong.artist;

                            let image = document.querySelector('img');
                            image.setAttribute("src", firstSong.image);

                            let audio = document.getElementById('audio');
                            audio.setAttribute("src", firstSong.audio);
                            audio.autoplay = true;
                        } else {
                            document.getElementsByClassName('songs')[0].removeChild(para);
                            box = false;
                        }
                    } else if (event.target.innerText === 'Favourites') {
                        box = false;
                        document.getElementsByClassName('songs')[0].removeChild(para);
                        window.location.href = 'favourites.html';
                    }
                });
            } else {
                // Hide the popup if it is already visible
                document.getElementsByClassName('songs')[0].removeChild(para);
                box = false;
            }
        });
    } else {
        console.error('playAgain element not found');
    }
});
