// __________________________Modal init__________________________
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// __________________________Detail Button Function__________________________
function detailData(id) {
	console.log(id);
	fetchById(id)
		.then((data) => {
			console.log(data);
			const format = `
				<h1>Detail</h1>
				<div class="flex">
					<button class="btn-close" onclick="closeModal()">⨉</button>
				</div>
				<div>
					<h2>${data.title}</h2>
					<table>
						<tr>
							<td>Artis</td>
							<td>:</td>
							<td>${data.artist || 'Tidak diketahui'}</td>
						</tr>
						<tr>
							<td>Album</td>
							<td>:</td>
							<td>${data.album || 'Tidak diketahui'}</td>
						</tr>
						<tr>
							<td>Tahun rilis</td>
							<td>:</td>
							<td>${data.year || 'Tidak diketahui'}</td>
						</tr>
						<tr>
							<td>Genre</td>
							<td>:</td>
							<td>${data.genre || 'Tidak diketahui'}</td>
						</tr>
						<tr>
							<td>Durasi lagu</td>
							<td>:</td>
							<td>${data.duration || 'Tidak diketahui'}</td>
						</tr>
						<tr>
							<td>Lirik</td>
							<td>:</td>
							<td>${data.lyrics || 'Tidak diketahui'}</td>
						</tr>
					</table>
				</div>
			`

			modal.innerHTML = format
			modal.style.width = '384px'
			modal.classList.remove("hidden");
			overlay.classList.remove("hidden");
		})
		.catch((e) => {
			console.error('Gagal saat menampilkan detail lagu:', e)
		})
}

// __________________________Edit Button Function__________________________
function editData(id) {
	fetchById(id)
	.then((data) => {
		// console.log(data);\
		const format = `
			<h1>Edit Data</h1>
			<div class="flex">
				<button class="btn-close" onclick="closeModal()">⨉</button>
			</div>
			<h2 contenteditable="true" spellcheck="false" id="title" value="${data.title}">${data.title}</h2>
			<div class="flex-row">
				<div class="left">
					<label for="artist">Nama penyanyi/band</label>
					<input type="text" id="artist" name="artist" placeholder="Masukkan nama penyanyi" value="${data.artist}" required/>
					<label for="album">Album lagu</label>
					<input type="text" id="album" name="album" placeholder="Masukkan nama album" value="${data.album}" required/>
					<label for="year">Tahun rilis</label>
					<input type="number" id="year" name="year" placeholder="Masukkan tahun rilis" value="${data.year}" required/>
					<label for="genre">Genre musik</label>
					<input type="text" id="genre" name="genre" placeholder="Masukkan genre musik" value="${data.genre}" required/>
				</div>
				<div class="right">
					<label for="duration">Durasi musik</label>
					<input type="text" id="duration" name="duration" placeholder="Masukkan durasi musik --Contoh (3:10)" value="${data.duration}" required/>
					<label for="lyrics">Lirik lagu</label>
					<input type="text" id="lyrics" name="lyrics" placeholder="Masukkan lirik lagu" value="${data.lyrics}" required/>
					<label for="artwork" class="artDis"><i class="fa-solid fa-folder"></i> ${data.artwork}</label>
					<input type="file" id="artwork" name="artwork" accept=".jpg, .jpeg, .png" onchange="displayFileName('artwork', 'artDis')"/>
					<label for="song" class="songDis"><i class="fa-solid fa-folder"></i> ${data.url}</label>
					<input type="file" id="song" name="song" accept=".mp3, ,m4a" onchange="displayFileName('song', 'songDis')"/>
				</div>
			</div>
			<button class="btn" onclick="updateByID(${data.id})">Simpan perubahan</button>
		`
		modal.innerHTML = format
		modal.style.width = '700px'
		modal.classList.remove("hidden");
		overlay.classList.remove("hidden");
	})
	.catch((e) => {
		console.error('Gagal saat mengambil data lagu:', e)
	})
}

// __________________________Delete Button Function__________________________
function deleteData(id) {
	fetchById(id)
	.then((data) => {
		// console.log(data);
		const format = `
			<div class="flex">
				<button class="btn-close" onclick="closeModal()">⨉</button>
			</div>
			<div>
				<h2>Yakin ingin menghapus?</h2>
			</div>
			<button class="btn" onclick="deleteByID(${id})">Hapus</button>
		`
		modal.innerHTML = format
		modal.style.width = '384px'
		modal.classList.remove("hidden");
		overlay.classList.remove("hidden");
	})
	.catch((e) => {
		console.error('Gagal saat mengambil data lagu:', e)
	})
}

// __________________________Message pop up__________________________
function msgPopup(msg) {
	const format = `
		<div class="flex">
			<button class="btn-close" onclick="closeModal()">⨉</button>
		</div>
		<div>
			<h1>INFOOO!!</h1>
			<h3>${msg}</h3>
		</div>
		<button class="btn" onclick="closeModal()">Oke</button>
		<button class="btn" onclick="location.reload()">Muat ulang</button>
	`
	modal.innerHTML = format
	modal.style.width = '384px'
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

// __________________________Create New__________________________
function hideForm() {
	msgPopup(`Gunakan kombinasi 'ctrl + 5' </br>(ctrl dan angka 5) </br>untuk menampilkan form input data baru.`)
}

document.body.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === '5') {
        // alert('Ctrl + 5 pressed');
		const form = document.getElementById('form-input')
		if (form.style.display == 'none') {
			closeModal()
			form.style.display = 'flex'
			overlay.classList.remove("hidden");
		} else {
			overlay.classList.add("hidden");
			form.style.display = 'none'
		}
    }
});


// __________________________Display file name on label tag__________________________
function displayFileName(nameID, target) {
	const fileName = document.getElementById(nameID).files[0]
	// console.log(fileName.name);
	document.querySelector(`.${target}`).innerHTML = fileName.name
}

// __________________________Modal Close Button Function__________________________
function closeModal() {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
	document.getElementById('form-input').style.display = 'none'
}

// __________________________Close Modal with outer area of Modal__________________________
overlay.addEventListener("click", () => {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
	document.getElementById('form-input').style.display = 'none'
});

// __________________________Toggler Button Function__________________________
function hideContent() {
	const x = document.getElementById("content");
	if (x.style.display === "none") {
		x.style.display = "block";
		document.getElementById('hider').innerHTML = 'Hide &uarr;'
	} else {
		document.getElementById('hider').innerHTML = 'Show &darr;' 
		x.style.display = "none";
	}
}
