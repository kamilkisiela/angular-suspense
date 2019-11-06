import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}

  fetchRepo(repoId: string) {
    return this.getFromGitHub(`/repos/${repoId}`);
  }

  fetchRepoContribs(repoId: string) {
    return this.getFromGitHub(`/repos/${repoId}/contributors`);
  }

  fetchUser(userId: string) {
    return this.getFromGitHub(`/users/${userId}`);
  }

  fetchUserStars(userId: string) {
    return this.getFromGitHub(`/users/${userId}/starred`);
  }

  fetchUserFollowing(userId: string) {
    return this.getFromGitHub(`/users/${userId}/following`);
  }

  getFromGitHub(url: string): Observable<any> {
    return this.http.get('https://api.github.com' + url, {
      observe: 'body',
      reportProgress: false,
      responseType: 'json',
    });
  }
}
