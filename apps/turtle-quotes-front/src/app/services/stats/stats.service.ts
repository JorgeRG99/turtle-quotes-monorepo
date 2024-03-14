import { BehaviorSubject, Observable, Subject, takeUntil, timer } from 'rxjs';
import { StatsObject, TurtleApiResponse } from '../../models';
import { AuthenticationService } from '../authentication/authentication.service';
import { RANK_ROUND_ENDPOINT } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatsApiResponse } from '../../models/stast-api';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private timerStop$ = new Subject<number>();
  private timer$ = new BehaviorSubject<number>(0);
  private totalWordsNumber$ = new Subject<number>();
  private completedWords$ = new BehaviorSubject<number>(0);
  private totalWords: string[] = [];
  private rightQuote$!: Observable<string>;
  private rankingApiResult = new BehaviorSubject<StatsApiResponse[]>([]);
  private resultStats = new BehaviorSubject<StatsObject>({
    wpm: 0,
    accuracy: 0,
    totalTime: 0,
    totalErrors: 0,
    totalChars: 0,
    errorRate: 0,
  });
  
  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  // ----------------- METHODS -----------------
  start(): void {
    timer(0, 1000)
      .pipe(takeUntil(this.timerStop$))
      .subscribe((val: number) => this.timer$.next(val));
  }

  stop(): void {
    this.timerStop$.next(0);
    this.timerStop$.complete();
  }

  generateStats(
    totalCharsTyped: number,
    totalErrors: number,
    totalSuccesses: number
  ): void {
    const roundStats = {
      wpm: Math.round((totalCharsTyped / 5 / this.timer$.value) * 60),
      accuracy: parseInt(((totalSuccesses / totalCharsTyped) * 100).toFixed(2)),
      totalTime: this.timer$.value,
      totalErrors: totalErrors,
      totalChars: totalCharsTyped,
      errorRate: parseInt(((totalErrors / totalCharsTyped) * 100).toFixed(2)),
    };
    this.resultStats.next(roundStats);

    this.rankRound({
      wpm: roundStats.wpm,
      time: roundStats.totalTime,
      totalErrors: roundStats.totalErrors,
      accuracy: roundStats.accuracy,
      errorRate: roundStats.errorRate,
      gameModeId: '27c9cf7e-d817-4fd7-bae5-2bd50eada782',
      userId: this.authenticationService.getUserId(),
    });
  }

  rankRound(roundStats: any): void {
    const options = {
      headers: {
        Authorization: `Bearer ${this.authenticationService.getAuthtokenValue()}`,
      },
    };

    this.httpClient
      .post<TurtleApiResponse>(RANK_ROUND_ENDPOINT, roundStats, options)
      .subscribe(
        (response) => {
          if (!response.error && response.data?.stats) {
            console.log(response.data.stats);
            this.setRankingApiResult(response.data.stats);
          }
        },
      );
  }

  resetStatsService() {
    this.timer$.next(0);
    this.totalWordsNumber$.next(0);
    this.completedWords$.next(0);
    this.resultStats.next({
      wpm: 0,
      accuracy: 0,
      totalTime: 0,
      totalErrors: 0,
      totalChars: 0,
      errorRate: 0,
    });
    this.setRankingApiResult([]);
    this.timerStop$ = new Subject<number>();
    this.totalWords = [];
  }

  // ----------------- GETTERS -----------------
  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }

  getTotalWords(): Observable<number> {
    return this.totalWordsNumber$.asObservable();
  }

  getCompletedWords(): Observable<number> {
    return this.completedWords$.asObservable();
  }

  getResults(): Observable<StatsObject> {
    return this.resultStats.asObservable();
  }

  getApiRankingResult(): Observable<StatsApiResponse[]> {
    return this.rankingApiResult.asObservable();
  }

  // ----------------- SETTERS -----------------
  setQuoteData(value: string[], rightString$: Observable<string>): void {
    this.totalWordsNumber$.next(value.length);
    this.totalWords = value;
    this.rightQuote$ = rightString$;

    this.rightQuote$.subscribe((newValue: string) => {
      this.completedWords$.next(
        newValue.split(' ').filter((word) => this.totalWords.includes(word))
          .length
      );
    });
  }

  setRankingApiResult(result: StatsApiResponse[]): void {
    this.rankingApiResult.next(result);
  }
}
