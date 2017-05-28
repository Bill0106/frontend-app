import keymirror = require('keymirror')

const actionTypes = keymirror({
  FETCH_LIST: null,
  FETCH_ITEM: null,
  FETCH_GAME_TROPHY: null,
  FETCH_HEARTHSTONE_MATCHES: null,
  FETCH_HEARTHSTONE_DECKS_BY_IDS: null,
})

export default actionTypes
