import { TOKEN_DISTRIBUTION } from '../config/contracts';

const distributions = [
  {
    pct: `${TOKEN_DISTRIBUTION.reserve}%`,
    label: 'Reserve Wallet',
    desc: 'Funds real gold and silver sourcing. The backing behind your token.',
  },
  {
    pct: `${TOKEN_DISTRIBUTION.operations}%`,
    label: 'Operations',
    desc: 'Protocol infrastructure, development, and ecosystem maintenance.',
  },
  {
    pct: `${TOKEN_DISTRIBUTION.founder}%`,
    label: 'Founder',
    desc: 'Mission leadership. Transparent. Fixed. Never more.',
  },
  {
    pct: `${TOKEN_DISTRIBUTION.pioneers}%`,
    label: 'Pioneer Wallets',
    desc: '5 genesis pioneers who were here at the beginning.',
  },
];

export function Distribution() {
  return (
    <section id="ecosystem" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">
            Transparent by Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-100 mb-4">
            Every MATIC you send — <span className="text-amber-400 italic">accounted for.</span>
          </h2>
          <p className="text-slate-400 max-w-lg">
            The fund distribution is hardcoded in the smart contract. Immutable. Verifiable. No hidden fees.
          </p>
        </div>

        {/* Distribution Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {distributions.map((item) => (
            <div
              key={item.label}
              className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-5 text-center hover:border-amber-500/30 transition-colors"
            >
              <div className="text-3xl font-light text-amber-400 mb-1">
                {item.pct}
              </div>
              <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
                {item.label}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

