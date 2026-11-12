'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function PollClient({ title, intro, options }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('right');
  const [selected, setSelected] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const tabRefs = useRef([]);

  const chosen = options.find((o) => o.id === selected);

  function go(index) {
    if (index < 0 || index >= options.length) return;
    setDirection(index < current ? 'left' : 'right');
    setCurrent(index);
  }

  useEffect(() => {
    tabRefs.current[current]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [current]);

  useEffect(() => {
    function onKey(e) {
      const tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'textarea' || tag === 'input') return;
      if (e.key === 'ArrowRight') go(current + 1);
      if (e.key === 'ArrowLeft') go(current - 1);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  function choose(id) {
    setSelected(id);
    setStatus({ state: 'idle', message: '' });
  }

  // Clicking the chosen format again clears it
  function onRadioClick(id) {
    if (id === selected) choose('');
  }

  async function submit(event) {
    event.preventDefault();
    if (!selected) return setStatus({ state: 'error', message: 'Choose a format to vote for.' });
    if (!firstName.trim() || !lastName.trim()) {
      return setStatus({ state: 'error', message: 'Enter your first and last name to vote.' });
    }
    setStatus({ state: 'sending', message: '' });
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, option: selected }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Your vote was not saved. Try again.');
      setStatus({ state: 'done', message: `Vote submitted for ${chosen.name}. Thank you.` });
    } catch (error) {
      setStatus({ state: 'error', message: error.message || 'Your vote was not saved. Try again.' });
    }
  }

  return (
    <main className="page">
      <h1>{title}</h1>
      <div className="intro">
        <ReactMarkdown>{intro}</ReactMarkdown>
      </div>

      <form onSubmit={submit} noValidate>
        <div className={`slides${direction === 'left' ? ' from-left' : ''}`}>
          <div className="slide-tabs" role="tablist" aria-label="User story formats">
            {options.map((o, i) => (
              <button
                key={o.id}
                ref={(el) => (tabRefs.current[i] = el)}
                type="button"
                role="tab"
                aria-selected={i === current}
                aria-controls={`slide-${o.id}`}
                tabIndex={i === current ? 0 : -1}
                className={`slide-tab${selected === o.id ? ' is-chosen' : ''}`}
                onClick={() => go(i)}
              >
                <span className="tab-num">{i + 1}.</span>
                <span className="tab-name">{o.name}</span>
                <span className="tab-check" aria-label="chosen">✓</span>
              </button>
            ))}
          </div>

          <fieldset className="options">
            <legend style={{ position: 'absolute', left: '-9999px' }}>User story formats</legend>
            {options.map((o, i) => (
              <article
                key={`${o.id}-${i === current ? current : 'off'}`}
                id={`slide-${o.id}`}
                role="tabpanel"
                className={`option${i === current ? ' is-current' : ''}${selected === o.id ? ' is-selected' : ''}`}
              >
                <label className="option-head">
                  <input
                    type="radio"
                    name="format"
                    value={o.id}
                    checked={selected === o.id}
                    onChange={() => choose(o.id)}
                    onClick={() => onRadioClick(o.id)}
                  />
                  <span className="option-titles">
                    <span className="option-name">{o.name}</span>
                    {o.hint && <span className="option-hint">{o.hint}</span>}
                  </span>
                  <span className="option-pick" aria-hidden="true">{selected === o.id ? 'Selected' : 'Choose'}</span>
                </label>
                <div className="option-body">
                  <ReactMarkdown>{o.body}</ReactMarkdown>
                </div>
              </article>
            ))}
          </fieldset>

          <div className="slide-nav">
            <button type="button" className="btn-outline" onClick={() => go(current - 1)} disabled={current === 0}>
              <span aria-hidden="true">‹</span> Previous
            </button>
            <span className="slide-count" aria-live="polite">{current + 1} of {options.length}</span>
            <button type="button" className="btn-outline" onClick={() => go(current + 1)} disabled={current === options.length - 1}>
              Next <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div className="vote-panel">
          <div className="vote-fields">
            <label className="field">
              <span>First name</span>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required />
            </label>
            <label className="field">
              <span>Last name</span>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" required />
            </label>
          </div>
          <div className="vote-row">
            <div className="vote-choice-wrap">
              <p className="vote-choice">
                {chosen ? <>Voting for <strong>{chosen.name}</strong></> : 'No format chosen yet'}
              </p>
              {chosen && (
                <button type="button" className="link-btn" onClick={() => choose('')}>Clear choice</button>
              )}
            </div>
            <button className="btn" type="submit" disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Submitting…' : 'Submit vote'}
            </button>
          </div>
          {status.message && (
            <p className={`status ${status.state}`} role="status">{status.message}</p>
          )}
          <p className="hint">Each person can vote once, so make sure you’re happy with your choice before you submit.</p>
        </div>
      </form>
      <div className="page-end" />
    </main>
  );
}
