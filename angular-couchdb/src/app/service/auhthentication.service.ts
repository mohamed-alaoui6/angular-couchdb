import { Injectable } from '@angular/core';
import { Appuser } from '../model/user.model';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { CouchDBResponse } from '../model/couchdb-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuhthenticationService {
  private dbUrl = 'http://127.0.0.1:5984/user'; // Replace with your CouchDB URL
  authenticateduser: Appuser | undefined;

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<Appuser> {
    return this.http.get<CouchDBResponse<Appuser>>(`${this.dbUrl}/_all_docs?include_docs=true`).pipe(
      map(response => {
        const users = response.rows.map(row => row.doc);
        const appuser = users.find(u => u.username === username);
        if (!appuser) throw new Error("user not found");
        if (appuser.password !== password) {
          throw new Error("incorrect password");
        }
        return appuser;
      }),
      catchError(error => throwError(() => new Error("login failed")))
    );
  }

  public register(user: Appuser): Observable<Appuser> {
    return this.http.post<Appuser>(this.dbUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(error => throwError(() => new Error("registration failed")))
    );
  }

  public authenticatuser(appuser: Appuser): Observable<boolean> {
    this.authenticateduser = appuser;
    localStorage.setItem("authuser", JSON.stringify({ username: appuser.username, roles: appuser.role, jwt: "jwt_token" }));
    return of(true);
  }

  public hasrole(role: string): boolean {
    return this.authenticateduser!.role.includes(role);
  }

  public isauthenticated(): boolean {
    return this.authenticateduser !== undefined;
  }

  public logout(): Observable<boolean> {
    this.authenticateduser = undefined;
    localStorage.removeItem("authuser");
    return of(true);
  }
}
