import { Preferences } from '@capacitor/preferences';
import {
  parse as parseSetCookieString, splitCookiesString
} from 'set-cookie-parser';
import SuperTokens from 'supertokens-auth-react';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';
import { env } from './main';



export function initSupertokens() {
  updateGlobalFetch();
  SuperTokens.init({
    appInfo: {
      // learn more about this on https://supertokens.com/docs/emailpassword/appinfo
      appName: 'my-app',
      apiDomain: env.apiUrl,
      websiteDomain: env.websiteDomain,
      apiBasePath: '/api',
      websiteBasePath: '/auth',
    },
    recipeList: [
      EmailPassword.init({}),
      Session.init({
        
        onHandleEvent: async (recipeEvent) => {
          // Clear all cookies if the session expired and on signout
          if (['SIGN_OUT', 'UNAUTHORISED'].includes(recipeEvent.action)) {
            await Preferences.remove({ key: 'st-cookie' });
            window.location.href = '/auth';
          }
        },
      }),
    ],
  });
  SuperTokens.changeLanguage('de');
}

/**
 * check is api domain
 * @param str
 * @returns
 */
function isApiDomain(str: string) {
  return str.startsWith(env.apiUrl);
}

/**
 * set the cookie to the local storage
 * @param respCookies
 */
export async function setCookiesInLocalstorage(respCookies: string) {
  if (respCookies) {
    // Split and parse cookies received
    const respCookieMap = parseSetCookieString(
      splitCookiesString(respCookies),
      { decodeValues: false, map: true }
    );

    // Check if we have anything stored already
    const localstorageCookies = await Preferences.get({ key: 'st-cookie' });
    if (localstorageCookies.value !== null) {
      // Split and parse cookies we have in stored previously
      const splitStoredCookies = localstorageCookies.value
        .split('; ')
        .map((cookie) => cookie.split('='));

      for (const [name, value] of splitStoredCookies) {
        // Keep old cookies if they weren't overwritten
        if (respCookieMap[name] === undefined) {
          respCookieMap[name] = { name, value };
        }
      }
    }

    // Save the combined cookies in a the format of a Cookie header
    // Please keep in mind that these have no expiration and lack many of the things done automatically for cookies
    // Many of these features can be implemented, but they are out of scope for this example
    Preferences.set({
      key: 'st-cookie',
      value: Object.values(respCookieMap)
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; '),
    });
  }
}

/**
 * update the global fetch
 */
export function updateGlobalFetch() {
  const origFetch = window.fetch;
  window.fetch = async (input: any, init:any) => {
    // Check if the we need to add the cookies
    if (isApiDomain(input.url || input)) {
      if (init === undefined) {
        init = {};
      }
      if (init.headers === undefined) {
        init.headers = {};
      }

      // Simply add the stored string into a header, it's already in the correct format.
      const localstorageCookies = await Preferences.get({ key: 'st-cookie' });
      if (localstorageCookies.value) {
        init.headers['st-cookie'] = localstorageCookies.value;
      }
      // else{
      //   if(!window.location.href.includes("auth")){
      //     redirectToAuth(); 
      //   }
      // }
    }

    const res = await origFetch(input, init);

    // Check if the we need to process the cookies in the response
    if (isApiDomain(input.url || input)) {
      const respCookies = res.headers.get('st-cookie');

      setCookiesInLocalstorage(respCookies);
    }
    return res;
  };
}
