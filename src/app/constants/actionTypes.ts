import keymirror = require('keymirror')

const actionTypes = keymirror({
  INIT_STATE: null,
  FETCH_LIST: null,
  FETCH_LIST_BY_IDS: null,
  FETCH_ITEM: null,
  FETCH_GAME_TROPHY: null,
  FETCH_HEARTHSTONE_MATCHES: null,
  FETCH_HEARTHSTONE_SEASONS_BY_MONTHS: null,
})

export default actionTypes
