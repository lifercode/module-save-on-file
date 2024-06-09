const fs = require('fs/promises')

const saveFile = async ({
  filename,
  extension,
  content
}) => {
  try {
    await fs.writeFile(`${process.env.DRIVE_PATH}/files/${filename}.${extension}`, content);
    return `${filename}.${extension}`
  } catch (error) {
    console.error(error?.message)
  }
}

module.exports = { saveFile }