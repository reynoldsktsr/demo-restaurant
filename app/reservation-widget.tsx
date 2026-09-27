"use client";

import { useMemo, useState } from "react";

const TIMES = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"];
const TABLE_COUNT = 6;

// Seeded "already booked" table-count per time slot, so availability is
// computed against real capacity rather than always showing everything open.
const BOOKED_TABLES: Record<string, number> = {
  "5:00 PM": 2,
  "5:30 PM": 4,
  "6:00 PM": 6,
  "6:30 PM": 5,
  "7:00 PM": 3,
  "7:30 PM": 1,
  "8:00 PM": 0,
  "8:30 PM": 0,
};

export function ReservationWidget() {
  const [partySize, setPartySize] = useState(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ time: string; code: string } | null>(null);

  const availability = useMemo(
    () =>
      TIMES.map((time) => {
        const booked = BOOKED_TABLES[time] ?? 0;
        const open = TABLE_COUNT - booked;
        return { time, open, full: open <= 0 };
      }),
    [],
  );

  function confirm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedTime) return;
    setConfirmed({ time: selectedTime, code: `RES-${Math.floor(1000 + Math.random() * 9000)}` });
  }

  if (confirmed) {
    return (
      <div className="rounded-2xl border border-emerald-800/20 bg-emerald-50 p-8 text-center">
        <p className="font-serif text-2xl text-stone-900">Reservation {confirmed.code} confirmed</p>
        <p className="mt-2 text-stone-600">
          Table for {partySize} at {confirmed.time}. See you then.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={confirm}
      className="mx-auto flex max-w-md flex-col gap-5 rounded-2xl border border-stone-200 bg-white p-6"
    >
      <label className="flex flex-col gap-1 text-sm text-stone-700">
        Party size
        <input
          type="number"
          min={1}
          max={12}
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
          className="w-24 rounded-lg border border-stone-300 px-3 py-1.5"
        />
      </label>

      <div>
        <p className="mb-2 text-sm text-stone-700">Tonight&apos;s availability</p>
        <div className="grid grid-cols-4 gap-2">
          {availability.map((slot) => (
            <button
              key={slot.time}
              type="button"
              disabled={slot.full}
              onClick={() => setSelectedTime(slot.time)}
              className={`rounded-lg border px-2 py-2 text-xs ${
                slot.full
                  ? "cursor-not-allowed border-stone-200 text-stone-300"
                  : selectedTime === slot.time
                    ? "border-red-900 bg-red-900 text-white"
                    : "border-stone-300 text-stone-700 hover:border-red-900"
              }`}
            >
              {slot.time}
              <span className="block text-[10px] opacity-70">
                {slot.full ? "full" : `${slot.open} left`}
              </span>
            </button>
          ))}
        </div>
      </div>

      <input required placeholder="Name" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      <input required type="tel" placeholder="Phone" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />

      <button
        disabled={!selectedTime}
        className="rounded-full bg-red-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Confirm reservation
      </button>
    </form>
  );
}
