# MongoDB Connection and Data Management with Express

## 1. Standard Connection Methods

### A. Direct MongoDB Driver
```javascript
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017/mydatabase";
let db;

async function connectToDb() {
    try {
        const client = await MongoClient.connect(uri);
        db = client.db();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect:", err);
    }
}
```

### B. Mongoose (Most Common)
```javascript
const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/mydatabase";

mongoose.connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Connection failed:", err));
```

### Best Practice: Connection Management
```javascript
// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

## 2. Data Management Patterns

### A. Direct Database Interaction (Most Common)
```javascript
// User model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

// Route handler
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

### B. Caching Layer Pattern
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

app.get('/users', async (req, res) => {
    try {
        // Check cache first
        const cachedUsers = cache.get('users');
        if (cachedUsers) {
            return res.json(cachedUsers);
        }

        // If not in cache, get from database
        const users = await User.find();

        // Store in cache
        cache.set('users', users);

        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

### C. Repository Pattern
```javascript
// repositories/userRepository.js
class UserRepository {
    async findAll() {
        return await User.find();
    }

    async findById(id) {
        return await User.findById(id);
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }
}

// controllers/userController.js
const userRepo = new UserRepository();

app.get('/users', async (req, res) => {
    try {
        const users = await userRepo.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

## 3. Data Synchronization Strategies

### A. Real-time Updates with Change Streams
```javascript
const collection = db.collection('users');
const changeStream = collection.watch();

changeStream.on('change', change => {
    console.log('Change detected:', change);
    // Update application state or notify clients
});
```

### B. Polling Pattern
```javascript
let lastSync = new Date();

async function syncData() {
    try {
        const newData = await User.find({
            updatedAt: { $gt: lastSync }
        });

        if (newData.length > 0) {
            // Update local state
            lastSync = new Date();
        }
    } catch (err) {
        console.error('Sync failed:', err);
    }
}

// Poll every 5 minutes
setInterval(syncData, 5 * 60 * 1000);
```

## Best Practices and Recommendations

1. **Direct Database Interaction** is generally preferred because:
   - Ensures data consistency
   - Reduces complexity
   - MongoDB is already optimized for quick access
   - Prevents data synchronization issues

2. **When to Consider Caching:**
   - High-read, low-write data
   - Expensive computations
   - Rate-limited API endpoints
   - High-traffic applications

3. **When to Consider Local Storage:**
   - Offline-first applications
   - Mobile applications
   - Temporary data storage
   - Draft content

4. **Data Management Tips:**
```javascript
// Use transactions for related operations
const session = await mongoose.startSession();
session.startTransaction();

try {
    const user = await User.create([userData], { session });
    await Profile.create([profileData], { session });

    await session.commitTransaction();
} catch (err) {
    await session.abortTransaction();
    throw err;
} finally {
    session.endSession();
}

// Use proper indexing
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ createdAt: -1 });

// Implement proper error handling
const handleDatabaseOperation = async (operation) => {
    try {
        return await operation();
    } catch (err) {
        if (err.code === 11000) {
            throw new Error('Duplicate entry');
        }
        throw err;
    }
};
```

5. **Performance Optimization:**
```javascript
// Use projection to limit fields
const user = await User.findById(id).select('name email');

// Use pagination
const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);

// Use lean() for read-only operations
const users = await User.find().lean();
```

The choice between direct database interaction and local data storage often depends on your specific use case, but direct database interaction is generally the safest and most maintainable approach for most applications.