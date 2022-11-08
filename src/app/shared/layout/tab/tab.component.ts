import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  @Input() title!: string;

  constructor(
    private keycloakService: KeycloakService,
    public userService: UserService,
  ) { }

  ngOnInit() { }

  public logOut(): void {
    this.keycloakService.logout().then(() => this.keycloakService.clearToken());
  }

  public swithcTheme(): void {
    this.userService.onThemeChanged();
  }
}
