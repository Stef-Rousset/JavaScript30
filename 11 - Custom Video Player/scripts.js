// deal with play and pause video
  // get the main element
  const player = document.querySelector('.player');
  // on selectionne ds player
  const video = player.querySelector('.viewer');
  const buttonPlayer = player.querySelector('.toggle');
  // build the function
  function togglePlay() {
    if (video.paused){        // propriete .paused boolean
      video.play();          // propriete .play lanc la video
      buttonPlayer.textContent = '►' // .textContent equivaut à innerText
    }
    else {
      video.pause();
      buttonPlayer.textContent = '❚ ❚'
    }
  };
  // set the event listener
  video.addEventListener('click', togglePlay);  // quand on clique sur l'image
  buttonPlayer.addEventListener('click', togglePlay); // quand on clique sur le bouton

// deal with the skip buttons
  // on selectionne ds player
  const skipButtons = player.querySelectorAll('[data-skip]');
  // build the function
  function skip() {
    console.log(this.dataset.skip); // avec this.dataset, on trouve un hash avec un cle skip dont la valeur est "25" ou "-10"
    video.currentTime += parseFloat(this.dataset.skip); // propriete .currentTime de l'element video donne en secondes
                                                        // le moment de lecture, si on lui donne une autre valeur ça update
                                                        // le moment de lecture
  };
  // set the event listener
  skipButtons.forEach(button => button.addEventListener ('click', skip));

// deal with the range buttons
  // on selectionne ds player
  const rangesButtons = player.querySelectorAll('.player__slider');
  // build the function
  function rangeUpdate(){
    // console.log(this.value);
    // console.log(this.name);
    video[this.name] = this.value;  // que le name soit volume ou playbackRate
  };
  // set the event listener
  rangesButtons.forEach(range => range.addEventListener ('change', rangeUpdate));

// deal with the progress bar filling
  // on selectionne ds player
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  // build the function
  function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100; // propriété duration donne la durée en sec de la video
  progressBar.style.flexBasis = `${percent}%`; // la class progress_filled a un attribut de style flex-basis dont le
                                              // pourcentage varie en fonction de la progression de la video
}
  // set the event listener
  video.addEventListener('timeupdate', handleProgress);
// deal with the progress bar picking and filling until the new value
  // build the function
  function scrub(e) {
    // on trouve un element offsetX qui donne la valuer en px de l'endoir ou on a clique
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // propriete .offsetWidth renvoit la
                                                                              // largeur totale d'un element (lecture seule)
    video.currentTime = scrubTime;
  };
  // set the event listener
  progress.addEventListener('click', scrub);
  let mousedown = false;
  progress.addEventListener('mousemove', () => {
    if (mousedown) {
      scrub();
    }
  });
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
