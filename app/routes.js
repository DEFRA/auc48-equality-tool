//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

const API_BASE_URL = process.env.TOOL_API_URL

router.get('/api-test', async (req, res) => {
  try {
    const response = await fetch(`${API_BASE_URL}/databricks-test`)
    const body = await response.json()
    req.session.data.apiStatus = response.status
    req.session.data.apiResult = JSON.stringify(body, null, 2)
  } catch (e) {
    req.session.data.apiStatus = 'error'
    req.session.data.apiResult = `Could not reach API: ${e.message}`
  }
  res.redirect('/api-result')
})
