// __________________________Modal init__________________________
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// __________________________Detail Button Function__________________________
function detailData(id) {

	fetchById(id)
		.then((data) => {
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
							<td>${data.artist}</td>
						</tr>
						<tr>
							<td>Album</td>
							<td>:</td>
							<td>${data.album}</td>
						</tr>
						<tr>
							<td>Tahun rilis</td>
							<td>:</td>
							<td>${data.year}</td>
						</tr>
						<tr>
							<td>Genre</td>
							<td>:</td>
							<td>${data.genre}</td>
						</tr>
						<tr>
							<td>Durasi lagu</td>
							<td>:</td>
							<td>${data.duration}</td>
						</tr>
						<tr>
							<td>Lirik</td>
							<td>:</td>
							<td>${data.lyrics}</td>
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
function editData() {
	const format = `
		<h1>Edit Data</h1>
		<div class="flex">
			<button class="btn-close" onclick="closeModal()">⨉</button>
		</div>
		<div>
			<h2>Judul data</h2>

			<label for="teks">Data teks</label>
			<input type="text" id="teks" name="teks" value="Sometext" />
			<label for="angka">Data angka</label>
			<input type="number" id="angka" name="angka" value="12" />
			<label for="email">Data Email</label>
			<input type="email" id="email" name="email" value="examplemail@mail.com" />
		</div>
		<button class="btn">Simpan</button>
	`
	modal.innerHTML = format
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

// __________________________Delete Button Function__________________________
function deleteData() {
	const format = `
		<div class="flex">
			<button class="btn-close" onclick="closeModal()">⨉</button>
		</div>
		<div>

			<h2>Yakin ingin menghapus?</h2>
		</div>
		<button class="btn">Hapus</button>
	`
	modal.innerHTML = format
	modal.style.width = '384px'
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

// __________________________Message pop up__________________________
function msgPopup(msg) {
	const format = `
		<div class="flex">
			<button class="btn-close" onclick="closeModal()">⨉</button>
		</div>
		<div>
			<h1>Error ni bruh</h1>
			<h3>${msg}</h3>
		</div>
		<button class="btn" onclick="closeModal()">Oke</button>
	`
	modal.innerHTML = format
	modal.style.width = '384px'
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

// __________________________Create New modal trigger (by press 'ctrl + 5' on keyboard)__________________________
function hideForm() {
	const form = document.getElementById('form-input')
	if (form.style.display == 'none') {
		form.style.display = 'flex'
		document.getElementById('inputToggle').innerText = 'Tutup form input'
	} else {
		form.style.display = 'none'
		document.getElementById('inputToggle').innerText = 'Buka form input'
	}
}

// __________________________Modal Close Button Function__________________________
function closeModal() {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
}

// __________________________Close Modal with outer area of Modal__________________________
overlay.addEventListener("click", () => {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
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
