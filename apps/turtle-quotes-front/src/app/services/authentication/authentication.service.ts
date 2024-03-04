import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
} from '../../../config';
import { Credentials, TurtleApiResponse, User } from '../../models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SubjectManager } from '../../utils/subject-manager.utility';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authToken = new BehaviorSubject<string | undefined>(undefined);
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private isLoadingResponseManager = new SubjectManager(false);
  private httpClient = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const token = window.localStorage.getItem('TurtleAuthToken');
      if (token) this.setAuthToken(token);
    }
  }

  // ----------------- METHODS -----------------
  register(userData: User): Observable<TurtleApiResponse> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.httpClient
      .post<TurtleApiResponse>(REGISTER_ENDPOINT, userData, options)
      .pipe(
        map((response) => {
          //if (response.data?.token) this.setAuthToken(response.data.token);
          return response;
        })
      );
  }

  login(credentials: Credentials): Observable<TurtleApiResponse> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return this.httpClient
      .post<TurtleApiResponse>(LOGIN_ENDPOINT, credentials, options)
      .pipe(
        map((response) => {
          if (response.data?.token) this.setAuthToken(response.data.token);
          return response;
        })
      );
  }

  logout() {
    const options = {
      headers: {
        Authorization: `Bearer ${this.authToken.getValue()}`,
      },
    };

    this.httpClient
      .post<TurtleApiResponse>(LOGOUT_ENDPOINT, {}, options)
      .subscribe((response) => {
        if (!response.error) this.unsetAuthToken();
      });
  }

  // ----------------- GETTERS -----------------
  getAuthToken(): Observable<string | undefined> {
    return this.authToken.asObservable();
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getIsLoadingResponse(): Observable<boolean> {
    return this.isLoadingResponseManager.getSubject();
  }

  // ----------------- SETTERS -----------------
  setAuthToken(token: string) {
    this.authToken.next(token);
    this.isAuthenticated.next(true);

    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('TurtleAuthToken', token);
    }
  }

  unsetAuthToken() {
    this.authToken.next(undefined);
    this.isAuthenticated.next(false);

    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.removeItem('TurtleAuthToken');
    }
  }

  setItsLoadingResponse(value: boolean) {
    this.isLoadingResponseManager.setSubject(value);
  }
}
