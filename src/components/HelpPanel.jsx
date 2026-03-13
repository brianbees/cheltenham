/**
 * HelpPanel.jsx
 *
 * Route: /help
 *
 * Explains the competition rules, the scoring system, every page in the app,
 * and all the badges / indicators used throughout the UI.
 */

// ── Small reusable pieces ─────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-emerald-700 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Prose({ children }) {
  return <p className="text-gray-700 text-sm leading-relaxed mb-2">{children}</p>;
}

function Badge({ className, children }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
}

function KeyRow({ label, children }) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-gray-200 last:border-0">
      <div className="w-44 shrink-0">{label}</div>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function InlineCode({ children }) {
  return (
    <code className="bg-gray-100 text-emerald-700 text-xs px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function HelpPanel() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 font-sans">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-emerald-700 tracking-tight">Help &amp; Guide</h1>
          <p className="text-gray-500 mt-1 text-sm">
            How the Champion Tipster competition works, and how this app helps you win it
          </p>
        </div>

        {/* ── 1. The competition ── */}
        <Section title="The Competition">
          <Prose>
            The Champion Tipster is an annual competition held on Gold Cup Day at the Cheltenham
            Festival. Each player submits picks for seven races on the day.
          </Prose>

          <SubSection title="How to enter">
            <Prose>
              For each of the seven races you choose <strong className="text-gray-900">three gate
              (cloth) numbers</strong>. Those three gates represent the horses you think will finish
              1st, 2nd, or 3rd — in any order.
            </Prose>
            <Prose>
              You do <strong className="text-gray-900">not</strong> need to predict the exact finishing
              order. Any of your three chosen gates finishing in the top three counts.
            </Prose>
          </SubSection>

          <SubSection title="Scoring — how points are awarded">
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-4">
              <KeyRow
                label={<span className="text-sm font-medium text-gray-700">SP points</span>}
              >
                When one of your gates places, you score points equal to the horse's
                starting price (SP) as a fractional odds value.{' '}
                <br />
                Formula: <InlineCode>decimal SP − 1</InlineCode>.{' '}
                A 10/1 shot (decimal 11.0) scores <strong className="text-emerald-700">10 points</strong>.{' '}
                A 5/2 shot (decimal 3.5) scores <strong className="text-emerald-700">2.5 points</strong>.
              </KeyRow>
              <KeyRow
                label={<span className="text-sm font-medium text-gray-700">Win bonus</span>}
              >
                If the <strong className="text-gray-900">winner</strong> of a race is one of your three
                picked gates, you also receive a{' '}
                <strong className="text-emerald-700">+10 bonus</strong> on top of the SP points.
              </KeyRow>
              <KeyRow
                label={<span className="text-sm font-medium text-gray-700">Jackpot</span>}
              >
                If <strong className="text-gray-900">all three</strong> of your gates place in a single
                race (a perfect pick), you score an additional{' '}
                <strong className="text-emerald-700">+25 jackpot bonus</strong>.
              </KeyRow>
              <KeyRow
                label={<span className="text-sm font-medium text-gray-700">Perfect race score</span>}
              >
                Maximum points for one race ={' '}
                <InlineCode>(SP₁ − 1) + (SP₂ − 1) + (SP₃ − 1) + 10 + 25</InlineCode>
                <br />
                The "Theoretical Max" shown on the Historical Data page is the sum
                of perfect scores across all seven races for that year.
              </KeyRow>
            </div>
          </SubSection>
        </Section>

        {/* ── 2. Pages ── */}
        <Section title="Pages">

          <SubSection title="Historical Data">
            <Prose>
              A year-by-year archive of every Gold Cup Day result stored in the app.
              Each year shows the top-3 finishers for every race, their decimal SPs,
              and the SP-points contribution from each horse.
            </Prose>
            <Prose>
              Use this page to verify the source data is correct before relying on
              any analysis page.
            </Prose>
          </SubSection>

          <SubSection title="Race History">
            <Prose>
              Analyses each race across all historical years to reveal its
              <strong className="text-gray-900"> character</strong> — how predictable or
              unpredictable it tends to be.
            </Prose>
            <Prose>
              Each race card shows the year-by-year top-3 SPs, the total SP points
              available in each year, and summary stats (average SP total, highest/lowest years).
              The race is classified automatically — see the Race Classification section below.
            </Prose>
          </SubSection>

          <SubSection title="Optimiser">
            <Prose>
              Your race-day tool. On the morning of the Festival, enter all the
              runners for a race (gate number, horse name, and odds) and press
              <strong className="text-gray-900"> Optimise</strong>.
            </Prose>
            <Prose>
              The engine evaluates every possible combination of 3 gates from the
              field (<InlineCode>C(n, 3)</InlineCode> combinations) and ranks them
              by <strong className="text-gray-900">Expected Value (EV)</strong> — the
              probability-weighted average score you could expect from each
              three-gate selection.
            </Prose>
            <Prose>
              Odds can be entered as fractional (<InlineCode>10/1</InlineCode>) or
              decimal (<InlineCode>11.0</InlineCode>). The race classification badge
              shown next to the race name is a reminder of how much historical swing
              there is in this race.
            </Prose>
          </SubSection>

          <SubSection title="Backtester">
            <Prose>
              Shows what the historical data can tell us about how well any picking
              strategy would have performed in past years.
            </Prose>
            <Prose>
              The page splits analysis into two tiers:
            </Prose>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-3 ml-2">
              <li>
                <strong className="text-emerald-700">Tier 1 (SP Only)</strong> — analysis
                possible with only result data (winner/placed SPs). Available for all years.
              </li>
              <li>
                <strong className="text-amber-400">Tier 2 (Full)</strong> — full model
                validation, requiring pre-race gate positions and complete field odds.
                Only available for years where full field data has been entered.
              </li>
            </ul>
            <Prose>
              Switch between <strong className="text-gray-900">By Race</strong> (a card per race,
              collapsible year detail) and <strong className="text-gray-900">By Year</strong> (a
              single table summarising every year's total SP points, perfect score,
              and competition winner).
            </Prose>
          </SubSection>
        </Section>

        {/* ── 3. Badges & indicators ── */}
        <Section title="Badges &amp; Indicators">

          <SubSection title="Race classification">
            <Prose>
              Every race is automatically classified based on its average SP total
              across all known years. The classification tells you how much
              "luck vs judgement" is involved.
            </Prose>
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-2">
              <KeyRow
                label={
                  <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-400">
                    Banker Race
                  </Badge>
                }
              >
                Average SP total <strong className="text-gray-900">≤ 20</strong> across historical
                years. Favourites tend to dominate — picking well-fancied horses is likely to
                reward you. A safe, predictable race.
              </KeyRow>
              <KeyRow
                label={
                  <Badge className="bg-amber-950 text-amber-300 border border-amber-800">
                    Judgement Race
                  </Badge>
                }
              >
                Average SP total <strong className="text-gray-900">21 – 40</strong>. A mix of
                form horses and longer-priced runners tend to place. Good each-way form study
                pays off here.
              </KeyRow>
              <KeyRow
                label={
                  <Badge className="bg-rose-950 text-rose-300 border border-rose-800">
                    Swing Race
                  </Badge>
                }
              >
                Average SP total <strong className="text-gray-900">&gt; 40</strong>. Big-priced
                horses regularly feature. The result often swings the whole competition — the
                difference between backing a 33/1 winner and missing it is huge.
              </KeyRow>
            </div>
          </SubSection>

          <SubSection title="Finishing position badges">
            <Prose>
              Used throughout the app to label placed horses.
            </Prose>
            <div className="flex gap-2 flex-wrap mb-2">
              <Badge className="bg-yellow-500 text-yellow-950">1st</Badge>
              <Badge className="bg-gray-400 text-gray-900">2nd</Badge>
              <Badge className="bg-amber-700 text-amber-100">3rd</Badge>
            </div>
            <Prose>
              In tables with numeric-only cells you may see the compact versions:{' '}
              <Badge className="bg-yellow-500 text-yellow-950">1</Badge>{' '}
              <Badge className="bg-gray-400 text-gray-900">2</Badge>{' '}
              <Badge className="bg-amber-700 text-amber-100">3</Badge>
            </Prose>
          </SubSection>

          <SubSection title="SP composition badges (Backtester)">
            <Prose>
              In the Backtester's by-race year detail, a row of coloured single-letter
              badges shows the SP composition of that year's top 3.
            </Prose>
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-2">
              <KeyRow
                label={
                  <Badge className="bg-emerald-700 text-emerald-100">S</Badge>
                }
              >
                <strong className="text-gray-900">Short-priced</strong> — SP ≤ 5/1 (decimal ≤ 6.0).
                A well-backed horse that finished in the frame.
              </KeyRow>
              <KeyRow
                label={
                  <Badge className="bg-amber-700 text-amber-100">M</Badge>
                }
              >
                <strong className="text-gray-900">Mid-priced</strong> — SP between 6/1 and 12/1
                (decimal 7.0 – 13.0). A reasonably fancied horse.
              </KeyRow>
              <KeyRow
                label={
                  <Badge className="bg-rose-700 text-rose-100">B</Badge>
                }
              >
                <strong className="text-gray-900">Big-priced / upset</strong> — SP ≥ 15/1
                (decimal ≥ 16.0). A longer-priced horse that put in a big run.
              </KeyRow>
            </div>
            <Prose>
              The coloured bar in the aggregate card row shows the same split as a
              proportion across all years:{' '}
              <span className="text-emerald-700">green = short</span>,{' '}
              <span className="text-amber-400">amber = mid</span>,{' '}
              <span className="text-rose-600">red = big</span>.
            </Prose>
          </SubSection>

          <SubSection title="Data completeness badges (Backtester)">
            <Prose>
              Shown in the year-detail table inside each race card.
            </Prose>
            <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-2">
              <KeyRow
                label={
                  <Badge className="bg-emerald-900 text-emerald-700 border border-emerald-700">
                    Full
                  </Badge>
                }
              >
                Complete data for this race in this year — gate positions, full pre-race
                field odds, and result. Ready for Tier 2 model testing.
              </KeyRow>
              <KeyRow
                label={
                  <Badge className="bg-blue-900 text-blue-300 border border-blue-700">
                    Partial
                  </Badge>
                }
              >
                Some field/gate data is present but not complete. Tier 1 analysis is
                possible; Tier 2 is not yet reliable.
              </KeyRow>
              <KeyRow
                label={
                  <Badge className="bg-gray-100 text-gray-500 border border-gray-300">
                    SP Only
                  </Badge>
                }
              >
                Only the top-3 result SPs are known. Tier 1 (SP analysis) works fine;
                Tier 2 needs more data.
              </KeyRow>
              <KeyRow
                label={
                  <Badge className="bg-rose-950 text-rose-600 border border-rose-800">
                    Missing
                  </Badge>
                }
              >
                No usable data for this race/year combination.
              </KeyRow>
            </div>
          </SubSection>

          <SubSection title="Year high / low indicators">
            <Prose>
              In the Race History and Backtester year tables, the year with the
              highest total SP points is flagged with{' '}
              <span className="text-emerald-700 font-bold">↑ high</span> and the
              lowest with{' '}
              <span className="text-rose-600 font-bold">↓ low</span>.
              These rows also use a subtle background tint — green for high, red for low.
            </Prose>
          </SubSection>

        </Section>

        {/* ── 4. Key numbers ── */}
        <Section title="Key Numbers at a Glance">
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Win bonus</span>}>
              <strong className="text-emerald-700">+10 points</strong> when your gate wins
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Jackpot bonus</span>}>
              <strong className="text-emerald-700">+25 points</strong> when all 3 of your gates place
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">SP points formula</span>}>
              <InlineCode>decimal SP</InlineCode> per placed horse
              (e.g. 33/1 → 34 pts, Evs → 2 pts)
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Banker threshold</span>}>
              Average SP total <strong className="text-gray-900">≤ 23</strong>
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Judgement threshold</span>}>
              Average SP total <strong className="text-gray-900">24 – 43</strong>
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Swing threshold</span>}>
              Average SP total <strong className="text-gray-900">&gt; 43</strong>
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Short SP</span>}>
              ≤ 5/1 (decimal ≤ 6.0)
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Mid SP</span>}>
              6/1 – 12/1 (decimal 7.0 – 13.0)
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Big / upset SP</span>}>
              ≥ 15/1 (decimal ≥ 16.0)
            </KeyRow>
            <KeyRow label={<span className="text-sm font-medium text-gray-700">Upset rate</span>}>
              % of years where a <strong className="text-gray-900">15/1+ horse</strong> won this race
            </KeyRow>
          </div>
        </Section>

        <p className="text-center text-gray-700 text-xs pb-8">
          Champion Tipster — help &amp; guide
        </p>
      </div>
    </div>
  );
}
