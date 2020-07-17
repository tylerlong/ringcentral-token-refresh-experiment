/* eslint-env jest */
import RingCentral from 'ringcentral-extensible';
import waitFor from 'wait-for-async';

jest.setTimeout(256000);

describe('refresh token', () => {
  test('refresh and use access token', async () => {
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

    const oldToken = JSON.parse(JSON.stringify(rc.token));

    rc.token = oldToken;
    await rc.refresh();
    await rc.restapi().account().extension().get();
    console.log(1);
    await waitFor({interval: 3300});

    rc.token = oldToken;
    await rc.refresh();
    await rc.restapi().account().extension().get();
    console.log(2);
    await waitFor({interval: 3300});

    rc.token = oldToken;
    await rc.refresh();
    await rc.restapi().account().extension().get();
    console.log(3);
    await waitFor({interval: 3300});

    // refresh token becomes invalid after 10 seconds
    rc.token = oldToken;
    let exception = false;
    try {
      await rc.refresh();
    } catch (e) {
      exception = true;
      expect(e.message.includes('Token not found')).toBeTruthy();
    }
    expect(exception).toBeTruthy();

    await rc.revoke();
  });

  test("refresh but don't use access token", async () => {
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

    const oldToken = JSON.parse(JSON.stringify(rc.token));

    rc.token = oldToken;
    await rc.refresh();
    console.log(1);
    await waitFor({interval: 60000});

    rc.token = oldToken;
    await rc.refresh();
    console.log(2);
    await waitFor({interval: 60000});

    rc.token = oldToken;
    await rc.refresh();
    console.log(3);
    await waitFor({interval: 60000});

    rc.token = oldToken;
    await rc.refresh();
    console.log(4);
    await waitFor({interval: 60000});

    rc.token = oldToken;
    await rc.refresh();
    console.log(5);
    await waitFor({interval: 60000});

    rc.token = oldToken;
    await rc.refresh();
    console.log(6);

    await rc.revoke();
  });
});
