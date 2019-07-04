const request = async (path, method, body = null) => {
  const token = window.localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token
  }

  const options = { method, headers, body }

  try {
    const root = process.env.REACT_APP_SERVER_LOCATION // server location
    const res = await window.fetch(root + path, options)
    const response = { error: true, message: '', body: {} }
    switch (res.status) {
      case 200:
        if (res.headers.get('content-type') && res.headers.get('content-type').includes('json')) {
          response.body = await res.json()
        }
        response.error = false
        break
      case 400:
        response.body = await res.json()
        response.message = response.body.message
        break
      case 401:
        response.body = await res.json()
        response.message = response.body.message
        break
      case 403:
        response.message = 'Acess Denied!'
        break

      case 404:
        response.message = 'Not Found'
        break
      default:
        response.message = 'An error occured, please contact support!'
    }
    return response
  } catch (err) {
    console.log(err)
    return { error: true, message: 'An error occured, please contact support!' }
  }
}

export { request }
