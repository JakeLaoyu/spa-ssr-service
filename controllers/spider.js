const puppeteer = require('puppeteer')
const File = require('./file')
const Config = require('../config')
let browser
;(async () => {
  browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  })
})()

class Spider {
  async index (ctx) {
    // console.log(ctx)
    const page = await browser.newPage()
    await page.setUserAgent(ctx.request.header['user-agent'])
    await page.goto(`${Config.site}${ctx.request.url}`)
    await page.waitFor(1000)
    await page.evaluate(() => {
      let elements = document.querySelectorAll('script')
      for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i])
      }
    })
    let pageContent = await page.content()
    File.save(pageContent)
    await page.close()
    ctx.body = pageContent
  }
}

module.exports = new Spider()
