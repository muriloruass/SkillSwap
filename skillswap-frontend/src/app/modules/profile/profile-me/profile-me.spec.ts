import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMe } from './profile-me';

describe('ProfileMe', () => {
  let component: ProfileMe;
  let fixture: ComponentFixture<ProfileMe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMe],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileMe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
