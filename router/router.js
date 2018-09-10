const Router = require('koa-router')
const AppRouter = new Router()

const spider = require('../controllers/spider')

AppRouter.get('/broadcast/*', spider.index)

module.exports = AppRouter
