const url = 'https://raw.githubusercontent.com/arizdn234/datasets/main/org-3-temporary/music.json'
fetch(url)
.then(res => res.text())
.then((out) => {
  document.getElementById("show-json-from-git").innerText = out
})
.catch(err => { throw err });