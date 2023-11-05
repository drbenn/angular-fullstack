import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    });

    app = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});