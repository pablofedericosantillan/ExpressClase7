/**
 * ejemplo de un servidor http con express
 */

//const express = require('express');
//const fs = require('fs'); 
import express from 'express';
import fs from 'fs'; 

// creo una app de tipo express
const app = express();
const puerto = 8080;
let contadorItem1=0;
let contadorItem2=0;

async function leer(ruta) {
    try {
        let products = await fs.promises.readFile(ruta, 'utf-8')
        return JSON.parse(products);
    }
    catch(error) { 
        return [];
    }
}

function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

async function go() {
    let products = await leer('productos.txt');
//    console.log(await products);

app.get('/', (req, res) => {
    res.end('<h1> Bienvenidos al ejercicio entregable de la CLASE 7</h1>')
});

//1
app.get('/item', (req, res) => {
    contadorItem1++;
    let item= products.map(x => x.title)
    res.json({ items: `${item}`, cantidad: `${products.length}` });
});
//2
app.get('/item-random', (req, res) => {
    contadorItem2++;
    let pos=obtenerRandom(0,products.length);
    res.json({ item: `${products[pos].title}`,  pos: `${pos}`});
});

app.get('/visitas', (req, res) => {
    res.json({visitas: {item1: `${contadorItem1}`, item2: `${contadorItem2} `}});
});


// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});


}
go()