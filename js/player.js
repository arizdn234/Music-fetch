function toggleAudio(id, btn) {
    const audioElement = document.getElementById(id);

    
    if (audioElement.paused) {
        const allAudioElements = document.querySelectorAll('audio');
        allAudioElements.forEach((element) => {
            if (element.id !== id) {
                element.pause();
            }
        });
        document.getElementById(btn).innerHTML = '<i class="fa-solid fa-pause"></i>'
        audioElement.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
    } else {
      audioElement.pause();
      document.getElementById(btn).innerHTML = '<i class="fa-solid fa-play"></i>'
    }
  }
  