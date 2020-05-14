import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateusermanagerComponent } from './updateusermanager.component';

describe('UpdateusermanagerComponent', () => {
  let component: UpdateusermanagerComponent;
  let fixture: ComponentFixture<UpdateusermanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateusermanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateusermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
