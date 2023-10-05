// IMPORTIR
const express = require('express')
const multer = require('multer')
const fs = require('fs')

// __APP INIT__

const app = express()
const PORT = 3000

// General disk
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage: storage });

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
        cb(null, 'music-data/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const musicUpload = multer({ storage: musicStorage });

// JSON CRUD
const readData = () => {
    const jsonData = fs.readFileSync('music--local.json', 'utf-8')
    return JSON.parse(jsonData)
}
function writeData(data) {
    fs.writeFileSync('music--local.json', JSON.stringify(data));
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
    try {
        console.log(req.body);
        const data = readData()
        // console.log(data.songs);
        data.songs.push(req.body)
        writeData(data);
        return res.status(200).json({ message: 'Berhasil membuat data' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat membuat data' });
    }
});

// Image upload
app.post('/songs/uploadsartworkUp', imageUpload.single('artworkUp'), (req, res) => {
    try {
        console.log(req.file);
        return res.status(200).json({ message: 'Upload Gambar berhasil' });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Upload Gagal' });
    }
});

// Song upload
app.post('/songs/uploadssongUp', musicUpload.single('songUp'), (req, res) => {
    try {
        console.log(req.file);
        return res.status(200).json({ message: 'Upload Gambar berhasil' });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Upload Gagal' });
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