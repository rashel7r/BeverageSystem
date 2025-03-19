const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('MongoDB connected successfully');
  initializeDatabase();
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Beverage Schema
const beverageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['coffee', 'tea', 'shakes', 'bubbleTea'] }
});

const Beverage = mongoose.model('Beverage', beverageSchema);

// Sample data to initialize the database
const initialBeverages = {
  coffee: [
    { 
      name: 'Espresso', 
      price: 3.00, 
      description: 'A rich, concentrated coffee brewed by forcing a small amount of nearly boiling water through finely-ground coffee beans.',
      category: 'coffee' 
    },
    { 
      name: 'Americano', 
      price: 3.50, 
      description: 'A smooth coffee made by diluting a shot of espresso with hot water, giving it a similar strength to drip coffee.',
      category: 'coffee' 
    },
    { 
      name: 'Flat White', 
      price: 4.75, 
      description: 'A velvety smooth coffee with a strong espresso base, combined with microfoam creating a rich, creamy texture.',
      category: 'coffee' 
    },
    { 
      name: 'Cappuccino', 
      price: 4.00, 
      description: 'A perfect balance of espresso, steamed milk, and foam, creating a creamy and frothy delight.',
      category: 'coffee' 
    }
  ],
  tea: [
    { 
      name: 'Classic Black Tea', 
      price: 3.00, 
      description: 'A robust and full-bodied tea with a rich flavor, perfect for starting your day or enjoying in the afternoon.',
      category: 'tea' 
    },
    { 
      name: 'Green Tea', 
      price: 3.50, 
      description: 'A delicate and refreshing tea made from high-quality green tea leaves, known for its subtle flavors and health benefits.',
      category: 'tea' 
    },
    { 
      name: 'Chai Latte', 
      price: 4.50, 
      description: 'A warm and spicy blend of black tea, cinnamon, cardamom, ginger, and cloves, mixed with steamed milk for a comforting treat.',
      category: 'tea' 
    },
    { 
      name: 'Matcha Latte', 
      price: 5.00, 
      description: 'A vibrant and creamy drink made from finely ground green tea powder whisked with steamed milk, offering a unique and energizing flavor.',
      category: 'tea' 
    }
  ],
  shakes: [
    { 
      name: 'Berry Blast Smoothie', 
      price: 6.00, 
      description: 'A refreshing blend of strawberries, blueberries, and raspberries mixed with yogurt and a splash of apple juice for a fruity delight.',
      category: 'shakes' 
    },
    { 
      name: 'Tropical Smoothie', 
      price: 6.50, 
      description: 'A vibrant mix of mango, pineapple, and banana blended with coconut milk for a taste of the tropics.',
      category: 'shakes' 
    },
    { 
      name: 'Green Smoothie', 
      price: 7.00, 
      description: 'A healthy blend of spinach, kale, green apple, and cucumber with a hint of ginger and lemon, perfect for a nutritious boost.',
      category: 'shakes' 
    },
    { 
      name: 'Banana Shake', 
      price: 6.50, 
      description: 'A creamy shake made with rich chocolate ice cream and ripe bananas, blended to perfection for a delicious treat.',
      category: 'shakes' 
    }
  ],
  bubbleTea: [
    { 
      name: 'Matcha Bubble Tea', 
      price: 5.75, 
      description: 'A smooth and earthy drink made with high-quality matcha green tea, milk, and tapioca pearls, perfect for green tea lovers.',
      category: 'bubbleTea' 
    },
    { 
      name: 'Thai Bubble Tea', 
      price: 5.50, 
      description: 'A rich and sweet tea with a hint of spices, made from strong-brewed Thai tea, milk, and sugar, served with tapioca pearls.',
      category: 'bubbleTea' 
    },
    { 
      name: 'Tea Popping Boba', 
      price: 5.50, 
      description: 'A refreshing blend of fruit-flavored tea (such as peach, mango, or lychee) with popping boba that bursts with juicy flavors in every sip.',
      category: 'bubbleTea' 
    },
    { 
      name: 'Brown Sugar Milk Tea', 
      price: 6.00, 
      description: 'A creamy milk tea sweetened with rich brown sugar syrup and served with tapioca pearls, known for its caramel-like flavor and Instagram-worthy appearance.',
      category: 'bubbleTea' 
    }
  ]
};

// Initialize database with sample data if empty
const initializeDatabase = async () => {
  try {
    const count = await Beverage.countDocuments();
    if (count === 0) {
      const allBeverages = Object.values(initialBeverages).flat();
      await Beverage.insertMany(allBeverages);
      console.log('Database initialized with sample data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Routes
app.get('/api/beverages', async (req, res) => {
  try {
    const beverages = await Beverage.find();
    const categorizedBeverages = {
      coffee: beverages.filter(b => b.category === 'coffee'),
      tea: beverages.filter(b => b.category === 'tea'),
      shakes: beverages.filter(b => b.category === 'shakes'),
      bubbleTea: beverages.filter(b => b.category === 'bubbleTea')
    };
    res.json(categorizedBeverages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching beverages', error: error.message });
  }
});

app.get('/api/beverages/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const beverages = await Beverage.find({ category });
    if (!beverages.length) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(beverages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching beverages', error: error.message });
  }
});

// Get specific beverage by category and ID
app.get('/api/beverages/:category/:beverageId', async (req, res) => {
  try {
    const { category, beverageId } = req.params;
    const beverage = await Beverage.findOne({ _id: beverageId, category });
    if (!beverage) {
      return res.status(404).json({ message: 'Beverage not found' });
    }
    res.json(beverage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching beverage', error: error.message });
  }
});

// Add new beverage
app.post('/api/beverages', async (req, res) => {
  try {
    const newBeverage = new Beverage(req.body);
    await newBeverage.save();
    res.status(201).json(newBeverage);
  } catch (error) {
    res.status(400).json({ message: 'Error adding beverage', error: error.message });
  }
});

// Update beverage
app.put('/api/beverages/:id', async (req, res) => {
  try {
    const updatedBeverage = await Beverage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBeverage) {
      return res.status(404).json({ message: 'Beverage not found' });
    }
    res.json(updatedBeverage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating beverage', error: error.message });
  }
});

// Delete beverage
app.delete('/api/beverages/:id', async (req, res) => {
  try {
    const deletedBeverage = await Beverage.findByIdAndDelete(req.params.id);
    if (!deletedBeverage) {
      return res.status(404).json({ message: 'Beverage not found' });
    }
    res.json({ message: 'Beverage deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting beverage', error: error.message });
  }
});

// Reset database route
app.post('/api/reset-database', async (req, res) => {
  try {
    await Beverage.deleteMany({});
    const allBeverages = Object.values(initialBeverages).flat();
    await Beverage.insertMany(allBeverages);
    res.json({ message: 'Database reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting database', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + 10; port++) {
    try {
      await new Promise((resolve, reject) => {
        const server = app.listen(port)
          .once('listening', () => {
            server.close();
            resolve();
          })
          .once('error', reject);
      });
      return port;
    } catch (err) {
      if (err.code !== 'EADDRINUSE') throw err;
    }
  }
  throw new Error('No available ports found');
}

async function startServer() {
  try {
    const port = await findAvailablePort(PORT);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 