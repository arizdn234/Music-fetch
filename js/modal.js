// Modal init
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Detail Button Function
function detailData() {
	const format = `
		<h1>Detail</h1>
		<div class="flex">
			<button class="btn-close" onclick="closeModal()">⨉</button>
		</div>
		<div>
			<h2>Judul data</h2>
			<p>Key: Value</p>
			<p>Key: Value</p>
			<p>Key: Value</p>
		</div>
	`
	modal.innerHTML = format
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

// Edit Button Function
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

// Delete Button Function
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
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
}

// Modal Close Button Function
function closeModal() {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
}

// Close Modal with outer area of Modal
overlay.addEventListener("click", () => {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
});

// Toggler Button Function
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
