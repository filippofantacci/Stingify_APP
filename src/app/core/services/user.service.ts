import { EventEmitter, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UserDto } from '../api/stingify/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public themeChanged$: EventEmitter<any>;

  public userSetted$: EventEmitter<any>;

  public userUndefined$: EventEmitter<any>;

  public rolesSetted$: EventEmitter<any>;

  private _userId: number;

  private _user: UserDto;
  
  private _roles: string[];

  private _theme: string;

  constructor(private keycloakService: KeycloakService) {
    this.themeChanged$ = new EventEmitter();
    this.userSetted$ = new EventEmitter();
    this.userUndefined$ = new EventEmitter();
    this.rolesSetted$ = new EventEmitter();
  }

  public onThemeChanged(): void {
    this.themeChanged$.emit();
  }

  public onUserSetted(): void {
    this.userSetted$.emit();
  }
  
  public onUserudefined(): void {
    this.userUndefined$.emit();
  }

  public onRolesSetted(): void {
    this.rolesSetted$.emit();
  }

  public get userId(): number {
    // emit event when try to access but is null
    if (this._userId === null || this._userId === undefined) {
      this.onUserudefined();
    } else {
      return this._userId;
    }
  }

  public set userId(userId: number) {
    this._userId = userId;
  }
  
  public get user(): UserDto {
    return this._user;
  }
  
  public set user(user: UserDto) {
    this._user = user;
    this.onUserSetted();
  }
  
  public get roles(): string[] {
    if (this._roles == null || this._roles.length > 0) {
      this.getRoles();
    }
    return this._roles;
  }
  
  public set roles(roles: string[]) {
    this._roles = roles;
    this.onRolesSetted();
  }
  
  private getRoles(): void {
    this.roles = this.keycloakService.getUserRoles();
  }
  
  public get theme(): string {
    return this._theme;
  }
  
  public set theme(theme: string) {
    this._theme = theme;
  }
  
  public hasAnyAuthority(authorities: string[]): boolean {
    return this.roles.some((authority: string) => authorities.includes(authority));
  }
}
