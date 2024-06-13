require('dotenv').config()
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
  try {
    const execNode = req?.body?.execNodeId
    const drive = req?.body?.driveId
    const owner = req?.body?.userId
    const inputsData = req?.body?.inputsData
  
    const filename = inputsData?.filename || ''
    const extension = inputsData?.extension || 'txt'
    const content = inputsData?.content || ''
    const name = `${filename}.${extension}`
  
    const result = await saveFile({ filename, extension, content })

    const payload = { execNode, drive, owner, name, filename, extension }
  
    const resultNodes = await fetch(`${process.env.API_URL}/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    const resultJsonNodes = await resultNodes?.json()

    res.json({ resultJsonNodes, filename: result })
  } catch (error) {
    res.status(500).json({ error })
  }
});

app.listen(5555, () => {
  console.log("server started on port 5555");
});
