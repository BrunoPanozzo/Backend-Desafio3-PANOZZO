const ProductManager = require('./ProductManager')
const productManager = new ProductManager('./Products.json')

const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    const { limit } = req.query
    await productManager.inicializar()
    let products = await productManager.getProducts()
    
    const filteredProducts = limit
        ? products.slice(0, limit)
        : products
    res.send(filteredProducts)
})

app.get('/products/:prodId', async (req, res) => {
    const prodId = req.params.prodId
    const product = productManager.getProductById(prodId)
    if (product)
        res.send(product)
    else
        res.send(`El producto con código \"${prodId}\" no existe`)
})

app.listen(8080, () => {
    console.log('Servidor listo escuchando en el puerto 8080')
})