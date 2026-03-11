import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCreate } from './job-create';

describe('JobCreate', () => {
  let component: JobCreate;
  let fixture: ComponentFixture<JobCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(JobCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
