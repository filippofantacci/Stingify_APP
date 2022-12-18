import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {

  @Input() title!: string;

  constructor(
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() { }

  public logOut(): void {
    this.keycloakService.logout().then(() => this.keycloakService.clearToken());
  }

}
