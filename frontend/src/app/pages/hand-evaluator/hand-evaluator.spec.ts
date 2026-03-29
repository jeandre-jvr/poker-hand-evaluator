import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HandEvaluator } from './hand-evaluator';

describe('HandEvaluator', () => {
  let component: HandEvaluator;
  let fixture: ComponentFixture<HandEvaluator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandEvaluator],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(HandEvaluator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});