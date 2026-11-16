// One small chart per project, drawn in SVG and animated on scroll by anime.js
// (see playViz in lib/motion.js). They are schematic illustrations of what each
// project measures, not plots of real figures.

const W = 400;
const H = 260;
const BASE = 214;
const bar = { transformBox: "fill-box", transformOrigin: "50% 100%" };
const dot = { transformBox: "fill-box", transformOrigin: "50% 50%" };

function Frame({ children }) {
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-hidden="true">
            <defs>
                <linearGradient id="viz-lav" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#C6B0FF" />
                    <stop offset="1" stopColor="#7F4DF2" />
                </linearGradient>
                <linearGradient id="viz-peri" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#A9B3FA" stopOpacity=".9" />
                    <stop offset="1" stopColor="#A9B3FA" stopOpacity=".25" />
                </linearGradient>
            </defs>
            {/* baseline and faint gridlines */}
            {[70, 118, 166].map((y) => (
                <line key={y} x1="28" x2={W - 28} y1={y} y2={y} stroke="#C7CEFF" strokeOpacity=".12" strokeDasharray="2 6" />
            ))}
            <line x1="28" x2={W - 28} y1={BASE} y2={BASE} stroke="#C7CEFF" strokeOpacity=".4" />
            {children}
        </svg>
    );
}

const pathFrom = (pts) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

function Pos() {
    const heights = [118, 86, 132, 34, 104, 150, 72, 124];
    const step = 41;
    const trend = heights.map((_, i) => [48 + i * step + 13, [150, 138, 142, 120, 112, 92, 84, 60][i]]);
    return (
        <Frame>
            {heights.map((h, i) => (
                <rect key={i} data-bar x={48 + i * step} y={BASE - h} width="26" height={h} rx="5" fill={i === 3 ? "#F4C2FF" : "url(#viz-peri)"} style={bar} />
            ))}
            {/* the low bar is the one that needs restocking */}
            <g data-fade>
                <circle cx={48 + 3 * step + 13} cy={BASE - 34 - 16} r="9" fill="none" stroke="#F4C2FF" strokeWidth="1.5" />
                <path d={`M${48 + 3 * step + 13} ${BASE - 34 - 21}v6m0 3v.5`} stroke="#F4C2FF" strokeWidth="1.8" strokeLinecap="round" />
            </g>
            <path data-line d={pathFrom(trend)} fill="none" stroke="#C6B0FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {trend.map(([x, y], i) => (
                <circle key={i} data-dot cx={x} cy={y} r="4.5" fill="#14123A" stroke="#C6B0FF" strokeWidth="2.5" style={dot} />
            ))}
        </Frame>
    );
}

function Pareto() {
    const heights = [158, 122, 92, 66, 48, 36, 27, 21, 16, 12];
    const step = 33;
    const total = heights.reduce((a, b) => a + b, 0);
    let run = 0;
    const cumulative = heights.map((h, i) => {
        run += h;
        return [44 + i * step + 11, BASE - (run / total) * 168];
    });
    const y80 = BASE - 0.8 * 168;
    return (
        <Frame>
            {heights.map((h, i) => (
                <rect key={i} data-bar x={44 + i * step} y={BASE - h} width="22" height={h} rx="4" fill={i < 3 ? "url(#viz-lav)" : "url(#viz-peri)"} style={bar} />
            ))}
            <g data-fade>
                <line x1="28" x2={W - 28} y1={y80} y2={y80} stroke="#F4C2FF" strokeWidth="1.2" strokeDasharray="5 5" />
                <text x={W - 30} y={y80 - 8} textAnchor="end" fontSize="13" fontWeight="600" fill="#F4C2FF" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                    80%
                </text>
            </g>
            <path data-line d={pathFrom(cumulative)} fill="none" stroke="#EDE4FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {cumulative.map(([x, y], i) => (
                <circle key={i} data-dot cx={x} cy={y} r={i === 2 ? 6 : 3.5} fill={i === 2 ? "#F4C2FF" : "#14123A"} stroke="#EDE4FF" strokeWidth="2" style={dot} />
            ))}
        </Frame>
    );
}

function Dex() {
    const price = [
        [30, 176], [52, 168], [72, 182], [94, 150], [114, 158], [136, 128], [158, 140], [180, 112],
        [202, 124], [224, 96], [246, 118], [268, 84], [290, 96], [312, 66], [334, 78], [370, 52],
    ];
    const average = price.map(([x], i) => {
        const win = price.slice(Math.max(0, i - 3), i + 1);
        return [x, win.reduce((a, [, y]) => a + y, 0) / win.length + 10];
    });
    const buys = [2, 6, 10];
    const sells = [5, 9, 13];
    return (
        <Frame>
            <path data-line d={pathFrom(average)} fill="none" stroke="#A9B3FA" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path data-line d={pathFrom(price)} fill="none" stroke="#C6B0FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {buys.map((i) => (
                <path key={`b${i}`} data-dot d={`M${price[i][0]} ${price[i][1] + 12}l7 12h-14z`} fill="#EDE4FF" style={dot} />
            ))}
            {sells.map((i) => (
                <path key={`s${i}`} data-dot d={`M${price[i][0]} ${price[i][1] - 12}l7 -12h-14z`} fill="#F4C2FF" style={dot} />
            ))}
        </Frame>
    );
}

function Kinetz() {
    const week = [62, 84, 70, 96, 78, 104, 88];
    // Two progress rings (calories outside, protein inside); each arc starts at 12 o'clock.
    const arc = (r, frac) => {
        const a = frac * Math.PI * 2 - Math.PI / 2;
        const x = 112 + r * Math.cos(a);
        const y = 126 + r * Math.sin(a);
        return `M112 ${126 - r}A${r} ${r} 0 ${frac > 0.5 ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
    };
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-hidden="true">
            <defs>
                <linearGradient id="viz-peri-k" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#A9B3FA" stopOpacity=".9" />
                    <stop offset="1" stopColor="#A9B3FA" stopOpacity=".25" />
                </linearGradient>
            </defs>
            <circle cx="112" cy="126" r="74" fill="none" stroke="#C7CEFF" strokeOpacity=".14" strokeWidth="14" />
            <circle cx="112" cy="126" r="50" fill="none" stroke="#C7CEFF" strokeOpacity=".14" strokeWidth="14" />
            <path data-line d={arc(74, 0.78)} fill="none" stroke="#C6B0FF" strokeWidth="14" strokeLinecap="round" />
            <path data-line d={arc(50, 0.62)} fill="none" stroke="#F4C2FF" strokeWidth="14" strokeLinecap="round" />
            <line x1="226" x2={W - 28} y1={BASE - 20} y2={BASE - 20} stroke="#C7CEFF" strokeOpacity=".4" />
            {week.map((h, i) => (
                <rect key={i} data-bar x={232 + i * 20} y={BASE - 20 - h} width="12" height={h} rx="4" fill={i === 5 ? "#C6B0FF" : "url(#viz-peri-k)"} style={bar} />
            ))}
            {/* target line the bars adapt toward */}
            <path data-line d={`M228 ${BASE - 96}C270 ${BASE - 96} 300 ${BASE - 112} ${W - 30} ${BASE - 116}`} fill="none" stroke="#EDE4FF" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

const charts = { pos: Pos, superstore: Pareto, dex: Dex, kinetz: Kinetz };

export default function ProjectViz({ kind }) {
    const Chart = charts[kind];
    return Chart ? <Chart /> : null;
}
