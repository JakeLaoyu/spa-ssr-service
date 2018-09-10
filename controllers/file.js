const fs = require('fs')
const path = require('path')
const { htmlsFolds } = require('../config')
const filepath = path.resolve(htmlsFolds, 'content.html')

if (!fs.existsSync(htmlsFolds)) {
  fs.mkdirSync(htmlsFolds)
}

exports.save = (content) => {
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath)
  }
  fs.writeFileSync(filepath, content)
}
