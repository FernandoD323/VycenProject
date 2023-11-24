'use strict'
const firebase = require('firebase/storage');
// import { Request, Response } from 'express'
const fs = require('fs');
const path = require('path')
const {Photo} = require('../models/photo');


exports.prueba = async (req, res) => {
    console.log('PRUEBA')
    return res.send({ message: 'Prueba' })
}

exports.uploadImage = async (req, res) => {
    try {
        const imageBlob = req.file.buffer;
        const imageName = req.file.originalname;
        fs.writeFileSync('./src/assets/' + imageName, Buffer.from(imageBlob))
        return res.send({ message: imageName })
        // const storage = firebase.getStorage();
        // const storageRef = firebase.ref(storage, imageName);
        // let responseFirebase = await firebase.uploadBytes(storageRef, imageBlob);
        // if (responseFirebase) {
        //     return res.send({ message: 'Image uploaded successfully' })
        // } else {
        //     return res.send({ message: 'Error ' })
        // }
    } catch (error) {
        console.log(error)
        return res.send({ error: error })
    }
}

exports.getImages = async (req, res) => {
    const directorio = './src/assets';
    fs.readdir(directorio, (error, archivos) => {
        if (error) {
            console.error('Error al leer el directorio:', error);
            return res.status(500).send({ message: 'Error al leer el directorio' });
        }

        // Filtrar solo los archivos con extensión de imagen (por ejemplo, .png)
        const imagenes = archivos.filter(archivo =>
            ['.png', '.jpg', '.jpeg', '.gif', '.avif', '.webp'].includes(path.extname(archivo).toLowerCase())
        );

        // Mapear los nombres de archivo a las rutas completas
        const rutasImagenes = imagenes.map(archivo => `${directorio}/${archivo}`);

        // Leer cada imagen y enviarlas como respuesta
        const imagenesEnBytes = rutasImagenes.map(ruta => ({
            nombre: path.basename(ruta), // Obtener el nombre del archivo
            imagen: fs.readFileSync(ruta, 'base64') // Leer la imagen en base64
        }));

        res.send({ imagenes: imagenesEnBytes });
    });}
    // const storage = firebase.getStorage();
    // const storageRef = firebase.ref(storage);
    // let fileNames = []
    // let files = await firebase.listAll(storageRef)

    // await Promise.all(files.items.map(async (itemRef) => {
    //     const fileName = itemRef.name;
    //     const fileDownloadURL = await firebase.getDownloadURL(itemRef);
    //     fileNames.push({ name: fileName, downloadURL: fileDownloadURL });
    // }));

    // return res.send({ files: fileNames });

    exports.getPhotos = async(req, res) =>{
        const photos = await Photo.find();
        return res.json(photos);
    };
    
    exports.createPhoto = async(req, res) =>{
        const { title, description,owner,price,sex } = req.body;
        const newPhoto = { title, description,owner,price,sex,imagePath: req.file.path };
        const photo = new Photo(newPhoto);
        await photo.save();
        return res.json({
            message: 'Photo Saved Successfully',
            photo
        });
    };
    
    exports.getPhoto = async(req, res) =>{
        const { id } = req.params;
        const photo = await Photo.findById(id);
        return res.json(photo);
    }
    
    exports.deletePhoto = async(req, res) =>{
        const { id } = req.params;
        const photo = await Photo.findByIdAndRemove(id);
        if (photo) {
            await fs.unlink(path.resolve(photo.imagePath));
        }
        return res.json({ message: 'Photo Deleted' });
    };
    
    exports.updatePhoto = async(req, res) =>{
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedPhoto = await Photo.findByIdAndUpdate(id, {
            title,
            description
        });
        return res.json({
            message: 'Successfully updated',
            updatedPhoto
        });
    }