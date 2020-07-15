/* eslint-env jest */
import RingCentral from 'ringcentral-extensible';
import waitFor from 'wait-for-async';

jest.setTimeout(256000);

describe('refresh token', () => {
  test('still valid if immediately use it', async () => {
    const rc = new RingCentral({
      clientId: process.env.RINGCENTRAL_CLIENT_ID!,
      clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
      server: process.env.RINGCENTRAL_SERVER_URL!,
    });

    await rc.login({
      username: process.env.RINGCENTRAL_USERNAME!,
      extension: process.env.RINGCENTRAL_EXTENSION!,
      password: process.env.RINGCENTRAL_PASSWORD!,
    });

    const oldTokenFromDB = JSON.parse(JSON.stringify(rc.token));
    await rc.refresh();
    rc.token = oldTokenFromDB;

    // no exception, still works
    await rc.refresh();

    await rc.revoke();
  });

  test('use it after 240 seconds', async () => {
    const rc = new RingCentral({
      clientId: process.env.RINGCENTRAL_CLIENT_ID!,
      clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
      server: process.env.RINGCENTRAL_SERVER_URL!,
    });

    await rc.login({
      username: process.env.RINGCENTRAL_USERNAME!,
      extension: process.env.RINGCENTRAL_EXTENSION!,
      password: process.env.RINGCENTRAL_PASSWORD!,
    });

    const oldTokenFromDB = JSON.parse(JSON.stringify(rc.token));
    await rc.refresh();
    rc.token = oldTokenFromDB;

    await waitFor({interval: 240000});

    // no exception, still works
    await rc.refresh();

    // no exception
    await rc.restapi().account().extension().get();

    await rc.revoke();
  });
});
