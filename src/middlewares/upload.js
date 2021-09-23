const multer = require('multer');
const path = require('path');

// o storage adiciona duas callback extras que nesse caso, alteram o nome do arquivo
const storage = multer.diskStorage({
  destination: (_req, _file, callback) =>
    callback(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});
// path.join "traduz" o path dependendo do sistema operacional (pode ter separador de pasta diferentes)
// path.join pega do diretório onde este arquivo esta, por isso agora foi necessário "subir" duas pastas

// O multer recebe um objeto contém o destino do arquivo enviado
const upload = multer({ storage });

module.exports = upload;
