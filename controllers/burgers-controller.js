const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

// Get burgers
router.get("/", async function(req, res) {
    const hbsObject = { burgers: await burger.selectAll() };
    res.render("index", hbsObject);
});

router.get("/api/burgers", async function(req, res) {
    try {
        const result = await burger.selectAll();
        res.json({ burgers: result });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
})

// Create a new burger
router.post("/api/burgers", async function(req, res) {
    try {
        const result = await burger.insertOne(
            [
                "burger_name", "devoured"
            ], [
                req.body.burger_name, req.body.devoured
            ]
        );
        // Send back the ID of the new burger
        res.json({ id: result.insertId });;
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Devour a burger
router.put("/api/burgers/:id", async function(req, res) {
    const condition = "id = " + req.params.id;

    try {
        const result = await burger.updateOne({ devoured: req.body.devoured }, condition);
        if (result.changedRows == 0) {

            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a burger
router.delete("/api/burgers/:id", async function(req, res) {
    const condition = "id = " + req.params.id;

    try {
        const result = await burger.deleteOne(condition)
        if (result.affectedRows == 0) {

            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;