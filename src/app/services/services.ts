import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Observable } from 'rxjs'
import Keys from '../constants/keys'
import actionTypes from '../constants/actionTypes'
import actionStatus from '../constants/actionStatus'

@Injectable()
class Services {
  private headers = new Headers({ 'auth': Keys.GET })
  constructor(private http: Http) { }

  getGames(payload) {
    console.log(payload)
    return this.http.get('api/games', { headers: this.headers })
      .map(res => ({ type: `${actionTypes.FETCH_GAMES}_${actionStatus.FETCHED}`, payload: res.json() }))
      .catch(err => Observable.of({ type: `${actionTypes.FETCH_GAMES}_${actionStatus.REJECTED}`, payload: err }) )
  }
}

export default Services
