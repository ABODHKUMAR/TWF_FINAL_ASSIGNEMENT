const express = require('express');
const bodyParser = require('body-parser');
const { calculateCost, totalWeightAtCenter } = require('./utils/helperfunction'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the TWF Assessment "Rest API"');
});

app.post('/calculateCost', async (req, res) => {
    try {
        const order = req.body;
        const orders = totalWeightAtCenter(order);
        const cost = await calculateCost(orders);
        res.json({ order, cost }); // Include input order and cost in the response //
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
