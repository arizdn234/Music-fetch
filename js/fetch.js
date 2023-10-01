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
						<span onclick="editData()" title="Edit data"><i class="fa-solid fa-pencil"></i></span>
						<span onclick="deleteData()" title="Hapus data"><i class="fa-solid fa-trash"></i></span>
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
	event.preventDefault()

	let lastID = 0
	fetch(url).then(data => {
		return lastID = Math.max(...data.map(item => item.id));
	})
	console.log(lastID);

	const title = document.getElementById('title').value
	const artist = document.getElementById('artist').value
	const album = document.getElementById('album').value
	const year = document.getElementById('year').value
	const genre = document.getElementById('genre').value
	const art = document.getElementById('artwork').files[0]
	const song = document.getElementById('song').files[0]
	const lyrics = document.getElementById('lyrics').value

	const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('album', album);
    formData.append('year', year);
    formData.append('genre', genre);
    formData.append('artwork', artwork);
    formData.append('song', song);
    formData.append('lyrics', lyrics);
    formData.append('id', lastID++);

	try {
		const response = await fetch(url, {
			method: 'POST',
			body: formData
		})

		if (response.ok) {
			console.log('Sukses tambah data');
			msgPopup('Sukses tambah data')
		} else {
			console.error('Gagal tambah data');
			msgPopup('Gagal tambah data')
		}
	} catch (error) {
		const msg = `Permintaan POST error: ${error}`
		console.error(msg)
		msgPopup(msg)
	}
}