import keymirror = require('keymirror')

const actionStatus = keymirror({
  PENDING: null,
  FETCHED: null,
  REJECTED: null,
})

export default actionStatus
