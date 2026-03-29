import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HandEvaluator } from './hand-evaluator';

describe('HandEvaluator', () => {
  let component: HandEvaluator;
  let fixture: ComponentFixture<HandEvaluator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandEvaluator],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(HandEvaluator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with empty hand', () => {
    expect(component.hand()).toEqual([]);
    expect(component.handFull()).toBe(false);
  });

  it('should add a card to the hand', () => {
    component.addCard({ rank: 'A', suit: 'Spades' });
    expect(component.hand().length).toBe(1);
    expect(component.hand()[0]).toEqual({ rank: 'A', suit: 'Spades' });
  });

  it('should not add duplicate card', () => {
    component.addCard({ rank: 'A', suit: 'Spades' });
    component.addCard({ rank: 'A', suit: 'Spades' });
    expect(component.hand().length).toBe(1);
    expect(component.pickerError()).toContain('already in your hand');
  });

  it('should remove a card by index', () => {
    component.addCard({ rank: 'A', suit: 'Spades' });
    component.addCard({ rank: 'K', suit: 'Hearts' });
    component.removeCard(0);
    expect(component.hand().length).toBe(1);
    expect(component.hand()[0].rank).toBe('K');
  });

  it('should report hand full at 5 cards', () => {
    component.addCard({ rank: 'A', suit: 'Spades' });
    component.addCard({ rank: 'K', suit: 'Hearts' });
    component.addCard({ rank: '10', suit: 'Clubs' });
    component.addCard({ rank: '3', suit: 'Diamonds' });
    component.addCard({ rank: '7', suit: 'Spades' });
    expect(component.handFull()).toBe(true);
  });

  it('should not add more than 5 cards', () => {
    component.addCard({ rank: 'A', suit: 'Spades' });
    component.addCard({ rank: 'K', suit: 'Hearts' });
    component.addCard({ rank: '10', suit: 'Clubs' });
    component.addCard({ rank: '3', suit: 'Diamonds' });
    component.addCard({ rank: '7', suit: 'Spades' });
    component.addCard({ rank: '2', suit: 'Spades' });
    expect(component.hand().length).toBe(5);
  });

  it('should clear hand when switching modes', () => {
    component.addCard({ rank: 'A', suit: 'Spades' });
    component.switchMode('random');
    expect(component.hand()).toEqual([]);
    expect(component.mode()).toBe('random');
  });

  it('should clear result when switching modes', () => {
    component.result.set('Two Pair');
    component.switchMode('random');
    expect(component.result()).toBe('');
  });

  it('should clear result when removing a card', () => {
    component.addCard({ rank: 'A', suit: 'Spades' });
    component.result.set('High Card');
    component.removeCard(0);
    expect(component.result()).toBe('');
  });
});
