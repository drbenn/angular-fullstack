// import { AppComponent } from './app.component';
// import { TestBed } from '@angular/core/testing';

// describe('AppComponent', () => {
//   let app: AppComponent;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppComponent]
//     });

//     app = TestBed.createComponent(AppComponent).componentInstance;
//   });

//   it('should create the app', () => {
//     expect(app).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // myService = TestBed.inject(MyService);
    fixture.detectChanges();
  });

  // it('should call the MyService\'s getData method', () => {
  //   spyOn(myService, 'getData').and.returnValue(Promise.resolve('Data from MyService'));
  //   component.getData();
  //   expect(myService.getData).toHaveBeenCalled();
  // });
});