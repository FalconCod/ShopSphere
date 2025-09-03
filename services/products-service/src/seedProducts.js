const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = 'mongodb+srv://pranaycursor:pranay@cluster0.8ir3qb9.mongodb.net/products-db?retryWrites=true&w=majority&appName=Cluster0';

const products = [
  // Clothing - Men
  {
    name: 'Classic Cotton T-Shirt',
    description: 'Premium quality 100% cotton t-shirt for everyday comfort. Perfect fit and soft fabric.',
    price: 799,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    name: 'Denim Jeans - Slim Fit',
    description: 'Classic blue denim jeans with modern slim fit. Durable and stylish.',
    price: 2499,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
  },
  {
    name: 'Formal Button-Down Shirt',
    description: 'Crisp white formal shirt perfect for office wear and formal occasions.',
    price: 1599,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'
  },
  {
    name: 'Casual Hoodie',
    description: 'Warm and comfortable hoodie perfect for casual outings and relaxation.',
    price: 1999,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop'
  },
  {
    name: 'Sports Track Pants',
    description: 'Comfortable track pants ideal for workouts and sports activities.',
    price: 1299,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'
  },
  {
    name: 'Leather Jacket',
    description: 'Premium genuine leather jacket for a stylish and edgy look.',
    price: 8999,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop'
  },
  {
    name: 'Polo Shirt',
    description: 'Classic polo shirt in navy blue, perfect for semi-formal occasions.',
    price: 1199,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop'
  },
  {
    name: 'Cargo Shorts',
    description: 'Utility cargo shorts with multiple pockets, perfect for summer.',
    price: 999,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop'
  },
  {
    name: 'Business Suit',
    description: 'Complete two-piece business suit in charcoal gray. Professional and elegant.',
    price: 12999,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    name: 'Winter Sweater',
    description: 'Warm wool blend sweater perfect for cold weather. Available in multiple colors.',
    price: 2799,
    category: 'Clothing',
    subCategory: 'Male',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop'
  },

  // Clothing - Women
  {
    name: 'Elegant Summer Dress',
    description: 'Beautiful floral summer dress perfect for casual outings and parties.',
    price: 2199,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop'
  },
  {
    name: 'High-Waisted Jeans',
    description: 'Trendy high-waisted jeans that perfectly contour your figure.',
    price: 2799,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop'
  },
  {
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse perfect for professional and formal occasions.',
    price: 3499,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop'
  },
  {
    name: 'Cozy Cardigan',
    description: 'Soft and warm cardigan perfect for layering during cooler weather.',
    price: 2499,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop'
  },
  {
    name: 'Yoga Leggings',
    description: 'High-performance yoga leggings with moisture-wicking fabric.',
    price: 1599,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1506629905607-c28b88a4da62?w=400&h=400&fit=crop'
  },
  {
    name: 'Little Black Dress',
    description: 'Classic little black dress - a timeless wardrobe essential.',
    price: 4999,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1566479179817-c81f169eb85f?w=400&h=400&fit=crop'
  },
  {
    name: 'Denim Jacket',
    description: 'Classic denim jacket that goes with everything. Vintage-inspired design.',
    price: 3299,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop'
  },
  {
    name: 'Maxi Skirt',
    description: 'Flowing maxi skirt perfect for summer days and evening events.',
    price: 1899,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d24?w=400&h=400&fit=crop'
  },
  {
    name: 'Cashmere Scarf',
    description: 'Luxurious cashmere scarf available in multiple colors. Perfect accessory.',
    price: 4599,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop'
  },
  {
    name: 'Activewear Set',
    description: 'Complete activewear set including sports bra and leggings.',
    price: 3599,
    category: 'Clothing',
    subCategory: 'Female',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop'
  },

  // Electronics
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
    price: 134900,
    category: 'Electronics',
    subCategory: 'Smartphone',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1592286130874-4a7e0e5ec8cd?w=400&h=400&fit=crop'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen, 200MP camera, and AI features.',
    price: 129999,
    category: 'Electronics',
    subCategory: 'Smartphone',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop'
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'Powerful tablet with M2 chip, Liquid Retina XDR display, perfect for creativity.',
    price: 112900,
    category: 'Electronics',
    subCategory: 'Tablet',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling wireless headphones with premium sound.',
    price: 29990,
    category: 'Electronics',
    subCategory: 'Audio',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=400&h=400&fit=crop'
  },
  {
    name: 'Nintendo Switch OLED',
    description: 'Gaming console with vibrant OLED screen and enhanced audio.',
    price: 37980,
    category: 'Electronics',
    subCategory: 'Gaming',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop'
  },
  {
    name: 'Canon EOS R6 Mark II',
    description: 'Professional mirrorless camera with 24.2MP full-frame sensor.',
    price: 219999,
    category: 'Electronics',
    subCategory: 'Camera',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop'
  },
  {
    name: 'DJI Mini 3 Pro',
    description: 'Compact drone with 4K HDR video, intelligent flight modes, and obstacle sensing.',
    price: 89900,
    category: 'Electronics',
    subCategory: 'Drone',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop'
  },
  {
    name: 'AirPods Pro 2nd Gen',
    description: 'Premium wireless earbuds with adaptive transparency and spatial audio.',
    price: 26900,
    category: 'Electronics',
    subCategory: 'Audio',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop'
  },
  {
    name: 'PlayStation 5',
    description: 'Next-gen gaming console with ultra-high speed SSD and ray tracing.',
    price: 54990,
    category: 'Electronics',
    subCategory: 'Gaming',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop'
  },
  {
    name: 'GoPro Hero 12 Black',
    description: 'Ultimate action camera with 5.3K video, enhanced stabilization, and rugged design.',
    price: 44500,
    category: 'Electronics',
    subCategory: 'Camera',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop'
  },

  // Laptops
  {
    name: 'MacBook Pro 16" M3 Max',
    description: 'Ultimate professional laptop with M3 Max chip, 18-core GPU, perfect for creators.',
    price: 399900,
    category: 'Laptops',
    subCategory: 'Professional',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
  },
  {
    name: 'Dell XPS 13 Plus',
    description: 'Premium ultrabook with Intel 13th gen processor and stunning InfinityEdge display.',
    price: 149990,
    category: 'Laptops',
    subCategory: 'Ultrabook',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'
  },
  {
    name: 'ASUS ROG Strix G15',
    description: 'High-performance gaming laptop with RTX 4070, AMD Ryzen 9, 165Hz display.',
    price: 179999,
    category: 'Laptops',
    subCategory: 'Gaming',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop'
  },
  {
    name: 'ThinkPad X1 Carbon',
    description: 'Business ultrabook with military-grade durability and enterprise security.',
    price: 189990,
    category: 'Laptops',
    subCategory: 'Business',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'
  },
  {
    name: 'HP Spectre x360',
    description: 'Convertible laptop with 360-degree hinge, OLED display, and premium design.',
    price: 164990,
    category: 'Laptops',
    subCategory: 'Convertible',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'
  },
  {
    name: 'MacBook Air M2',
    description: 'Lightweight laptop with M2 chip, all-day battery life, perfect for students.',
    price: 119900,
    category: 'Laptops',
    subCategory: 'Student',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'
  },
  {
    name: 'MSI Creator Z16P',
    description: 'Content creator laptop with RTX 4080, 4K touchscreen, color-accurate display.',
    price: 329999,
    category: 'Laptops',
    subCategory: 'Creator',
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop'
  },
  {
    name: 'Acer Swift 3',
    description: 'Budget-friendly laptop with AMD Ryzen 7, full HD display, ideal for everyday use.',
    price: 54990,
    category: 'Laptops',
    subCategory: 'Budget',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'
  },
  {
    name: 'Surface Laptop Studio',
    description: 'Microsoft laptop with unique pull-forward touchscreen and Surface Pen support.',
    price: 219990,
    category: 'Laptops',
    subCategory: 'Creative',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
  },
  {
    name: 'Chromebook Pixel',
    description: 'Google Chromebook with premium build, perfect for cloud-based work.',
    price: 89990,
    category: 'Laptops',
    subCategory: 'Chromebook',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'
  },

  // Smart Devices
  {
    name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring, GPS, and cellular connectivity.',
    price: 45900,
    category: 'Smart Devices',
    subCategory: 'Smartwatch',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop'
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description: 'Android smartwatch with health tracking, sleep monitoring, and long battery life.',
    price: 32990,
    category: 'Smart Devices',
    subCategory: 'Smartwatch',
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop'
  },
  {
    name: 'Amazon Echo Dot 5th Gen',
    description: 'Smart speaker with Alexa, improved sound quality, and smart home integration.',
    price: 5499,
    category: 'Smart Devices',
    subCategory: 'Smart Speaker',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop'
  },
  {
    name: 'Google Nest Hub Max',
    description: 'Smart display with Google Assistant, camera, and home automation controls.',
    price: 22900,
    category: 'Smart Devices',
    subCategory: 'Smart Display',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  },
  {
    name: 'Ring Video Doorbell Pro',
    description: 'Smart doorbell with 1080p video, motion detection, and two-way audio.',
    price: 24900,
    category: 'Smart Devices',
    subCategory: 'Security',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  },
  {
    name: 'Philips Hue Smart Bulbs',
    description: 'Color-changing smart LED bulbs with app control and voice activation.',
    price: 8999,
    category: 'Smart Devices',
    subCategory: 'Smart Lighting',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  },
  {
    name: 'Tesla Model Y Charging Station',
    description: 'Home EV charging station compatible with Tesla and other electric vehicles.',
    price: 89990,
    category: 'Smart Devices',
    subCategory: 'EV Charging',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  },
  {
    name: 'Fitbit Charge 6',
    description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
    price: 19990,
    category: 'Smart Devices',
    subCategory: 'Fitness Tracker',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop'
  },
  {
    name: 'Roomba i7+ Robot Vacuum',
    description: 'Smart robot vacuum with automatic dirt disposal and mapping technology.',
    price: 74990,
    category: 'Smart Devices',
    subCategory: 'Robot Vacuum',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  },
  {
    name: 'Nest Learning Thermostat',
    description: 'Smart thermostat that learns your schedule and saves energy automatically.',
    price: 26900,
    category: 'Smart Devices',
    subCategory: 'Smart Home',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  },

  // Audio
  {
    name: 'Bose QuietComfort 45',
    description: 'Premium noise-canceling headphones with world-class quiet and balanced sound.',
    price: 32900,
    category: 'Audio',
    subCategory: 'Headphones',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=400&h=400&fit=crop'
  },
  {
    name: 'JBL Flip 6 Portable Speaker',
    description: 'Waterproof portable Bluetooth speaker with powerful JBL Original Pro Sound.',
    price: 12999,
    category: 'Audio',
    subCategory: 'Speakers',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
  },
  {
    name: 'Sennheiser HD 660S2',
    description: 'Open-back audiophile headphones with natural, detailed sound reproduction.',
    price: 59990,
    category: 'Audio',
    subCategory: 'Audiophile',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=400&h=400&fit=crop'
  },
  {
    name: 'Sonos One SL Smart Speaker',
    description: 'Compact smart speaker with rich, room-filling sound and Alexa built-in.',
    price: 19990,
    category: 'Audio',
    subCategory: 'Smart Speaker',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
  },
  {
    name: 'Audio-Technica AT2020USB+',
    description: 'Professional USB microphone perfect for podcasting and home recording.',
    price: 16900,
    category: 'Audio',
    subCategory: 'Microphone',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop'
  },

  // Home & Living
  {
    name: 'Dyson V15 Detect Vacuum',
    description: 'Cordless vacuum with laser dust detection and powerful suction.',
    price: 74990,
    category: 'Home & Living',
    subCategory: 'Appliances',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  },
  {
    name: 'KitchenAid Stand Mixer',
    description: 'Professional stand mixer perfect for baking and cooking enthusiasts.',
    price: 45990,
    category: 'Home & Living',
    subCategory: 'Kitchen',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1585909526002-63f52a5e7eac?w=400&h=400&fit=crop'
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Multi-functional pressure cooker that replaces 7 kitchen appliances.',
    price: 12990,
    category: 'Home & Living',
    subCategory: 'Kitchen',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1585909526002-63f52a5e7eac?w=400&h=400&fit=crop'
  },
  {
    name: 'Egyptian Cotton Bed Sheets',
    description: 'Luxury 1000-thread count Egyptian cotton bed sheets for ultimate comfort.',
    price: 8999,
    category: 'Home & Living',
    subCategory: 'Bedding',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=400&fit=crop'
  },
  {
    name: 'Smart Air Purifier',
    description: 'HEPA air purifier with app control and air quality monitoring.',
    price: 34990,
    category: 'Home & Living',
    subCategory: 'Appliances',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8ad9c2461f?w=400&h=400&fit=crop'
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    console.log('Products seeded by category:');
    const categories = [...new Set(products.map(p => p.category))];
    for (const category of categories) {
      const count = products.filter(p => p.category === category).length;
      console.log(`- ${category}: ${count} products`);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
