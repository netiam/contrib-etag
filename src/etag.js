import crypto from 'crypto'

function hash(str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex')
}

export default function etag({hashFunction = hash} = {}) {

  return function(req, res) {
    if (res.body) {
      const data = JSON.stringify(res.body)
      const tag = hashFunction(data)

      if (req.get('If-None-Match')) {
        const match = req.get('If-None-Match')
        if (match === tag) {
          res
            .status(304)
            .send()

          const err = new Error()
          err.nonce = true

          return Promise.reject(err)
        }
      }

      res.set('Etag', tag)
    }
  }

}
