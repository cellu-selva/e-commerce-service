const errorlog = function() {
  const env = process.env.NODE_ENV
  if(env !== 'test') {
    console.log(arguments)
  }
}
class response {
	error(res, error) {
		errorlog('error occured on ' + (new Date()).toISOString())
    errorlog(error)
		if (!error) {
			error = new Error('Please try after some time')
		}
		if (!error.status) {
			error.status = 500
			console.error('SERVER ERROR: ', error)
			error.message = 'Please try after some time'
		}
		return res.status(error.status).json({ message: error.message })
	}
	send(res, status, message, data) {
		return res.status(status).json({ message, data })
	}
	success(res, data, message) {
		if (!message) {
			message = 'Operation Successful'
		}
		return res.json({ message, data })
	}
	notAuthorized(res, message) {
		if (!message) {
			message = 'Please login again'
		}
		return res.status(401).json({ message }) // 401
	}
	forbidden(res, message) {
		if (!message) {
			message = 'You\'re forbidden'
		}
		return res.status(403).json({ message })
	}
	notFound(res, message) {
		return res.status(404).json({ message })
	}
}

response = new response()
module.exports = response
