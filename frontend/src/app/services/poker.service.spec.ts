import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PokerService } from './poker.service';
import { environment } from '../../environments/environment';

describe('PokerService', () => {
  let service: PokerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCards should return ranks and suits', () => {
    const mockResponse = {
      success: true,
      data: { ranks: ['2', '3', 'A'], suits: ['Hearts', 'Spades'] },
    };

    service.getCards().subscribe((result) => {
      expect(result.ranks).toEqual(['2', '3', 'A']);
      expect(result.suits).toEqual(['Hearts', 'Spades']);
    });

    const req = httpMock.expectOne(`${environment.apiBase}/cards/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('dealHand should return 5 cards', () => {
    const cards = [
      { rank: 'A', suit: 'Spades' },
      { rank: 'K', suit: 'Hearts' },
      { rank: '10', suit: 'Clubs' },
      { rank: '3', suit: 'Diamonds' },
      { rank: '7', suit: 'Spades' },
    ];
    const mockResponse = { success: true, data: { cards } };

    service.dealHand().subscribe((result) => {
      expect(result.length).toBe(5);
      expect(result[0].rank).toBe('A');
    });

    const req = httpMock.expectOne(`${environment.apiBase}/deal/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('evaluateHand should return hand name', () => {
    const cards = [
      { rank: 'A', suit: 'Spades' },
      { rank: 'A', suit: 'Hearts' },
      { rank: '10', suit: 'Clubs' },
      { rank: '3', suit: 'Diamonds' },
      { rank: '7', suit: 'Spades' },
    ];
    const mockResponse = { success: true, data: { result: 'One Pair' } };

    service.evaluateHand(cards).subscribe((result) => {
      expect(result).toBe('One Pair');
    });

    const req = httpMock.expectOne(`${environment.apiBase}/evaluate/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ cards });
    req.flush(mockResponse);
  });

  it('should handle API error with backend message', () => {
    service.evaluateHand([]).subscribe({
      error: (err) => {
        expect(err).toBe('A poker hand must contain exactly 5 cards.');
      },
    });

    const req = httpMock.expectOne(`${environment.apiBase}/evaluate/`);
    req.flush(
      { success: false, error: 'A poker hand must contain exactly 5 cards.' },
      { status: 400, statusText: 'Bad Request' },
    );
  });

  it('should handle network error with generic message', () => {
    service.getCards().subscribe({
      error: (err) => {
        expect(err).toBe('Something went wrong. Please try again.');
      },
    });

    const req = httpMock.expectOne(`${environment.apiBase}/cards/`);
    req.error(new ProgressEvent('error'));
  });
});
