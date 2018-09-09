const puppeteer = require('puppeteer')

exports.index = async ctx => {
  puppeteer.launch().then(async browser => {
    const page = await browser.newPage()
    await page.goto('https://e.dxy.cn/broadcast')
    await browser.close()
  })
}
