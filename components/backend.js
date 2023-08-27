const express = require('express');
const app = express();
const pg = require('pg');

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'master',
  password: 'root',
  port: 5432, // Default PostgreSQL port
});

app.get('/api/images/:cid', async (req, res) => {
  const cid = req.params.cid;

  try {
    const query = 'SELECT image_data FROM image_table WHERE cid = $1';
    const result = await pool.query(query, [cid]);
    const images = result.rows.map(row => row.image_data);

    res.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
