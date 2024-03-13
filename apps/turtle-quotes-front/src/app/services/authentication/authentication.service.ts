import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
  SESSION_CHECK_ENDPOINT,
} from '../../../config';
import { Credentials, TurtleApiResponse, User } from '../../models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SubjectManager } from '../../utils/subject-manager.utility';
import { SessionData } from '../../models/session-data';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private authToken = new BehaviorSubject<string | undefined>(undefined);
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private sessionData = new BehaviorSubject<SessionData | undefined>(undefined);
  private isLoadingResponseManager = new SubjectManager(false);
  private static readonly TOKEN_KEY = 'TurtleAuthToken';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private httpClient: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = window.localStorage.getItem(
        AuthenticationService.TOKEN_KEY
      );
      if (token) {
        this.setAuthToken(token);
        this.initSession(token);
      }
    }
  }

  // ----------------- METHODS -----------------
  initSession(token: string) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    this.httpClient
      .get<TurtleApiResponse>(SESSION_CHECK_ENDPOINT, options)
      .pipe(
        map((response) => {
          if (response.data?.user) {
            this.setSessionData(response.data.user);
          }
          return response;
        })
      )
      .subscribe();
  }

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
          if (response.data?.token && response.data?.user) {
            this.setAuthToken(response.data.token);
            this.setSessionData(response.data.user);
          }
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
          if (response.data?.token && response.data?.user) {
            this.setAuthToken(response.data.token);
            this.setSessionData(response.data.user);
          }
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

  getAuthtokenValue(): string | undefined {
    return this.authToken.getValue();
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getIsLoadingResponse(): Observable<boolean> {
    return this.isLoadingResponseManager.getSubject();
  }

  getSessionData(): Observable<SessionData | undefined> {
    return this.sessionData.asObservable();
  }

  getUserId(): string | undefined {
    return this.sessionData.getValue()?.id;
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

  setSessionData(value: SessionData): void {
    this.sessionData.next(value);
  }
}
