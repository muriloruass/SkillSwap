import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobs } from './my-jobs';

describe('MyJobs', () => {
  let component: MyJobs;
  let fixture: ComponentFixture<MyJobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyJobs],
    }).compileComponents();

    fixture = TestBed.createComponent(MyJobs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
