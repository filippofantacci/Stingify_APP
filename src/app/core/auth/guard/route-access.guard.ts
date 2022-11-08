import { Injectable } from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RouteAccessGuard extends KeycloakAuthGuard {
    constructor(
        protected readonly router: Router,
        protected readonly keycloak: KeycloakService,
        private route: ActivatedRoute
    ) {
        super(router, keycloak);
    }

    public async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {

        // verifica che la rotta sia abilitata per l'ambiente
        if (!this.isPathEnabled(route.data.url)) {
            // TODO
            this.router.navigate(['/404', { relativeTo: this.route }]);
        }

        // Force the user to log in if currently unauthenticated.
        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url,
            });
        }

        // Get the roles required from the route.
        const requiredRoles = route.data.authorities;

        // Allow the user to to proceed if no additional roles are required to access the route.
        if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
            return true;
        }

        // Allow the user to proceed if all the required roles are present.

        console.log('route: ', route.data.url);
        console.log('this.roles: ', this.roles);
        console.log('required Roles: ', requiredRoles);

        return requiredRoles.every((role) => this.roles.includes(role));
    }

    private isPathEnabled(path: string): boolean {

        if (path === null || path === undefined || path.trim() === '') return true;
        let enabled = true;
        // in produzione dirotto le rotte non abilitate
        if (environment.production) {
            environment.menu.forEach(element => {
                if (element.url !== null && element.url !== undefined && element.url.toUpperCase() === path.toUpperCase()) {
                    enabled = element.enabled;
                }
            });
        }
        return enabled;
    }
}