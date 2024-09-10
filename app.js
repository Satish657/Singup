const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/item'); 

const app = express();
const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/mongocrud', {
  
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/items', async (req, res) => {



  try {
    const item = new Item(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, { name, quantity }, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem); // Return the updated item
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
