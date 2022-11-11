import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AmountTypeDto, CategoryDto, MacroCategoryDto } from 'src/app/core/api/stingify/models';
import { AmountTypeControllerService, CategoryControllerService, MacroCategoryControllerService } from 'src/app/core/api/stingify/services';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryModalComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public macroCategories: MacroCategoryDto[] = [];
  public amountTypes: AmountTypeDto[] = [];

  public ready: boolean = false;

  public formCreateCategory: FormGroup;


  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private categoryControllerService: CategoryControllerService,
    private macroCategoryControllerService: MacroCategoryControllerService,
    private amountTypeControllerService: AmountTypeControllerService,
    private changeDetectorRef: ChangeDetectorRef,
    private loadingController: LoadingController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.ready = false;
    // get macro categories
    this.getDomains();
    // this.getMacroCategories();

    this.formCreateCategory = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(255)]],
      macroCategory: [''],
      amountType: ['', [Validators.required]],
    });

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getDomains(): void {
    this.presentLoadingWithOptions().then(spinner => {
      this.subscriptions.push(
        forkJoin([
          this.macroCategoryControllerService.getMacroCategoriesByUserId({ userId: this.userService.userId }),
          this.amountTypeControllerService.getAllAmountType()
        ]).pipe(
          map(([macroCategories, amountTypes]) => {

            this.macroCategories = macroCategories;
            this.amountTypes = amountTypes;
            this.ready = true;

            this.changeDetectorRef.markForCheck();

          })
        ).subscribe(() => {
          spinner.dismiss();
        })
      );
    })
      .catch(reason => {
        console.log(reason);
      });

  }

  public onSubmit(): void {
    const inputCategory: CategoryDto = {
      creatorUserId: this.userService.userId,
      description: this.formCreateCategory.controls.description.value,
      amountType: this.formCreateCategory.controls.amountType.value,
      macroCategory: this.formCreateCategory.controls.macroCategory.value ? this.formCreateCategory.controls.macroCategory.value : undefined
    }
    this.presentLoadingWithOptions().then(spinner => {

      this.subscriptions.push(
        this.categoryControllerService.addCategory({ body: inputCategory }).subscribe(
          res => {
            spinner.dismiss();
            this.close(true);
          },
          err => {
            spinner.dismiss();
          }
        )
      );
    })
      .catch(reason => {
        console.log(reason);
      });
  }

  public close(shouldRefresh: boolean): void {
    this.modalController.dismiss({ shouldRefresh: shouldRefresh });
  }

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}
