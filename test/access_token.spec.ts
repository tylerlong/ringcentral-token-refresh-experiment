/* eslint-env jest */
import RingCentral from 'ringcentral-extensible';
import waitFor from 'wait-for-async';

jest.setTimeout(64000);

describe('access token', () => {
  test('become invalid after refreshing', async () => {
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

    let exception = false;
    try {
      await rc.restapi().account().extension().get();
    } catch (e) {
      exception = true;
      expect(e.message.includes('Access token corrupted')).toBeTruthy();
    }
    expect(exception).toBeTruthy();

    // after 10 seconds
    await waitFor({interval: 10000});

    exception = false;
    try {
      await rc.restapi().account().extension().get();
    } catch (e) {
      exception = true;
      expect(e.message.includes('Token not found')).toBeTruthy();
    }
    expect(exception).toBeTruthy();

    await rc.revoke();
  });
});
