import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { actionTypes, actionStatus, keys } from '../constants'

@Injectable()
class Services {
  private headers = new Headers({ 'auth': keys.GET })
  constructor(private http: Http) { }

  getList(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/${obj.state}?limit=20&page=${obj.page}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_LIST}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_LIST}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }) )
  }

  getItem(payload) {
    const obj = JSON.parse(payload)
    return this.http.get(`api/${obj.state}/${obj.params}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: obj.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_ITEM}_${actionStatus.REJECTED}`, payload: { state: obj.state, error: err.statusText } }) )
  }
}

export default Services
