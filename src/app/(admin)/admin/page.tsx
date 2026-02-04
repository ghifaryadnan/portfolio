 export default function AdminHomePage() {
  return (
    <section className="space-y-6">
      <div className="text-2xl font-semibold">Selamat datang, Admin</div>
      <p className="text-sm text-zinc-500">Gunakan sidebar untuk navigasi.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="font-semibold">Total Projects</div>
          <div className="text-3xl font-bold mt-2">12</div>
          <div className="text-xs text-zinc-500 mt-1">Summary</div>
        </div>
        <div className="rounded border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="font-semibold">Open Issues</div>
          <div className="text-3xl font-bold mt-2">34</div>
          <div className="text-xs text-zinc-500 mt-1">Last 7 days</div>
        </div>
        <div className="rounded border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="font-semibold">Deployments</div>
          <div className="text-3xl font-bold mt-2">5</div>
          <div className="text-xs text-zinc-500 mt-1">Active</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="font-semibold mb-3">Recent Activity</div>
          <ul className="space-y-2 text-sm">
            <li>Updated project A</li>
            <li>Created new release</li>
            <li>Fixed UI bugs</li>
          </ul>
        </div>
        <div className="rounded border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="font-semibold mb-3">Top Projects</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="font-semibold">Project A</div>
              <div className="text-sm text-zinc-500">Active</div>
            </div>
            <div className="rounded border border-zinc-200 dark:border-zinc-800 p-4">
              <div className="font-semibold">Project B</div>
              <div className="text-sm text-zinc-500">Active</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
 }
