import { ReservationWidget } from "./reservation-widget";

const MENU = {
  Starters: [
    { name: "Marinated Olives & Grilled Bread", price: 8 },
    { name: "Burrata, Heirloom Tomato, Basil Oil", price: 14 },
    { name: "Charred Octopus, White Bean Purée", price: 17 },
  ],
  Mains: [
    { name: "Pappardelle, Braised Short Rib", price: 26 },
    { name: "Roasted Half Chicken, Salsa Verde", price: 24 },
    { name: "Pan-Seared Branzino, Fennel, Citrus", price: 29 },
    { name: "Wild Mushroom Risotto", price: 22 },
  ],
  Desserts: [
    { name: "Olive Oil Cake, Blood Orange", price: 9 },
    { name: "Affogato", price: 7 },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="font-serif text-lg text-stone-900">Olive &amp; Oak</span>
          <div className="flex gap-6 text-sm text-stone-600">
            <a href="#menu" className="hover:text-stone-900">
              Menu
            </a>
            <a href="#about" className="hover:text-stone-900">
              About
            </a>
            <a href="#reserve" className="rounded-full bg-red-900 px-4 py-1.5 text-white hover:bg-red-800">
              Reserve a table
            </a>
          </div>
        </div>
      </nav>

      <header className="bg-stone-900">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-red-500">
            Seasonal Mediterranean · Since 2018
          </p>
          <h1 className="mt-4 font-serif text-4xl text-stone-50 sm:text-5xl">
            A neighborhood table, done properly
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-300">
            Small plates, wood-fired mains, and a wine list built around whatever&apos;s actually
            in season. Book ahead — tables go quickly on weekends.
          </p>
          <a
            href="#reserve"
            className="mt-8 inline-block rounded-full bg-red-800 px-6 py-3 text-sm font-medium text-white hover:bg-red-700"
          >
            Reserve a table
          </a>
        </div>
      </header>

      <section id="about" className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="font-serif text-2xl text-stone-900">About us</h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Olive &amp; Oak started as a single wood-fired oven and a short, changing menu. It&apos;s
          grown since, but the idea hasn&apos;t: cook what&apos;s good this week, keep the room
          warm, and make regulars feel like regulars.
        </p>
      </section>

      <section id="menu" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="text-center font-serif text-2xl text-stone-900">Menu</h2>
          <div className="mt-10 flex flex-col gap-10">
            {Object.entries(MENU).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-serif text-lg text-red-900">{category}</h3>
                <ul className="mt-3 divide-y divide-stone-200">
                  {items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between py-3">
                      <span className="text-stone-800">{item.name}</span>
                      <span className="text-stone-500">${item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reserve" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center font-serif text-2xl text-stone-900">Reserve a table</h2>
        <div className="mt-10">
          <ReservationWidget />
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-center text-sm text-stone-500">
        <p>84 Main Street · Dinner nightly from 5pm</p>
        <p className="mt-3 text-xs text-stone-400">
          Example site built to show what a working reservation flow looks like — not a real
          business. Built by{" "}
          <a href="https://k-reynolds.com" className="underline hover:text-stone-600">
            k-reynolds.com
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
