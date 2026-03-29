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
});