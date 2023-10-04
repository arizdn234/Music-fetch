// IMPORTIR
const express = require('express')
const multer = require('multer')
const fs = require('fs')

// __APP INIT__

const app = express()
const PORT = 3000

// Artwork disk
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'album-arts/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const imageUpload = multer({ storage: imageStorage });

// Music disk
const musicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/music/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const musicUpload = multer({ storage: musicStorage });

const readData = () => {
    const jsonData = fs.readFileSync('music.json', 'utf-8')
    return JSON.parse(jsonData)
}

// __APP ROUTES__

app.use(express.json())

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// GET All method
app.get('/songs/', (req, res) => {
    const data = readData()
    res.json(data)
})

// GET By ID method
app.get('/songs/:id', (req, res) => {
    const id = req.params.id;
    const data = readData();

    const song = data.songs.find(song => song.id === id);

    if (!song) {
        return res.status(404).json({ message: 'Lagu tidak ditemukan' });
    }

    res.json(song);
});

// POST method
app.post('/songs', (req, res) => {
    // app.post('/songs', [imageUpload.single('artwork'), musicUpload.single('song')], (req, res) => {
    try {
        console.log(req);
    //     const { id, title, artist, album, year, genre, duration, lyrics } = req.body;
    //   const imageFile = req.file;
    //   const musicFile = req.file;
  
    //   if (!imageFile || !musicFile) {
    //     return res.status(400).json({ message: 'Harap unggah gambar dan musik' });
    //   }

    //   const newSong = {
    //     id: id,
    //     title: title,
    //     artist: artist,
    //     album: album,
    //     genre: genre,
    //     year: year,
    //     duration: duration,
    //     artwork: imageFile.filename,
    //     url: musicFile.filename,
    //     lyrics: lyrics
    //   };

    //   console.log(newSong);
  
    //   // Lakukan sesuatu dengan data baru, seperti menyimpannya ke database
    //   songs.push(newSong);
  
    //   res.status(201).json({ message: 'Data berhasil dibuat', song: newSong });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat membuat data' });
    }
  });

// DELETE By ID method
app.delete('/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = songs.findIndex(song => song.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Lagu tidak ditemukan' });
    }

    songs.splice(index, 1);

    res.json({ message: 'Lagu berhasil dihapus' });
});

app.listen(PORT, () => console.log(`Server run on port ${PORT}\n\nhttp://localhost:${PORT}`))