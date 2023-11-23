const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
const upload = multer({ dest: 'uploads/' })

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    res.json({ error: 'No file selected' })
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
