import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { CardPicker } from './card-picker';

describe('CardPicker', () => {
  let component: CardPicker;
  let componentRef: ComponentRef<CardPicker>;
  let fixture: ComponentFixture<CardPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPicker);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('cardOptions', {
      ranks: ['2', '3', 'A'],
      suits: ['Hearts', 'Spades'],
    });
    componentRef.setInput('mode', 'pick');
    componentRef.setInput('handFull', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit modeChange when mode is switched', () => {
    const spy = vi.spyOn(component.modeChange, 'emit');
    component.onModeChange('random');
    expect(spy).toHaveBeenCalledWith('random');
  });

  it('should emit addCard with selected rank and suit', () => {
    const spy = vi.spyOn(component.addCard, 'emit');
    component.selectedRank.set('A');
    component.selectedSuit.set('Spades');
    component.onAddCard();
    expect(spy).toHaveBeenCalledWith({ rank: 'A', suit: 'Spades' });
  });

  it('should clear selections after adding a card', () => {
    component.selectedRank.set('A');
    component.selectedSuit.set('Spades');
    component.onAddCard();
    expect(component.selectedRank()).toBe('');
    expect(component.selectedSuit()).toBe('');
  });

  it('should not emit addCard when rank is missing', () => {
    const spy = vi.spyOn(component.addCard, 'emit');
    component.selectedSuit.set('Spades');
    component.onAddCard();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not allow adding when hand is full', () => {
    componentRef.setInput('handFull', true);
    component.selectedRank.set('A');
    component.selectedSuit.set('Spades');
    expect(component.canAdd()).toBe(false);
  });

  it('should emit dealHand when deal is clicked', () => {
    const spy = vi.spyOn(component.dealHand, 'emit');
    component.onDeal();
    expect(spy).toHaveBeenCalled();
  });

  it('should clear selections when mode changes', () => {
    component.selectedRank.set('A');
    component.selectedSuit.set('Spades');
    component.onModeChange('random');
    expect(component.selectedRank()).toBe('');
    expect(component.selectedSuit()).toBe('');
  });
});
