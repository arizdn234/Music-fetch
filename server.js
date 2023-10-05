// __________________________IMPORTIR__________________________
const express = require('express')
const multer = require('multer')
const fs = require('fs')

// __________________________APP INIT__________________________
const app = express()
const PORT = 3000

// __________________________DISK__________________________
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

// __________________________Artwork disk__________________________
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/album-arts/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const imageUpload = multer({ storage: imageStorage });

// __________________________Music disk__________________________
const musicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/music-data/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const musicUpload = multer({ storage: musicStorage });

// __________________________JSON CRUD__________________________
const readData = () => {
    const jsonData = fs.readFileSync('music--local.json', 'utf-8')
    return JSON.parse(jsonData)
}
function writeData(data) {
    fs.writeFileSync('music--local.json', JSON.stringify(data, null, 2));
}

// ____________________________APP INIT____________________________
app.use(express.static('public'))
app.use(express.json())

// __________________________Add Access Control Allow Origin headers__________________________
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// __________________________App port__________________________
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// __________________________GET All method__________________________
app.get('/songs/', (req, res) => {
    const data = readData()
    res.json(data)
})

// __________________________GET By ID method__________________________
app.get('/songs/:id', (req, res) => {
    const id = req.params.id;
    const data = readData();

    const song = data.songs.find(song => song.id === id);

    if (!song) {
        return res.status(404).json({ message: 'Lagu tidak ditemukan' });
    }

    res.json(song);
});

// __________________________POST method__________________________
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

// __________________________Image upload__________________________
app.post('/songs/uploadsartworkUp', imageUpload.single('artworkUp'), (req, res) => {
    try {
        console.log(req.file);
        return res.status(200).json({ message: 'Upload Gambar berhasil' });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Upload Gagal' });
    }
});

// __________________________Song upload__________________________
app.post('/songs/uploadssongUp', musicUpload.single('songUp'), (req, res) => {
    try {
        console.log(req.file);
        return res.status(200).json({ message: 'Upload Gambar berhasil' });
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Upload Gagal' });
    }
});

// __________________________DELETE By ID method__________________________
app.delete('/songs/:id', (req, res) => {
    const id = req.params.id;
    const data = readData()
    const index = data.songs.findIndex(song => song.id === id);

    // console.log(typeof id);
    // console.log(id);
    // console.log(index);

    if (index === -1) {
        return res.status(404).json({ message: 'Lagu tidak ditemukan' });
    }

    data.songs.splice(index, 1);
    writeData(data)
    res.json({ message: 'Lagu berhasil dihapus' });
});

// __________________________Server port__________________________
app.listen(PORT, () => console.log(`Server run on port ${PORT}\n\nhttp://localhost:${PORT}`))