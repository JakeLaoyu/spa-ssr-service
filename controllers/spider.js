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
    // await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
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