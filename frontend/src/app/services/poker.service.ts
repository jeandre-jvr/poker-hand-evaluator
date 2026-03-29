import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Card {
  rank: string;
  suit: string;
}

export interface CardOptions {
  ranks: string[];
  suits: string[];
}

@Injectable({ providedIn: 'root' })
export class PokerService {
  private apiBase = environment.apiBase;

  constructor(private http: HttpClient) {}

  getCards(): Observable<CardOptions> {
    return this.http
      .get<{ success: boolean; data: CardOptions }>(`${this.apiBase}/cards/`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleError),
      );
  }

  dealHand(): Observable<Card[]> {
    return this.http
      .get<{
        success: boolean;
        data: { cards: Card[] };
      }>(`${this.apiBase}/deal/`)
      .pipe(
        map((res) => res.data.cards),
        catchError(this.handleError),
      );
  }

  evaluateHand(cards: Card[]): Observable<string> {
    return this.http
      .post<{
        success: boolean;
        data: { result: string };
      }>(`${this.apiBase}/evaluate/`, { cards })
      .pipe(
        map((res) => res.data.result),
        catchError(this.handleError),
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error?.error) {
      return throwError(() => error.error.error);
    }
    return throwError(() => 'Something went wrong. Please try again.');
  }
}
