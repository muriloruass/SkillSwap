import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PublicProfile } from './public-profile';

describe('PublicProfile', () => {
  let component: PublicProfile;
  let fixture: ComponentFixture<PublicProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicProfile],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
