import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { actionTypes, actionStatus, keys } from '../constants'

@Injectable()
class Services {
  private headers = new Headers({ 'auth': keys.GET })
  private mapping = {
    'games': 'games',
    'gourmets': 'gourmets',
    'hearthstoneSeasons': 'hearthstone-seasons',
    'hearthstoneDecks': 'hearthstone-decks',
    'hearthstoneCards': 'hearthstone-cards',
  }

  constructor(private http: Http) { }

  getList(payload) {
    const obj = JSON.parse(payload)
    const limit = obj.limit ? obj.limit : 20
    return this.http.get(`api/${this.mapping[obj.state]}?limit=${limit}&page=${obj.page}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_LIST}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_LIST}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }))
  }

  getListByIds(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/${this.mapping[obj.state]}?ids=${obj.ids}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_LIST_BY_IDS}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_LIST_BY_IDS}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }))
  }

  getItem(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/${this.mapping[obj.state]}/${obj.params}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }))
  }

  getGameTrophy(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/games/${obj.params}/trophy`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }))
  }

  getHearthstoneMatches(payload) {
    const obj = JSON.parse(payload)
    let uri = 'api/hearthstone-matches'

    if (obj.hasOwnProperty('season') && obj.season) {
      uri = `${uri}?season=${obj.season}`
    }

    if (obj.hasOwnProperty('deck') && obj.deck) {
      uri = `${uri}?deck=${obj.deck}`
    }

    return this.http.get(uri, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_HEARTHSTONE_MATCHES}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_HEARTHSTONE_MATCHES}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }))
  }

  getHearthstoneSeasonsByMonths(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/hearthstone-seasons?months=${obj.months}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_HEARTHSTONE_SEASONS_BY_MONTHS}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_HEARTHSTONE_SEASONS_BY_MONTHS}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }))
  }
}

export default Services
