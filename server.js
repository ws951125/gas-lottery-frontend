const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const GAS_URL = 'https://script.google.com/macros/s/AKfycbwbv9MHv1n1ak0y-xKtBvZ9Kw4pDswopt35NADDa5g5c2d8NWxOTl-q_qSDcxypW-HHkA/exec';

app.post('/api/gas', async (req, res) => {
  try {
    const gasRes = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await gasRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
