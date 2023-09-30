// Fetch raw git
const urlEmbed = 'https://raw.githubusercontent.com/arizdn234/datasets/main/org-3-temporary/music.json'
fetch(urlEmbed)
	.then(res => res.text())
	.then((out) => {
		document.getElementById("show-json-from-git").innerText = out
	})
	.catch(err => { throw err });

// JSON fetch music.json
const url = 'http://localhost:3000/songs';

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
						<span onclick="detailData()" title="Lihat detail"><i class="fa-solid fa-eye"></i></span>
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
	.catch(error => console.error('Gagal melakukan permintaan GET:', error));
