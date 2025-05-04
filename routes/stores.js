// routes/stores.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const { tag } = req.query;

  try {
    let result;
    if (tag) {
      result = await pool.query(`
        SELECT 
          s.id, s.name, s.image_url, s.location, s.rating,
          ARRAY_AGG(t.name) AS tags
        FROM stores s
        JOIN store_tags st ON s.id = st.store_id
        JOIN tags t ON st.tag_id = t.id
        WHERE t.name = $1
        GROUP BY s.id
        ORDER BY s.id;
      `, [tag]);
    } else {
      result = await pool.query(`
        SELECT 
          s.id, s.name, s.image_url, s.location, s.rating,
          ARRAY_AGG(t.name) AS tags
        FROM stores s
        JOIN store_tags st ON s.id = st.store_id
        JOIN tags t ON st.tag_id = t.id
        GROUP BY s.id
        ORDER BY s.id;
      `);
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
