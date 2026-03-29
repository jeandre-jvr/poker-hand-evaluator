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
    componentRef.setInput('cardOptions', { ranks: [], suits: [] });
    componentRef.setInput('mode', 'pick');
    componentRef.setInput('handFull', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});