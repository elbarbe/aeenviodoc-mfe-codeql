// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  version: '3.0.0',
  prefix: 'aeenviodoc',
  production: false,
  standalone: false,
  msal: {
    clientId: 'feac80f8-9e48-40e1-bcd4-a1b75148ec44',
    authority: 'https://login.microsoftonline.com/8ca9fee9-9f9d-4340-8cbb-05498e9baa9a',
    redirectUri: 'http://localhost:4203'
  },  
  urlms: 'http://localhost:8080'
};

