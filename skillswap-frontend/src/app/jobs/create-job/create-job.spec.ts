import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateJob } from './create-job';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('CreateJob', () => {
  let component: CreateJob;
  let fixture: ComponentFixture<CreateJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateJob],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateJob);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form initially', () => {
    expect(component.jobData.title).toBe('');
    expect(component.jobData.description).toBe('');
    expect(component.jobData.budget).toBeUndefined();
    expect(component.jobData.category).toBe('');
  });

  it('should have categories defined', () => {
    expect(component.categories.length).toBeGreaterThan(0);
  });
});