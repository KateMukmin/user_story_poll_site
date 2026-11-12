import { prisma } from '@/lib/prisma';
import { getOptionNames } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function Results() {
  const options = getOptionNames();
  const votes = await prisma.vote.findMany({ orderBy: { createdAt: 'desc' } });
  const total = votes.length;
  const counts = Object.fromEntries(options.map((o) => [o.id, 0]));
  votes.forEach((v) => { counts[v.option] = (counts[v.option] || 0) + 1; });
  const nameFor = (id) => options.find((o) => o.id === id)?.name || id;

  return (
    <main className="page">
      <div className="results-head">
        <h1>Poll results</h1>
      </div>
      <p style={{ margin: 0, color: 'var(--secondary)' }}>
        {total === 0 ? 'No votes yet.' : `${total} ${total === 1 ? 'vote' : 'votes'} so far.`}
      </p>

      <div className="panel">
        <h2>Votes by format</h2>
        <ul className="tally">
          {options.map((o) => {
            const pct = total ? Math.round((counts[o.id] / total) * 100) : 0;
            return (
              <li key={o.id}>
                <div className="tally-row">
                  <span>{o.name}</span>
                  <span>{counts[o.id]} ({pct}%)</span>
                </div>
                <div className="track"><div className="fill" style={{ width: `${pct}%` }} /></div>
              </li>
            );
          })}
        </ul>
      </div>

      {total > 0 && (
        <div className="panel">
          <h2>Individual votes</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Format</th></tr></thead>
              <tbody>
                {votes.map((v) => (
                  <tr key={v.id}>
                    <td>{v.firstName} {v.lastName}</td>
                    <td>{nameFor(v.option)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="page-end" />
    </main>
  );
}
