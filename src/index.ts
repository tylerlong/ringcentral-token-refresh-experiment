import RingCentral from 'ringcentral-extensible';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID!,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
  server: process.env.RINGCENTRAL_SERVER_URL!,
});

(async () => {
  await rc.login({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION!,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });
  console.log(rc.token?.access_token);
  let extInfo = await rc.restapi().account().extension().get();
  console.log(extInfo.id);
  const oldTokenFromDB = JSON.parse(JSON.stringify(rc.token));
  await rc.refresh();
  console.log(rc.token?.access_token);
  extInfo = await rc.restapi().account().extension().get();
  console.log(extInfo.id);
  rc.token = oldTokenFromDB;

  // access token become invalid
  try {
    extInfo = await rc.restapi().account().extension().get();
    console.log(extInfo.id);
  } catch (e) {
    console.log(e.message);
  }

  // but refresh token is still valid
  await rc.refresh();
  extInfo = await rc.restapi().account().extension().get();
  console.log(extInfo.id);
  await rc.revoke();
})();
