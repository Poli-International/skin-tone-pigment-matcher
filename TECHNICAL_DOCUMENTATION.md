# Skin Tone & Pigment Visibility Matcher - Technical Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Schemas](#data-schemas)
3. [Calculation / Logic Algorithms](#calculation--logic-algorithms)
4. [API Reference](#api-reference)
5. [Integration Guide](#integration-guide)
6. [Customization](#customization)
7. [Performance](#performance)
8. [Browser Compatibility](#browser-compatibility)
9. [Security](#security)
10. [Version History](#version-history)
11. [Support / Contact](#support--contact)

---

## Architecture Overview

### Technology Stack

- **HTML5** - Semantic markup with ARIA-compatible structure
- **CSS3** - Single stylesheet (`/tools/skin-tone-pigment-matcher/css/style.css`)
- **Vanilla JavaScript (ES6)** - Single script (`/tools/skin-tone-pigment-matcher/js/app.js`)
- **No external dependencies** - Zero frameworks, libraries, or CDN resources

### File Structure

```
skin-tone-pigment-matcher/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

### Component / Logic Breakdown

The tool consists of three logical layers:

1. **Presentation Layer** (`index.html`)
   - Skin type selector grid (6 buttons, one per Fitzpatrick type)
   - Results container (hidden by default, shown on selection)
   - Disclaimer footer

2. **Data Layer** (`app.js`)
   - `TYPES` constant - Fitzpatrick skin type definitions and summaries
   - `INK_COLORS` constant - 9 ink color objects with visibility, fade, and notes per skin type
   - `TYPE_ORDER` constant - Ordered array of type keys for index mapping
   - `VIS_LABELS` constant - Human-readable visibility labels

3. **Logic Layer** (`app.js`)
   - `barHtml()` - Generates bar chart markup
   - `render()` - Builds and displays ink performance cards
   - Event handler - Click delegation on skin grid

---

## Data Schemas

### `TYPES` Object

Keyed by Fitzpatrick type string (`I` through `VI`). Each value is an object:

```javascript
{
  name: "Type I, Very Fair",        // string - Display name
  summary: "All pigments deliver..."  // string - Clinical summary paragraph
}
```

**Example value (Type I):**

```javascript
{
  name: "Type I, Very Fair",
  summary: "All pigments deliver strong initial contrast. The full colour palette is viable. Warm tones (red, orange) may shift or fade faster under UV exposure. White ink heals vibrantly on very fair skin but fades significantly within 2–5 years. Greatest long-term risk is UV fading rather than poor visibility."
}
```

### `INK_COLORS` Array

Array of 9 objects, each representing a tattoo ink color:

```javascript
{
  name: "Black",                      // string - Ink color name
  swatch: "#1a1a1a",                 // string - Hex color for visual swatch
  vis: [5, 5, 5, 5, 4, 3],          // number[] - Visibility score (1-5) per Fitzpatrick type I-VI
  aging: [2, 2, 2, 2, 2, 2],        // number[] - Fade rate score (1-5) per Fitzpatrick type I-VI
  notes: [                           // string[] - Artist guidance per Fitzpatrick type I-VI
    "Maximum contrast on very fair skin...",
    "Excellent contrast and longevity...",
    // ... 6 entries total
  ]
}
```

**Score ranges:**
- Visibility: 1 (Poor) to 5 (Excellent)
- Fade rate: 1 (Slowest fade) to 5 (Fastest fade)

### `TYPE_ORDER` Array

```javascript
["I", "II", "III", "IV", "V", "VI"]
```

Used to map Fitzpatrick type strings to array indices for accessing `vis`, `aging`, and `notes` arrays within each ink color object.

### `VIS_LABELS` Array

```javascript
["", "Poor", "Weak", "Moderate", "Good", "Excellent"]
```

Index 0 is empty (unused). Indexes 1-5 map directly to visibility scores.

---

## Calculation / Logic Algorithms

### `barHtml(value, max, cls)`

**Purpose:** Generates HTML markup for a horizontal bar chart showing a score out of a maximum value.

**Parameters:**
- `value` (number) - Current score (1-5)
- `max` (number) - Maximum possible score (always 5 in this tool)
- `cls` (string) - CSS class name for bar styling (`bar-vis` or `bar-fade`)

**Algorithm:**
1. Calculate percentage: `Math.round((value / max) * 100)`
2. Return HTML string containing:
   - A wrapper `<div class="bar-wrap">`
   - A bar `<div>` with width set to the calculated percentage
   - A numeric label showing `value/max`

**Example output for `barHtml(4, 5, 'bar-vis')`:**

```html
<div class="bar-wrap">
  <div class="bar bar-vis" style="width:80%"></div>
</div>
<span class="bar-num">4/5</span>
```

### `render(typeKey)`

**Purpose:** Main rendering function that builds the complete results display for a selected Fitzpatrick skin type.

**Parameters:**
- `typeKey` (string) - One of `"I"`, `"II"`, `"III"`, `"IV"`, `"V"`, `"VI"`

**Algorithm:**
1. Look up the type object from `TYPES[typeKey]`
2. Find the array index: `TYPE_ORDER.indexOf(typeKey)`
3. Update DOM elements:
   - `#type-name` - Set to the type key string
   - `#type-summary` - Set to the type's summary text
4. Build ink card HTML by mapping over `INK_COLORS`:
   - For each ink object, access `vis[idx]`, `aging[idx]`, and `notes[idx]`
   - Map visibility score to label using `VIS_LABELS[vis[idx]]`
   - Generate bar charts using `barHtml()`
5. Set `#ink-grid` innerHTML to the concatenated card markup
6. Show results container (`display: ''`)
7. Scroll results into view with smooth behavior

### Event Handler (Click Delegation)

**Purpose:** Handles user clicks on the skin type selector grid.

**Behavior:**
1. Listen for click events on `#skin-grid`
2. Find the closest ancestor with class `.skin-btn` using `e.target.closest('.skin-btn')`
3. If no button found, exit
4. Remove `active` class from all `.skin-btn` elements
5. Add `active` class to the clicked button
6. Call `render(btn.dataset.type)` with the button's `data-type` attribute value

---

## API Reference

The tool exposes no public API or global functions. All functions are scoped within the script execution context.

### Internal Functions

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `barHtml(value, max, cls)` | `value` (number), `max` (number), `cls` (string) | String (HTML) | Generates bar chart markup |
| `render(typeKey)` | `typeKey` (string: I-VI) | void | Renders ink performance cards |

### Internal Constants

| Constant | Type | Description |
|----------|------|-------------|
| `TYPES` | Object | Fitzpatrick skin type definitions |
| `INK_COLORS` | Array | 9 ink color data objects |
| `TYPE_ORDER` | Array | Ordered type keys for index mapping |
| `VIS_LABELS` | Array | Visibility score labels |

### Event Handlers

| Element | Event | Handler |
|---------|-------|---------|
| `#skin-grid` | `click` | Anonymous function with delegation to `.skin-btn` |

---

## Integration Guide

### Standalone Embedding

The tool is fully self-contained and can be embedded via iframe:

```html
<iframe
  src="https://poliinternational.com/tools/skin-tone-pigment-matcher/"
  width="100%"
  height="800"
  frameborder="0"
  title="Skin Tone & Pigment Visibility Matcher"
  loading="lazy">
</iframe>
```

### Theme Support

The tool supports iframe communication for theme synchronization:

```javascript
// From parent window - send theme to iframe
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({
  type: 'poli-theme',
  light: true   // true for light theme, false for dark
}, '*');
```

The tool listens for `message` events with `e.data.type === 'poli-theme'` and sets `data-theme` attribute on the document root element accordingly.

### Dependencies

- **Zero external dependencies**
- No jQuery, React, or any third-party libraries
- No external fonts or icon libraries
- No API calls or network requests

---

## Customization

### Modifying Ink Colors

Edit the `INK_COLORS` array in `js/app.js`:

```javascript
// Add a new ink color
{
  name: "Custom Color",
  swatch: "#ff6600",
  vis: [5, 4, 3, 2, 1, 1],
  aging: [3, 3, 4, 4, 5, 5],
  notes: [
    "Note for Type I",
    "Note for Type II",
    "Note for Type III",
    "Note for Type IV",
    "Note for Type V",
    "Note for Type VI"
  ]
}
```

### Modifying Skin Types

Edit the `TYPES` object in `js/app.js` to update summaries or add new types.

### Styling

All visual styling is controlled via `css/style.css`. Key CSS custom properties used:

- `--swatch` - Set inline on each skin button for the color swatch
- `data-theme` attribute on `<html>` - Controls light/dark mode

---

## Performance

- **Single DOM update** - All ink cards are built as a single HTML string and injected once
- **No reflows during rendering** - Results container is hidden until render is complete
- **Minimal JavaScript footprint** - ~100 lines of code, no loops beyond array mapping
- **No network requests** - All data is hardcoded in the script
- **CSS transitions** - Smooth scroll behavior uses native `scrollIntoView`

---

## Browser Compatibility

- **ES6 Features Used:**
  - Arrow functions
  - Template literals
  - `const` and `let`
  - `Array.map()`
  - `Math.round()`
  - `e.target.closest()`
  - `scrollIntoView()`
  - `window.postMessage()` / `window.addEventListener('message')`

- **Supported Browsers:**
  - Chrome 49+
  - Firefox 52+
  - Safari 10+
  - Edge 14+
  - Opera 36+

- **Not Supported:**
  - Internet Explorer (no ES6 support)

---

## Security

### Input Handling

- **No user input fields** - The tool uses only button clicks
- **No form submissions** - No data is sent to any server
- **No URL parameters** - No query string or hash parsing
- **No localStorage or cookies** - No client-side storage

### XSS Prevention

- All dynamic content is set via `textContent` (safe) or `innerHTML` with controlled template literals
- The only `innerHTML` usage is for ink card markup, which is constructed from hardcoded data arrays
- No user-supplied strings are ever rendered as HTML
- Button `data-type` attributes are validated by lookup in `TYPES` object before rendering

### iframe Security

- The tool sets `<meta name="robots" content="noindex, nofollow">` to prevent search indexing when embedded
- Theme communication uses `window.postMessage` with origin validation (currently accepts all origins via `'*'`)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Initial release | Skin tone and pigment visibility matcher with 9 ink colors and 6 Fitzpatrick skin types |

---

## Support / Contact

For technical issues, feature requests, or questions about this tool:

- **Email:** support@poliinternational.com
- **Website:** https://poliinternational.com
- **Tool URL:** https://poliinternational.com/tools/skin-tone-pigment-matcher/

---

*Documentation generated from source code version 1.0.0*
