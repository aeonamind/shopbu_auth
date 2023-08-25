import { ConfigName } from 'src/constants/config-name.constant';

export const googleConfig = () => ({
  [ConfigName.Google]: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  },
});

export type GoogleConfig = ReturnType<typeof googleConfig>[ConfigName.Google];
