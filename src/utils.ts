import os from 'os';

export const parseIp = (): string => {
  let ifaces = os.networkInterfaces();
  for (let i in ifaces) {
    const iface = ifaces[i];

    if (iface) {
      for (let j = 0; j < iface.length; j++) {
        const dev = iface[j];
        if (dev.family === 'IPv4' && !dev.internal) return dev.address;
      }
    }
  }
  return '0.0.0.0';
};
