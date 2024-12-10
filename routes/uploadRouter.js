const express=require("express");
const router=express.Router();
const DataService=require("../services/dataService");


const multer = require("multer");
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para archivos
const fs = require('fs'); // Para leer el archivo JSON



router.post('/json', upload.single('file'), async (req, res) => {
  const file = req.file;
  // const jsonData = JSON.parse(file);
  if (!file) {
    return res.status(400).json({ error: 'No se envió un archivo' });
  }

  // Leer el contenido del archivo JSON
  fs.readFile(file.path, 'utf8', async (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }
    //console.log('Contenido del archivo leído:', data);

    try {
      const jsonData = JSON.parse(data); // Convertir el archivo a JSON
      //await service.updateCrimeData(jsonData); // Actualizar los datos
    //  console.log(jsonData,'Datos cargados de la uploadRouter:');
      console.log(`esto es uploadrouter ${jsonData[0].date}}`);


       await DataService.loadData(jsonData);

      // Eliminar el archivo temporal después de leerlo
      fs.unlinkSync(file.path);

      res.status(200).json({ message: 'Datos actualizados correctamente' });
    } catch (parseError) {
      res.status(400).json({ error: 'El archivo no es un JSON válido' });
    }
  });
});

module.exports = router;
