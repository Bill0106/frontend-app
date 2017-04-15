import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { actionTypes, actionStatus, keys } from '../constants'

@Injectable()
class Services {
  private headers = new Headers({ 'auth': keys.GET })
  constructor(private http: Http) { }

  getList(payload) {
    const params = JSON.parse(payload)
    return this.http.get(`api/${params.state}?limit=20&page=${params.page}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_LIST}_${actionStatus.FETCHED}`, payload: { data: res.json(), state: params.state } }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_LIST}_${actionStatus.REJECTED}`, payload: { state: params.state, error: err.statusText } }) )
  }
}

export default Services
