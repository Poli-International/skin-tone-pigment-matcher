const TYPES = {
  I:   { name: 'Type I — Very Fair', summary: 'All pigments deliver strong initial contrast. The full colour palette is viable. Warm tones (red, orange) may shift or fade faster under UV exposure. White ink heals vibrantly on very fair skin but fades significantly within 2–5 years. Greatest long-term risk is UV fading rather than poor visibility.' },
  II:  { name: 'Type II — Fair', summary: 'Similar to Type I — very broad colour palette works well. Yellow can appear washed-out as a standalone; neon shades are vivid. Excellent candidate for coloured and multi-pigment work. Black and dark blue offer the best long-term durability.' },
  III: { name: 'Type III — Medium', summary: 'Most colours perform well. White ink contrast begins to soften; very pale pigments may need heavier saturation to achieve the same initial result. Black and dark blue retain excellent longevity. Some warm tones may shift slightly over time.' },
  IV:  { name: 'Type IV — Olive / Light Brown', summary: 'Warm pigments (red, orange) risk appearing muted as skin melanin adds warmth to the overall tone. White ink fades to near-invisible after healing. Black and blue remain the strongest choices. Colour work is achievable but expect lower long-term saturation and discuss realistic outcomes with your artist.' },
  V:   { name: 'Type V — Brown', summary: 'Light pigments (white, yellow, light pink) are largely ineffective on this skin type. Coloured work is restricted to high-contrast pigments. Black, dark blue, and deep green are the most reliable. Ensure your artist has demonstrable experience tattooing darker skin tones before committing to a complex design.' },
  VI:  { name: 'Type VI — Deep / Dark Brown to Black', summary: 'Only the highest-contrast pigments retain long-term visibility. Black ink still works — the result is a variation in texture and sheen rather than colour contrast. Coloured work, especially warm tones, is not recommended. Artist experience tattooing deep skin tones is critical, as is careful discussion of realistic expectations.' },
};

const INK_COLORS = [
  {
    name: 'Black',
    swatch: '#1a1a1a',
    vis:   [5, 5, 5, 5, 4, 3],
    aging: [2, 2, 2, 2, 2, 2],
    notes: [
      'Maximum contrast on very fair skin. Extremely durable — the gold standard for longevity.',
      'Excellent contrast and longevity across all placement types.',
      'Strong performer. Softens very slightly over decades but remains clearly defined.',
      'Still very visible. Fades more slowly than any pigmented ink.',
      'Readable, though lighter areas show it better. Fades to dark grey over years.',
      'Visible primarily as textural contrast and a sheen change rather than colour contrast against dark skin.',
    ],
  },
  {
    name: 'Grey / Black & Grey',
    swatch: '#888888',
    vis:   [4, 4, 4, 3, 2, 1],
    aging: [3, 3, 3, 3, 4, 4],
    notes: [
      'Good contrast; heals to silver-grey tones. Excellent for realism and portraiture.',
      'Reliable medium for fine detail and portraiture work.',
      'Slight warm shift over time. Mid-grey tones still clear; lighter washes soften.',
      'Contrast reduces noticeably. Wash-out effect in lighter grey areas over time.',
      'Mid-tones can disappear against warm skin undertones. Only darkest grey holds.',
      'Poor to no visibility. Effectively invisible in lighter grey tones after healing.',
    ],
  },
  {
    name: 'White',
    swatch: '#f0f0f0',
    vis:   [4, 3, 2, 1, 1, 1],
    aging: [5, 5, 5, 5, 4, 4],
    notes: [
      'Clean highlight effect immediately post-healing. Fades significantly within 2–5 years — plan for touch-ups.',
      'Subtle highlight and accent use only. Near-invisible in most clients after 3–5 years.',
      'Very short-lived contrast. Generally not recommended as a standalone element.',
      'Near-invisible after healing. Avoid unless your artist advises a specific use case.',
      'Ineffective. Heals undetectable on most brown skin tones.',
      'Not recommended under any circumstances.',
    ],
  },
  {
    name: 'Red',
    swatch: '#cc2200',
    vis:   [5, 5, 4, 3, 2, 1],
    aging: [3, 3, 3, 4, 5, 5],
    notes: [
      'Vivid and sharp. Red pigment is the most allergenic family — patch test strongly recommended.',
      'Bold initial result. Patch test advised before any red ink session.',
      'Good initial result; fades warmer over time. Patch test strongly advised.',
      'Risk of orange-shift as skin warmth neutralises red. Vibrancy fades quickly.',
      'Muted against warm brown undertones. Short-lived vibrancy at best.',
      'Not recommended. Near-invisible after healing in most cases.',
    ],
  },
  {
    name: 'Orange',
    swatch: '#e05c00',
    vis:   [5, 4, 4, 3, 1, 1],
    aging: [4, 4, 4, 5, 5, 5],
    notes: [
      'Vibrant on fair skin. Fades faster than black or blue — plan for touch-ups.',
      'Good initial vibrancy; moderate longevity. Best used as an accent, not a fill.',
      'Acceptable in multi-colour work. UV exposure accelerates fade noticeably.',
      'Conflicts with warm skin undertones. Appears muted and fades rapidly.',
      'Not recommended. Blends into skin tone within the first year.',
      'Ineffective on deep skin tones.',
    ],
  },
  {
    name: 'Yellow',
    swatch: '#c8a000',
    vis:   [3, 3, 2, 1, 1, 1],
    aging: [5, 5, 5, 5, 5, 5],
    notes: [
      'Highlight and accent use only — never a primary fill. Fades to near-invisible within a few years.',
      'Only viable as a subtle accent in multi-colour work. No standalone longevity.',
      'Very poor standalone viability. Only usable where another pigment provides the visual anchor.',
      'Invisible after healing on most olive-toned skin. Not recommended.',
      'Entirely ineffective.',
      'Entirely ineffective.',
    ],
  },
  {
    name: 'Green',
    swatch: '#1a7a2e',
    vis:   [4, 4, 4, 3, 2, 2],
    aging: [3, 3, 3, 3, 4, 4],
    notes: [
      'Forest and dark greens hold well. Lime and bright greens fade faster — use in accents.',
      'Good performer. Darker formulations recommended for long-term work.',
      'Reliable in darker shades. Bright greens soften noticeably after several years.',
      'Some contrast reduction. Dark forest greens remain the most viable choice.',
      'Only deep, dark greens show reliable contrast. Bright greens ineffective.',
      'Deep forest green retains marginal visibility. All other greens effectively invisible.',
    ],
  },
  {
    name: 'Blue',
    swatch: '#1a5fcc',
    vis:   [5, 5, 5, 4, 3, 2],
    aging: [2, 2, 2, 3, 3, 4],
    notes: [
      'Excellent across royal to navy tones. One of the most durable pigment families alongside black.',
      'Highly reliable. Light blues fade somewhat faster than dark — navy lasts longest.',
      'Strong performer. Dark navy remains a viable long-term choice across medium skin tones.',
      'Good visibility retained. Navy and dark cobalt are the most durable options here.',
      'Darker blues maintain reasonable contrast. Sky blue and light blue fade significantly.',
      'Navy and dark cobalt retain some contrast. Lighter blues are ineffective.',
    ],
  },
  {
    name: 'Purple',
    swatch: '#6633aa',
    vis:   [4, 4, 3, 3, 2, 2],
    aging: [3, 3, 3, 4, 4, 4],
    notes: [
      'Rich purples hold well. Lavender and lilac tones fade fastest — best as accents.',
      'Good medium-term result. Deep purples recommended over lighter shades.',
      'Acceptable overall. Cooler shades may shift slightly warmer over time.',
      'Moderate fade rate. Deep purple retains contrast better than lilac or lavender.',
      'Only deep violet delivers reliable contrast. Lighter shades fade to near-invisible.',
      'Deep violet has marginal visibility. Lighter purples are effectively invisible.',
    ],
  },
];

const TYPE_ORDER = ['I','II','III','IV','V','VI'];
const VIS_LABELS = ['', 'Poor', 'Weak', 'Moderate', 'Good', 'Excellent'];

function barHtml(value, max, cls) {
  const pct = Math.round((value / max) * 100);
  return `<div class="bar-wrap"><div class="bar ${cls}" style="width:${pct}%"></div></div><span class="bar-num">${value}/${max}</span>`;
}

function render(typeKey) {
  const type = TYPES[typeKey];
  const idx = TYPE_ORDER.indexOf(typeKey);

  document.getElementById('type-name').textContent = typeKey;
  document.getElementById('type-summary').textContent = type.summary;

  document.getElementById('ink-grid').innerHTML = INK_COLORS.map(ink => `
    <div class="ink-card">
      <div class="ink-header">
        <span class="ink-swatch" style="background:${ink.swatch}"></span>
        <span class="ink-name">${ink.name}</span>
        <span class="ink-vis-badge vis-${ink.vis[idx]}">${VIS_LABELS[ink.vis[idx]]}</span>
      </div>
      <div class="ink-metrics">
        <div class="metric-row">
          <span class="metric-lbl">Visibility</span>
          ${barHtml(ink.vis[idx], 5, 'bar-vis')}
        </div>
        <div class="metric-row">
          <span class="metric-lbl">Fade rate</span>
          ${barHtml(ink.aging[idx], 5, 'bar-fade')}
        </div>
      </div>
      <p class="ink-note">${ink.notes[idx]}</p>
    </div>`).join('');

  document.getElementById('results').style.display = '';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.getElementById('skin-grid').addEventListener('click', e => {
  const btn = e.target.closest('.skin-btn');
  if (!btn) return;
  document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render(btn.dataset.type);
});
