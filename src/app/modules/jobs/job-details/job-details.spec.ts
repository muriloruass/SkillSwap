import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { JobDetails } from './job-details';

describe('JobDetails', () => {
  let component: JobDetails;
  let fixture: ComponentFixture<JobDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobDetails],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(JobDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
