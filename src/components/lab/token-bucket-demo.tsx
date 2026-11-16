"use client";

import { useRef, useState } from "react";

// A token bucket: each request takes one token, tokens refill at a fixed rate,
// and the bucket never holds more than its capacity. This is a browser
// implementation of the algorithm for demonstration. It is not a production
// rate limiter and does not represent any system of mine.
const CAPACITY = 5;
const REFILL_PER_SECOND = 1;

type Event = { id: number; accepted: boolean; tokensLeft: number };

export function TokenBucketDemo() {
  const bucket = useRef<{ tokens: number; last: number | null }>({ tokens: CAPACITY, last: null });
  const nextId = useRef(0);
  const [tokens, setTokens] = useState(CAPACITY);
  const [events, setEvents] = useState<Event[]>([]);

  function send(count: number) {
    // Time is read only inside this event handler, never during render.
    const now = performance.now();
    const batch: Event[] = [];

    for (let i = 0; i < count; i++) {
      const state = bucket.current;
      if (state.last !== null) {
        const elapsedSeconds = (now - state.last) / 1000;
        state.tokens = Math.min(CAPACITY, state.tokens + elapsedSeconds * REFILL_PER_SECOND);
      }
      state.last = now;

      const accepted = state.tokens >= 1;
      if (accepted) {
        state.tokens -= 1;
      }
      batch.push({ id: nextId.current++, accepted, tokensLeft: Math.floor(state.tokens) });
    }

    setTokens(bucket.current.tokens);
    setEvents((previous) => [...batch.reverse(), ...previous].slice(0, 8));
  }

  function reset() {
    bucket.current = { tokens: CAPACITY, last: null };
    setTokens(CAPACITY);
    setEvents([]);
  }

  const available = Math.floor(tokens);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-text-muted">
          Bucket capacity {CAPACITY}. Refills {REFILL_PER_SECOND} token per second. The count
          updates when a request is sent.
        </p>
        <div
          role="img"
          aria-label={`${available} of ${CAPACITY} tokens available`}
          className="mt-4 h-4 w-full overflow-hidden rounded-full border border-border bg-surface"
        >
          <div
            className="h-full bg-accent transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${(tokens / CAPACITY) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-text-muted">{available} of {CAPACITY} tokens available</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => send(1)}
          className="min-h-11 rounded-md bg-accent px-5 font-medium text-text-inverse hover:bg-accent-strong"
        >
          Send one request
        </button>
        <button
          type="button"
          onClick={() => send(8)}
          className="min-h-11 rounded-md border border-border px-5 font-medium text-text hover:border-text-muted"
        >
          Send 8 at once
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-md px-5 text-text-muted underline underline-offset-4 hover:text-text"
        >
          Reset
        </button>
      </div>

      <div aria-live="polite">
        {events.length === 0 ? (
          <p className="text-text-muted">No requests yet.</p>
        ) : (
          <ol className="divide-y divide-border border-y border-border">
            {events.map((event) => (
              <li key={event.id} className="flex items-baseline justify-between gap-4 py-3">
                <span className={event.accepted ? "text-status-practiced" : "text-status-growing"}>
                  {event.accepted ? "Accepted" : "Rejected: no token available"}
                </span>
                <span className="text-sm text-text-muted">{event.tokensLeft} left</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
