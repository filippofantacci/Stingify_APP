import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../core/api/stingify/models';
import { UserControllerService } from '../core/api/stingify/services/user-controller.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsPage implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public appTabs = environment.menu.filter(el => {
    // show only enabled tabs in production
    if (environment.production) {
      return el.enabled === true;
    } else {
      return true;
    }
  });

  public ready = false;

  constructor(
    private keycloakService: KeycloakService,
    private userControllerService: UserControllerService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private loadingController: LoadingController,
  ) {

  }

  ngOnInit() {
    
    this.verifyIfLoggedIn();

    this.subscriptions.push(this.userService.userUndefined$.subscribe(v => {
      this.verifyIfLoggedIn();
    }));
  }

  private verifyIfLoggedIn(): void {
    this.keycloakService.isLoggedIn()
      .then(loggedIn => {
        if (loggedIn) {
          this.keycloakService.loadUserProfile()
            .then(userProfile => {
              this.verifyAndInsertUser(userProfile);
            }).catch(reason => console.log(reason));
        }
      }).catch(reason => console.log(reason));

  }

  private verifyAndInsertUser(userProfile: KeycloakProfile): void {

    this.presentLoadingWithOptions().then(spinner => {

      this.ready = false;

      this.subscriptions.push(
        this.userControllerService.getUserByAuthId({ authId: userProfile.id }).subscribe(
          user => {
            if (user) {
              this.updateUserService(user);
              spinner.dismiss();
              this.cdr.markForCheck();
            } else {
              const UserDtoInput: UserDto = {
                authId: userProfile.id,
                firstName: userProfile.firstName,
                lastName: userProfile.lastName,
                email: userProfile.email
              }
              this.subscriptions.push(
                this.userControllerService.addUser({ body: UserDtoInput }).subscribe(
                  addedUser => {
                    this.updateUserService(addedUser);
                    spinner.dismiss();
                    this.cdr.markForCheck();
                  }
                  , err => {
                    spinner.dismiss();
                    this.keycloakService.logout();
                  })
              );
            }
          }
          , err => {
            spinner.dismiss();
            this.keycloakService.logout();
          })
      );
    })
      .catch(reason => {
        console.log(reason);
      });
  }

  private updateUserService(user: UserDto): void {
    this.userService.userId = user.userId;
    this.userService.roles = this.keycloakService.getUserRoles();
    this.userService.user = user;

    this.ready = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private async presentLoadingWithOptions(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    return loading;
  }
}
