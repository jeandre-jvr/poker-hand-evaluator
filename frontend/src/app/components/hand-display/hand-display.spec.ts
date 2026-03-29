import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { HandDisplay } from './hand-display';

describe('HandDisplay', () => {
  let component: HandDisplay;
  let componentRef: ComponentRef<HandDisplay>;
  let fixture: ComponentFixture<HandDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(HandDisplay);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('cards', []);
    componentRef.setInput('mode', 'pick');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty message when no cards', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.empty-hand')?.textContent).toContain(
      'No cards selected',
    );
  });

  it('should render cards when provided', async () => {
    componentRef.setInput('cards', [
      { rank: 'A', suit: 'Spades' },
      { rank: 'K', suit: 'Hearts' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    const cards = fixture.nativeElement.querySelectorAll('.card');
    expect(cards.length).toBe(2);
  });

  it('should show remove button in pick mode', async () => {
    componentRef.setInput('cards', [{ rank: 'A', suit: 'Spades' }]);
    componentRef.setInput('mode', 'pick');
    fixture.detectChanges();
    await fixture.whenStable();
    const removeBtn = fixture.nativeElement.querySelector('.card-remove');
    expect(removeBtn).toBeTruthy();
  });

  it('should hide remove button in random mode', async () => {
    componentRef.setInput('cards', [{ rank: 'A', suit: 'Spades' }]);
    componentRef.setInput('mode', 'random');
    fixture.detectChanges();
    await fixture.whenStable();
    const removeBtn = fixture.nativeElement.querySelector('.card-remove');
    expect(removeBtn).toBeFalsy();
  });

  it('should show correct suit symbol', () => {
    expect(component.suitSymbol('Hearts')).toBe('♥');
    expect(component.suitSymbol('Diamonds')).toBe('♦');
    expect(component.suitSymbol('Clubs')).toBe('♣');
    expect(component.suitSymbol('Spades')).toBe('♠');
  });

  it('should identify red suits', () => {
    expect(component.isRed('Hearts')).toBe(true);
    expect(component.isRed('Diamonds')).toBe(true);
    expect(component.isRed('Clubs')).toBe(false);
    expect(component.isRed('Spades')).toBe(false);
  });

  it('should show hand count', async () => {
    componentRef.setInput('cards', [
      { rank: 'A', suit: 'Spades' },
      { rank: 'K', suit: 'Hearts' },
      { rank: '3', suit: 'Clubs' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();
    const heading = fixture.nativeElement.querySelector('h3');
    expect(heading.textContent).toContain('3/5');
  });
});
