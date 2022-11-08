import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { ThemesEnum } from 'src/app/utils/app-constants';

@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeChangerComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = new Array<Subscription>();

  public light: string = ThemesEnum.LIGHT;
  public dark: string = ThemesEnum.DARK;

  public get settedTheme(): string {
    if (this.userService.theme === null || this.userService.theme === undefined) {
      // set the default
      this.userService.theme = ThemesEnum.LIGHT;
    }
    this.setThemeAttribute();
    return this.userService.theme;
  }

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.initTheme();
    this.subscriptions.push(this.userService.themeChanged$.subscribe(v => {
      this.swithcTheme();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * init the theme
   */
  public initTheme(): void {
    // set the theme in user service
    // if there is not setted theme 
    if (this.userService.theme === null || this.userService.theme === undefined) {
      // set the default
      this.userService.theme = ThemesEnum.LIGHT;
    }
    // init the theme from user service
    // this.settedTheme = this.userService.theme;
    // set the theme attribute in document body
    this.setThemeAttribute();
  }

  /**
   * switch the theme
   */
  public swithcTheme(): void {

    if (this.userService.theme === ThemesEnum.LIGHT) {
      this.userService.theme = ThemesEnum.DARK;
    } else if (this.userService.theme === ThemesEnum.DARK) {
      this.userService.theme = ThemesEnum.LIGHT;
    }
    this.setThemeAttribute();
  }

  /**
   * set the attribute 'color-theme' in document body
   */
  private setThemeAttribute(): void {
    document.body.setAttribute('color-theme', this.userService.theme);
    this.changeDetectorRef.markForCheck();
  }

}
