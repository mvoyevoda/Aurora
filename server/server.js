const express = require('express');
const app = express();
const PORT = 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
  res.send("Aurora")
})