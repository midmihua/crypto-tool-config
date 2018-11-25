require('dotenv-extended').load();
const express = require('express');
const bodyParser = require('body-parser');

// Init new application
const app = express();

// Setup mongodb connection
require('./utils/mongo');

// Initialize body parser
app.use(bodyParser.json());

// Initialize routes
app.use('/api/targetprice', require('./routes/ruleTargetPrice'));

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

// Start the application
app.listen(process.env.HTTP_PORT, () => {
    console.log('Server is running on port ' + process.env.HTTP_PORT);
});