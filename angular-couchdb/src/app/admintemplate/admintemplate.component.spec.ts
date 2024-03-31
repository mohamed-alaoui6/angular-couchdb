import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintemplateComponent } from './admintemplate.component';

describe('AdmintemplateComponent', () => {
  let component: AdmintemplateComponent;
  let fixture: ComponentFixture<AdmintemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmintemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmintemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
