import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRecurringAmountModalComponent } from './edit-recurring-amount-modal.component';

describe('EditRecurringAmountModalComponent', () => {
  let component: EditRecurringAmountModalComponent;
  let fixture: ComponentFixture<EditRecurringAmountModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecurringAmountModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRecurringAmountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
