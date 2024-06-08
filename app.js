const cors = require('cors')
const express = require("express");
const { saveFile } = require('./save-file');

const app = express();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.json({ base: 'save-on-file ok' })
});

app.post("/save-file", async (req, res) => {
    const result = await saveFile({
      filename: req?.body?.filename || '',
      extension: req?.body?.extension || 'txt',
      content: req?.body?.content || ''
    })
    res.json({
      filename: result
    })
});

app.listen(5555, () => {
    console.log("server started on port 5555");
});
