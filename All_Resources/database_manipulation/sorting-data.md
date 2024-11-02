```js
const inventoryData = [
  {
    item: "apple",
    food_group: "fruits",
    price_in_usd: 0.3,
    quantity: 100,
    calories_per_100g: 52,
  },
  // ... rest of the data array
];

// 1. Sort by price (lowest to highest)
const sortByPrice = (data) => {
  return [...data].sort((a, b) => a.price_in_usd - b.price_in_usd);
};

// Example usage:
const priceSort = sortByPrice(inventoryData);
console.log(
  "Sorted by price:",
  priceSort.map((item) => `${item.item}: $${item.price_in_usd}`)
);

// 2. Sort by item name (alphabetically)
const sortByName = (data) => {
  return [...data].sort((a, b) => a.item.localeCompare(b.item));
};

// Example usage:
const nameSort = sortByName(inventoryData);
console.log(
  "Sorted by name:",
  nameSort.map((item) => item.item)
);

// 3. Sort by quantity (highest to lowest)
const sortByQuantity = (data) => {
  return [...data].sort((a, b) => b.quantity - a.quantity);
};

// Example usage:
const quantitySort = sortByQuantity(inventoryData);
console.log(
  "Sorted by quantity:",
  quantitySort.map((item) => `${item.item}: ${item.quantity}`)
);

// 4. Calculate total value of inventory
const calculateTotalValue = (data) => {
  const total = data.reduce((sum, item) => {
    const itemTotal = item.price_in_usd * item.quantity;
    return sum + itemTotal;
  }, 0);
  return total.toFixed(2); // Round to 2 decimal places
};

// Example usage:
const totalValue = calculateTotalValue(inventoryData);
console.log("Total inventory value: $" + totalValue);

// 5. Calculate average price per item
const calculateAveragePrice = (data) => {
  const total = data.reduce((sum, item) => sum + item.price_in_usd, 0);
  const average = total / data.length;
  return average.toFixed(2); // Round to 2 decimal places
};

// Example usage:
const averagePrice = calculateAveragePrice(inventoryData);
console.log("Average price per item: $" + averagePrice);

// Bonus: Get price statistics
const getPriceStatistics = (data) => {
  const prices = data.map((item) => item.price_in_usd);
  return {
    lowest: Math.min(...prices),
    highest: Math.max(...prices),
    average: calculateAveragePrice(data),
    totalItems: data.length,
  };
};

// Example usage with all functions:
console.log("\n--- Inventory Analysis ---");
console.log(
  "Most expensive items:",
  sortByPrice(inventoryData)
    .reverse()
    .slice(0, 3)
    .map((item) => `${item.item}: $${item.price_in_usd}`)
);

console.log(
  "Items with highest quantity:",
  sortByQuantity(inventoryData)
    .slice(0, 3)
    .map((item) => `${item.item}: ${item.quantity}`)
);

console.log("Price Statistics:", getPriceStatistics(inventoryData));
```
