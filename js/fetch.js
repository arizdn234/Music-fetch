// Fetch raw git
const urlEmbed = 'https://raw.githubusercontent.com/arizdn234/datasets/main/org-3-temporary/music.json'
fetch(urlEmbed)
	.then(res => res.text())
	.then((out) => {
		document.getElementById("show-json-from-git").innerText = out
	})
	.catch((err) => {
		msgPopup(err)
		throw err 
	});

// JSON fetch music.json
const url = 'http://localhost:3000/songs';

// GET All Method
fetch(url)
	.then(response => response.json())
	.then(data => {
		// document.getElementById('artwork-image').src = data.artwork
				
		for (let i = 0; i < data.length; i++) {
			// console.log(data[i].title);
			const format = `
				<div class="card">
					<img src="${data[i].artwork}" id="${data[i].id}ss"/>
					<h2>${data[i].title}</h2>
					<p>${data[i].artist}</p>
                    <audio id="${data[i].id}">
                        <source src="${data[i].url}" type="audio/mpeg">
                    </audio>
					<button class="detail-button">
						<span onclick="detailData(${data[i].id})" title="Lihat detail"><i class="fa-solid fa-eye"></i></span>
						<span onclick="editData(${data[i].id})" title="Edit data"><i class="fa-solid fa-pencil"></i></span>
						<span onclick="deleteData(${data[i].id})" title="Hapus data"><i class="fa-solid fa-trash"></i></span>
					</button>
					<button class="play-button" id="${data[i].id}${data[i].title[0]}" onclick="toggleAudio(${data[i].id}, '${data[i].id}${data[i].title[0]}')">
						<i class="fa-solid fa-play"></i>
					</button>
				</div>
			`
			const div = document.createElement('div');
			div.classList.add('swiper-slide')
			div.innerHTML = format;
			// console.log(div);
			
			document.querySelector('.swiper-wrapper').appendChild(div);
		}
	})
	.catch((error) => {
		const msg = `Gagal melakukan permintaan GET: ${error} </br></br>Apakah server sudah jalan bang?`
		console.error(msg);
		msgPopup(msg)
	})

// GET by ID Method (trigger on Modal)
async function fetchById(id) {
	try {
		const response = await fetch(`http://localhost:3000/songs/${id}`)
		if (!response.ok) {
			throw new Error('Gagal untuk fetch data')
		}
		const data = await response.json();
    	return data;
	} catch (e) {
		const msg = `Gagal untuk fetch song by ID: ${e}`
		console.error(msg);
		msgPopup(msg)
    	throw e;
	}
}

// POST Method
async function createNew(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;
    const album = document.getElementById('album').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    const art = document.getElementById('artwork').files[0].name;
    const song = document.getElementById('song').files[0].name;
    const lyrics = document.getElementById('lyrics').value;

    const newId = Date.now();

    const jsonData = {
        id: newId,
        title: title,
        artist: artist,
        album: album,
        year: year,
        genre: genre,
		duration: duration,
        artwork: 'album-arts/' + art,
        url: 'music-data/' + song,
        lyrics: lyrics,
    };
	// console.log(jsonData);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error('Gagal mengirim data ke server.');
        }

		const msg = 'Data berhasil dikirim ke server'
        console.log(msg);
		msgPopup(msg)
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
	
}

// DELETE Method
async function deleteByID(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Gagal mengirim permintaan DELETE ke server.');
        }

        // Assuming the deletion was successful, you can update the UI or perform other actions as needed.
		const msg = `Data dengan ID ${id} telah dihapus`
        console.log(msg);
		msgPopup(msg)

        // Close the modal
        closeModal();
    } catch (error) {
		const msg = `Terjadi kesalahan saat menghapus data: ${error}`
        console.error(msg);
		msgPopup(msg)
    }
}