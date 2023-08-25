import { ConfigName } from 'src/constants/config-name.constant';

export const nodeConfig = () => ({
  [ConfigName.Node]: {
    env: process.env.NODE_ENV,
    port: parseInt(process.env.NODE_PORT, 10) || 3000,
  },
});

export type NodeConfig = ReturnType<typeof nodeConfig>[ConfigName.Node];
