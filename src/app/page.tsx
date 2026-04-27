'use client';

import { useEffect, useState } from 'react';
import { getScaleEnv, getServerResources } from './actions';

function formatGiB(bytes: number) {
  return (bytes / 1024 ** 3).toFixed(2);
}

type HomeData = {
  resources: Awaited<ReturnType<typeof getServerResources>>;
  scaleEnv: Awaited<ReturnType<typeof getScaleEnv>>;
};

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    Promise.all([getServerResources(), getScaleEnv()]).then(([resources, scaleEnv]) =>
      setData({ resources, scaleEnv }),
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-slate-950 to-teal-900 px-6 py-16 text-teal-50">
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">Scale Dokploy Server</h1>
        {data ? (
          <dl className="grid gap-3 rounded-lg border border-teal-800/60 bg-slate-950/40 p-4 text-sm backdrop-blur-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-teal-200/80">SCALE_ENV</dt>
              <dd className="font-mono text-teal-100">
                {data.scaleEnv ?? (
                  <span className="text-teal-200/50 italic">not set</span>
                )}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-teal-200/80">Logical CPUs</dt>
              <dd className="font-mono tabular-nums text-teal-100">{data.resources.cpus}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-teal-200/80">Total memory</dt>
              <dd className="font-mono tabular-nums text-teal-100">
                {formatGiB(data.resources.totalMemBytes)} GiB
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-teal-200/80">Free memory</dt>
              <dd className="font-mono tabular-nums text-teal-100">
                {formatGiB(data.resources.freeMemBytes)} GiB
              </dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-teal-200/60">Loading server info…</p>
        )}
      </div>
    </div>
  );
}
