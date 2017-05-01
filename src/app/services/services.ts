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
  }

  constructor(private http: Http) { }

  getList(payload) {
    const obj = JSON.parse(payload)
    const limit = obj.limit ? obj.limit : 20
    return this.http.get(`api/${this.mapping[obj.state]}?limit=${limit}&page=${obj.page}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_LIST}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_LIST}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }) )
  }

  getItem(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/${this.mapping[obj.state]}/${obj.params}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }) )
  }

  getGameTrophy(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/games/${obj.params}/trophy`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }) )
  }
}

export default Services
