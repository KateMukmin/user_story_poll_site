'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const params = useSearchParams();
  const forResults = params.get('results') === '1';
  const next = params.get('next') || '/';
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setError(data.error || 'That password is incorrect. Check it and try again.');
      setBusy(false);
      return;
    }
    window.location.href = next.startsWith('/') ? next : '/';
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h1>{forResults ? 'Poll results' : 'User story format poll'}</h1>
        <p>{forResults ? 'This page is restricted. Enter the results password to continue.' : 'Enter the poll password to open the poll.'}</p>
        <form onSubmit={submit}>
          <label className="field">
            <span>{forResults ? 'Results password' : 'Password'}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
          </label>
          <button className="btn" type="submit" disabled={busy}>
            {busy ? 'Opening…' : forResults ? 'Open results' : 'Open poll'}
          </button>
          {error && <p className="status error" role="alert">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
