import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { ResultDisplay } from './result-display';

describe('ResultDisplay', () => {
  let component: ResultDisplay;
  let componentRef: ComponentRef<ResultDisplay>;
  let fixture: ComponentFixture<ResultDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultDisplay);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show nothing when no result', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.result-display')).toBeFalsy();
  });

  it('should show result when provided', async () => {
    componentRef.setInput('result', 'Two Pair');
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain('Two Pair');
  });

  it('should show Best Hand label', async () => {
    componentRef.setInput('result', 'Flush');
    fixture.detectChanges();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.result-label')?.textContent).toContain(
      'Best Hand',
    );
  });
});
