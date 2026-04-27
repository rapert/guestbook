'use server';

import os from 'node:os';

export async function getServerResources() {
  const cpus = os.cpus()?.length ?? 0;
  const totalMemBytes = os.totalmem();
  const freeMemBytes = os.freemem();

  console.log('cpus', cpus);
  console.log('totalMemBytes', totalMemBytes);
  console.log('freeMemBytes', freeMemBytes);

  return {
    cpus,
    totalMemBytes,
    freeMemBytes,
  };
}

export async function getScaleEnv() {
  const value = process.env.SCALE_ENV;
  return value ?? null;
}
