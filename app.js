const express = require('express')
const app = express()
const port = 3000

const modeloCategoria = require('./models').Categoria 
const modeloProducto = require('./models').Producto 



// Middleware que viene en Express que analiza las solicitudes entrantes con el metodo JSON basado en BodyParser 
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//Alta de Categoria
app.post('/crearcategoria', (req, res) => {
    modeloCategoria.create(req.body)
        .then( (data) => {
            res.json({datos:data})
        })
        .catch( (err) => {
            res.json( {err:err})
        })
})

//Alta de Productos
app.post('/crearproducto', (req, res) => {
    modeloProducto.create(req.body)
        .then( (data) => {
            res.json({datos:data})
        })
        .catch( (err) => {
            res.json( {err:err})
        })
})

// Mostrar todos los Productos
app.get('/mostrarproductos', (req, res) =>{
    modeloProducto.findAll({
        include: [{model:modeloCategoria}]
    })
    .then( (data) => {
        res.json({datos:data})
    })
    .catch( (err) => {
        res.json( {err:err})
    })
})

//Eliminar un producto
app.delete('/borrarproducto/:id', (req, res) =>{
    modeloProducto.destroy({
        where: {id: req.params.id},
    })
    .then( (data) => {
        res.json({datos:data})
    })
    .catch( (err) => {
        res.json( {err:err})
    })
})

//Editar un producto
app.put('/editarproducto/:id', (req, res) =>{
    modeloProducto.update(req.body,{
        where: {id: req.params.id},
    })
    .then( (data) => {
        res.json({datos:data})
    })
    .catch( (err) => {
        res.json( {err:err})
    })
})

/* app.get('/', (req, res) => {
    res.send('Hola Mundo')
})
 */

app.listen(port, () => {
    console.log(`Server UP corriendo en http://localhost:${port}`)
})