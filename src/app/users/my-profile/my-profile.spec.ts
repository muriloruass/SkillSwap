import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MyProfile } from './my-profile';

describe('MyProfile', () => {
  let component: MyProfile;
  let fixture: ComponentFixture<MyProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfile],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MyProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
