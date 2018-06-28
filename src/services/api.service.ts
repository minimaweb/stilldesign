import { Injectable } from '@angular/core';
// const clientOAuth = require('client-oauth2');
import * as ClientOAuth2 from 'client-oauth2';

@Injectable()
export class ApiService {
  // TODO: megvalósítani az API-val való kommunikációt minden függvényben
  static accessToken = null;

  public getUsers() {
    return this.request('GET', 'http://api.iss.stilldesign.work/admin/user').then(response => response.data);
  }

  public getUser(id) {
    return this.request('GET', 'http://api.iss.stilldesign.work/admin/user/' + id).then(response => response.data);
  }

  public createUser(user) {
    return this.request('POST', 'http://api.iss.stilldesign.work/admin/user', {
      body: user,
    }).then(response => response.data);
  }

  public editUser(user) {
    return this.request('PUT', 'http://api.iss.stilldesign.work/admin/user/' + user.id, {
      body: user,
    }).then(response => response.data);
  }

  public deleteUser(id) {
    return this.request('DELETE', 'http://api.iss.stilldesign.work/admin/user/' + id).then(response => response.data);
  }

  public login(email, password) {
    const apiAuth = new ClientOAuth2({
      clientId: '2',
      clientSecret: 'Admin_Production',
      accessTokenUri: 'http://api.iss.stilldesign.work/oauth/token',
      authorizationUri: 'http://api.iss.stilldesign.work/oauth/authorize',
      redirectUri: 'http://api.iss.stilldesign.work',
      scopes: [],
    });

    // return apiAuth.owner.getToken(email, password)
    return apiAuth.owner.getToken('dev@stilldesign.hu', 'StillPass')
      .then(result => {
        ApiService.accessToken = result.accessToken;
        return true;
      })
      .catch(e => {
        return false;
      });
  }

  private request(method, url, options: any = {}) {
    return fetch(url, {
      method,
      body: JSON.stringify(options.body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ApiService.accessToken,
      },
    })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        // alert('Error during API request.');
      });
  }
}
