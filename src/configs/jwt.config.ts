import { ConfigName } from 'src/constants/config-name.constant';

export const jwtConfig = () => ({
  [ConfigName.Jwt]: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});

export type JwtConfig = ReturnType<typeof jwtConfig>[ConfigName.Jwt];
