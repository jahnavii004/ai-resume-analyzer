const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyzeRoutes = require('./routes/analyze.routes');

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/analyze", require("./routes/analyze.routes"));

app.get('/', (req, res) => {
    res.send('Resume Analyzer Backend Running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
