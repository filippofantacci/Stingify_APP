import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) : () => Promise<boolean> {
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloak.url,
          realm: environment.keycloak.realm,
          clientId: environment.keycloak.clientId,
        },
        initOptions: {
            checkLoginIframe: environment.keycloak.initOptions.checkLoginIframe,
            checkLoginIframeInterval: environment.keycloak.initOptions.checkLoginIframeInterval
        }
        ,loadUserProfileAtStartUp: true
      });
  }
  