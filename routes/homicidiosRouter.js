const express = require('express');
const router = express.Router();
const GeneralSimulationService=require('../services/generalSimulationService');
const service=new GeneralSimulationService();


const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Carpeta temporal para archivos
const fs = require('fs'); // Para leer el archivo JSON



router.get('/', async(req, res) => {
  const result=await service.monteCarloSimulation();
  //console.log('Contenido del archivo leído:', result.ano);
  res.json(result);
})


// router.post('/upload-json', upload.single('file'), async (req, res) => {
//   const file = req.file;
//
//
//   if (!file) {
//     return res.status(400).json({ error: 'No se envió un archivo' });
//   }
//
//   // Leer el contenido del archivo JSON
//   fs.readFile(file.path, 'utf8', async (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error al leer el archivo' });
//     }
//     console.log('Contenido del archivo leído:', data);
//
//     try {
//       const jsonData = JSON.parse(data); // Convertir el archivo a JSON
//       await service.updateCrimeData(jsonData); // Actualizar los datos en tu servicio
//
//       // Eliminar el archivo temporal después de leerlo
//       fs.unlinkSync(file.path);
//
//       // Enviar el JSON como respuesta
//       res.status(200).json(data); // Aquí enviamos jsonData directamente, no dentro de un objeto
//     } catch (parseError) {
//       res.status(400).json({ error: 'El archivo no es un JSON válido' });
//     }
//   });
// });

router.post('/upload-json', upload.single('file'), async (req, res) => {
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
      await service.updateCrimeData(jsonData); // Actualizar los datos

      // Eliminar el archivo temporal después de leerlo
      fs.unlinkSync(file.path);

      res.status(200).json({ message: 'Datos actualizados correctamente' });
    } catch (parseError) {
      res.status(400).json({ error: 'El archivo no es un JSON válido' });
    }
  });
});

// router.post('/update-data', async(req, res) => {
//   const newCrimeData=req.body;
//   if (!Array.isArray(newCrimeData) || newCrimeData.length === 0) {
//     return res.status(400).json({ error: 'Datos inválidos o vacíos' });
//   }
//
//  await service.updateCrimeData(newCrimeData);
//   res.status(200).json({ message: 'Datos actualizados correctamente' });
//
//
// })


module.exports = router;
