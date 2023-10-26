const express = require('express');
const router = express.Router();
const { SuperCategory, validate } = require("../models/superCategory");
const bcrypt = require("bcrypt");

router.post('/super-categories-add', async (req, res) => {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Create a new super category
    const superCategory = new SuperCategory({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        status: req.body.status,
    });

    // Save the super category to the database
    await superCategory.save();

    res.status(201).send(superCategory);
});

module.exports = router;