// __________________________Fetch raw git__________________________
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

// __________________________JSON fetch music.json__________________________
const url = 'http://localhost:3000/songs';

// fetch(url, { mode: 'cors' })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.songs[0]);
//   })
//   .catch(error => {
//     console.error(error);
//   });
// __________________________GET All Method__________________________
fetch(url)
	.then(response => response.json())
	.then(data => {
		// document.getElementById('artwork-image').src = data.songs.artwork
				
		for (let i = 0; i < data.songs.length; i++) {
			// console.log(data.songs[i].title);
			const format = `
				<div class="card">
					<img src="${data.songs[i].artwork}" id="${data.songs[i].id}ss"/>
					<h2>${data.songs[i].title}</h2>
					<p>${data.songs[i].artist}</p>
                    <audio id="${data.songs[i].id}">
                        <source src="${data.songs[i].url}" type="audio/mpeg">
                    </audio>
					<button class="detail-button">
						<span onclick="detailData(${data.songs[i].id})" title="Lihat detail"><i class="fa-solid fa-eye"></i></span>
						<span onclick="editData(${data.songs[i].id})" title="Edit data"><i class="fa-solid fa-pencil"></i></span>
						<span onclick="deleteData(${data.songs[i].id})" title="Hapus data"><i class="fa-solid fa-trash"></i></span>
					</button>
					<button class="play-button" id="${data.songs[i].id}${data.songs[i].title[0]}" onclick="toggleAudio(${data.songs[i].id}, '${data.songs[i].id}${data.songs[i].title[0]}')">
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

// __________________________GET by ID Method (trigger on Modal)__________________________
async function fetchById(id) {
	try {
		const response = await fetch(`${url}/${id}`)
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

// __________________________POST Method__________________________
function createNew(event) {
    event.preventDefault();

    // const title = document.getElementById('title').value;
    // const artist = document.getElementById('artist').value;
    // const album = document.getElementById('album').value;
    // const year = document.getElementById('year').value;
    // const genre = document.getElementById('genre').value;
    // const duration = document.getElementById('duration').value;
    // const art = document.getElementById('artwork').files[0];
    // const song = document.getElementById('song').files[0];
    // const lyrics = document.getElementById('lyrics').value;

    const newId = String(Date.now());
    // console.log(typeof newId);

    const formData = new FormData(document.getElementById('form-input'))
    formData.append('id', newId)
    // formData.append('title', title)
    // formData.append('artist', artist)
    // formData.append('album', album)
    // formData.append('year', year)
    // formData.append('genre', genre)
    // formData.append('duration', duration)
    // formData.append('artwork', art)
    // formData.append('url', song)
    // formData.append('lyrics', lyrics)

	console.log([...formData]);

    axios.post('https://httpbin.org/post', formData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    

    // const artFile = document.getElementById('artwork').files[0];
    // const songFile = document.getElementById('song').files[0];
    // let formData = new FormData();
    // formData.append("images", artFile);
    // formData.append("music", songFile);

    // axios.post(`${url}/upload`, formData, {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     }
    // });

    // try {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(jsonData),
    //     });

    //     if (!response.ok) {
    //         throw new Error('Gagal mengirim data ke server.');
    //     }

	// 	const msg = 'Data berhasil dikirim ke server'
    //     console.log(msg);
	// 	msgPopup(msg)
    // } catch (error) {
    //     console.error('Terjadi kesalahan:', error);
    // }
	
}

// __________________________Update/PUT Method__________________________
async function updateByID(id) {
	const title = document.getElementById('title').innerText;
    const artist = document.getElementById('artist').value;
    const album = document.getElementById('album').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const duration = document.getElementById('duration').value;
    const lyrics = document.getElementById('lyrics').value;

    const jsonData = {
        title: title,
        artist: artist,
        album: album,
        year: year,
        genre: genre,
		duration: duration,
        lyrics: lyrics,
    };
	// console.log(jsonData);

	try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        });

        if (!response.ok) {
            throw new Error('Gagal mengirim permintaan PUT ke server.');
        }

		const msg = `Data dengan ID ${id} telah diubah`
        console.log(msg);
		msgPopup(msg)

    } catch (error) {
		const msg = `Terjadi kesalahan saat menghapus data: ${error}`
        console.error(msg);
		msgPopup(msg)
    }
}

// __________________________DELETE Method__________________________
async function deleteByID(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Gagal mengirim permintaan DELETE ke server.');
        }

		const msg = `Data dengan ID ${id} telah dihapus`
        console.log(msg);
        closeModal();
		msgPopup(msg)

    } catch (error) {
		const msg = `Terjadi kesalahan saat menghapus data: ${error}`
        console.error(msg);
		msgPopup(msg)
    }
}