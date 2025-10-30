// app.js
const express = require('express');
const app = express();
const productRouter = require('./Routes/productroutes'); // path to file above
const errorhandler = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 3000;

app.use(express.json()); // parse JSON bodies

// Mount product router under /product
app.use('/products', productRouter);


// Basic 404
app.use((req, res) => {
  res.status(404).json({ status: 404, message: `Route ${req.originalUrl} not found` });
});


//error handler
app.use(errorhandler);


app.listen(PORT, () => console.log(`Art Amour backend running on http://localhost:${PORT}`));













// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// })

//Name according 

/*router.get("/name",(req,res)=>{
  try{
    const data = {
      name :"Art Amour",
      City :"Indore",
      pincode:"452012",
      State: "Madhya Pradesh"
    }
    res.status(200).json({
    status:200, 
    message : 'Data sent Successfully',
    data: data,
    })
  } catch (error){
    res.status(500).json({
      status:500, message:"Internal Server Error"
    })
  }
})

app.use('/', router); */



// Home page
/*app.get("/",(req,res)=>{
  try{
    let data = {Home:"Welcome To the Home Page"}
    res.json(data);
  } catch (error){
    console.error(error);
    res.status(500).json({
      status:500, message:"Internal Server Error"
    })
  }
})

//Contact 
app.get("/Contact",(req,res)=>{
  try{
    let data = {Contact:"9876543210"}
    res.json(data);
  } catch (error){
    console.error(error);
    res.status(500).json({
      status:500, message:"Internal Server Error"
    })
  }
})



//About us
app.get("/About us",(req,res)=>{
  try{
    let data = {Aboutus:"Our Platform Provide Handmade and ecofriendly things for decor your home "}
    res.json(data);
  } catch (error){
    console.error(error);
    res.status(500).json({
      status:500, message:"Internal Server Error"
    })
  }
})


//Page not Found
app.use((req,res)=>{
  res.status(200).json({
    status:200, 
    message:`the request URL '${req.originalUrl}' was not found on the server`,
  })

})*/

//temporary add
/*let products = [
  { id: 101, name: 'Resin Frame', category: 'Art & Craft', price: 2000, size: '6 inch', material: 'Resin', description: 'Hand Crafted Rose Petals Floral Resin Frame for your Special one' },
  { id: 102, name: 'Flower Painting', category: 'Painting', price: 799, size: '8 inch', material: 'Canvas', description: 'Flower Paintings For your living room' }
];

// GET /product -> all products
router.get('/', (req, res) => {
  res.json({ status: 200, data: products });
});

// GET /product/:id -> product by id
router.get('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).json({ status: 404, message: 'Product not found' });
    res.json({ status: 200, data: product });
  } catch (err) {
    next(err);
  }
});

// POST /product -> add product
router.post('/', (req, res, next) => {
  try {
    // simple id generation: choose a new id bigger than existing max id
    const maxId = products.reduce((m, p) => Math.max(m, p.id), 0);
    const newProduct = {
      id: maxId + 1,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      size: req.body.size,
      material: req.body.material,
      description: req.body.description
    };
    products.push(newProduct);
    res.status(201).json({ status: 201, message: 'Product created', data: newProduct });
  } catch (err) {
    next(err);
  }
});

// PUT /product/:id -> replace/update product
router.put('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ status: 404, message: 'Product not found' });

    // Replace product (keep same id)
    const updated = { id, ...req.body };
    products[index] = updated;
    res.json({ status: 200, message: 'Product updated', data: updated });
  } catch (err) {
    next(err);
  }
});

// DELETE /product/:id -> delete product
router.delete('/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ status: 404, message: 'Product not found' });
    products.splice(index, 1);
    res.json({ status: 200, message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// mount router
app.use('/product', router);

// basic 404
app.use((req, res) => {
  res.status(404).json({ status: 404, message: `Route ${req.originalUrl} not found` });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: 500, message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});*/
