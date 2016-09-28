import request from 'supertest'
import appMock from './utils/app'
import etag from '../src/etag'

const plugin = etag((req, res) => {
  res.json(res.body)
})
const app = appMock()
app.get('/api', function(req, res) {
  res.body = {hello: 'world'}
  plugin(req, res)
})

describe('netiam-contrib', () => {
})
