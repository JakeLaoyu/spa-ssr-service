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
      let elementsScript = document.querySelectorAll('script')
      for (let i = 0; i < elementsScript.length; i++) {
        elementsScript[i].parentNode.removeChild(elementsScript[i])
      }
      let elementsLink = document.querySelectorAll('link')
      for (let i = 0; i < elementsLink.length; i++) {
        elementsLink[i].parentNode.removeChild(elementsLink[i])
      }
      let elementsStyle = document.querySelectorAll('style')
      for (let i = 0; i < elementsStyle.length; i++) {
        elementsStyle[i].parentNode.removeChild(elementsStyle[i])
      }
    })
    let pageContent = await page.content()
    File.save(pageContent)
    await page.close()
    ctx.body = pageContent
  }
}

module.exports = new Spider()
