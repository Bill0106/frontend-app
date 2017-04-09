import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import { actionTypes, actionStatus, keys } from '../constants'

@Injectable()
class Services {
  private headers = new Headers({ 'auth': keys.GET })
  constructor(private http: Http) { }

  getGames(payload) {
    const params = JSON.parse(payload)
    return this.http.get(`api/games?limit=20&page=${params.page}`, { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_GAMES}_${actionStatus.FETCHED}`, payload: res.json() }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_GAMES}_${actionStatus.REJECTED}`, payload: err }) )
  }
}

export default Services
