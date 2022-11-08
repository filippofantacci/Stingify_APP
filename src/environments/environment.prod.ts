import { menu } from "src/app/utils/menu";

export const environment = {
  production: true,
  keycloak: {
    url: 'http://localhost:8080/auth',
    realm: 'Stingify',
    clientId: 'stingify_app',
    initOptions: {
      checkLoginIframe: true,
      checkLoginIframeInterval: 25
    }
  },
  cryptRequestResponse:{
    enable:false,
    aes_iv :'GtjZ4+YnwCgs3diN6+kcFw==',
    aes_key :'E3IJcCIheoIGfKLOFKL30nlgCbZVJEv0FMNF2XHMp5A=',
  },
  menu: menu
};
