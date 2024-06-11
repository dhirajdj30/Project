const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let inventory = { 
    "P1":20,
    "P2":30,
    "P5":6
};
let cart = {};
let discountCoupon = {
    "DEVDYNAMIC":{
        discountPercent:25,
        maxDiscountCap:250,
    },
    "DHIRAJ":{
        discountPercent:20,
        maxDiscountCap:150,
    },
    "BACKEND":{
        discountPercent:7,
        maxDiscountCap:90,
    },
    "EXPRESS":{
        discountPercent:10,
        maxDiscountCap:100,
    }
};

app.post('/inventory/add', (req, res) => {
    const { productId, quantity } = req.body;
    // Add item to inventory
    if (!inventory[productId]) {
        console.log("Add called")
        inventory[productId] = quantity;
    } else {
        inventory[productId] += quantity;
    }
    res.send('Item added to inventory successfully  ');
});

// 2. Remove item from inventory
app.post('/inventory/remove', (req, res) => {
    const { productId, quantity } = req.body;
    // Check if item exists in inventory
    if (inventory[productId]) {
        // Ensure sufficient quantity exists before removal
        if (inventory[productId] >= quantity) {
            inventory[productId] -= quantity;
            res.send('Item removed from inventory successfully');
        } else {
            res.status(400).send('Insufficient quantity in inventory');
        }
    } else {
        res.status(404).send('Item not found in inventory');
    }
});

// 3. Add item to cart
app.post('/cart/add', (req, res) => {
    const { customerId, productId, quantity } = req.body;
    // Check if item exists in inventory
    if (inventory[productId]) {
        // Ensure sufficient quantity exists in inventory
        if (inventory[productId] >= quantity) {
            // Add item to cart
            if (!cart[customerId]) {
                cart[customerId] = {};
            }
            if (!cart[customerId][productId]) {
                cart[customerId][productId] = quantity;
            } else {
                cart[customerId][productId] += quantity;
            }
            // Update inventory
            inventory[productId] -= quantity;
            res.send('Item added to cart successfully');
        } else {
            res.status(404).send('Insufficient quantity in inventory');
        }
    } else {
        res.status(404).send('Item not found in inventory');
    }
});

// 4. Apply discount coupon
app.post('/cart/discount', (req, res) => {
    const { cartValue, discountId } = req.body;
    if (discountCoupon[discountId]) {
        const Percentage = discountCoupon[discountId].discountPercent;
        const MaxCap = discountCoupon[discountId].maxDiscountCap;
        let discountedPrice = (cartValue * Percentage) / 100;
        discountedPrice = Math.min(discountedPrice, MaxCap);
        let result = cartValue - discountedPrice
        res.json({ result });
    } else {
        res.status(404).send('Discount coupon not found');
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
