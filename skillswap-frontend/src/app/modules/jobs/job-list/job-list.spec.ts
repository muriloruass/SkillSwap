import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobList } from './job-list';

describe('JobList', () => {
  let component: JobList;
  let fixture: ComponentFixture<JobList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobList],
    }).compileComponents();

    fixture = TestBed.createComponent(JobList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
