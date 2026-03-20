# RTGS Dashboard Design Prototypes

This is a design exploration project for the Real-Time Game Strategy (RTGS) dashboard. It contains three distinct design variations, each exploring a different visual direction while maintaining the same core functionality.

## Quick Start

```bash
npm install
npm run dev
```

Then visit:
- **Landing Page:** http://localhost:3000
- **Minimal:** http://localhost:3000/minimal
- **Dense:** http://localhost:3000/dense
- **Bold:** http://localhost:3000/bold

## Design Variations

### Variation A — Minimal / Clean (`/minimal`)

**Philosophy:** Clarity through simplicity

**Design Choices:**
- Light mode default with generous white space
- Clean typography with minimal visual noise
- Simplified top navigation
- Focus on readability and data hierarchy
- Subtle shadows and borders
- Monochromatic accent colors (grays, blacks)

**Best For:**
- New users who need intuitive navigation
- Quick glances during live matches
- Print-friendly reports
- Users who prefer light interfaces

**Key Patterns:**
- Large scoreboard as focal point
- Grouped information in cards
- Progressive disclosure of complex data
- High contrast for accessibility

---

### Variation B — Data-Dense / Professional (`/dense`)

**Philosophy:** Information at a glance

**Design Choices:**
- Dark mode optimized for long sessions
- Maximum information density
- 12-column grid layout
- Compact widgets and panels
- Color-coded status indicators (emerald/amber/red)
- Small text sizes to fit more data

**Best For:**
- Professional analysts who need all data visible
- Long gaming/viewing sessions (dark mode)
- Users comfortable with dense interfaces
- Quick comparison across multiple metrics

**Key Patterns:**
- Compact header with navigation tabs
- Side-by-side pitch view and player panels
- Dual progress bars for comparison
- Scroll areas for lengthy lists
- Icon + value stat displays

---

### Variation C — Modern / Bold (`/bold`)

**Philosophy:** Visual identity and emotional engagement

**Design Choices:**
- Gradient backgrounds (purple, cyan, fuchsia)
- Glassmorphism effects (backdrop-blur, transparency)
- Floating navigation pill
- Animated background orbs
- Gradient player markers on pitch
- Bold typography and large numbers

**Best For:**
- Marketing and presentations
- Users who value aesthetics
- Modern, tech-forward branding
- Showcase and demo scenarios

**Key Patterns:**
- Floating navigation bar
- Hero-style scoreboard
- Gradient accents throughout
- Large, impactful numbers
- Soft shadows and glows
- Interactive hover states

---

## Shared Components

All three variations use the same core components:

| Component | Description |
|-----------|-------------|
| PitchView | Soccer pitch with player positions, passing patterns, and heatmaps |
| Scoreboard | Match score, time, and momentum |
| xG Chart | Expected goals timeline over 90 minutes |
| Player Load | Stamina and fatigue indicators |
| Performance Matrix | Player ratings and impact scores |
| Match Events | Timeline of goals, cards, and chances |

## Mock Data

All variations share the same mock data structure located in `src/lib/mock-data.ts`:

- 12 players in 4-3-3 formation
- Match info (score, time, momentum)
- xG timeline data points
- Match events (goals, cards, subs, chances)
- Passing pattern weights

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Components:** Shadcn UI
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Charts:** Recharts
- **Typography:** Inter font

## Interesting UI Patterns Discovered

1. **Floating Navigation (Bold)** — The pill-style floating nav creates a modern, app-like feel and works well with gradient backgrounds.

2. **Dual Progress Bars (Dense)** — Showing fatigue and impact side-by-side allows quick player assessment without hovering.

3. **Minimal Pitch Markings** — Reducing line opacity on the pitch keeps focus on players while maintaining field context.

4. **Gradient Player Markers** — Using gradients on player positions creates visual hierarchy and adds polish without being distracting.

5. **Hero Scoreboard (Bold)** — Treating the score as a large, central hero element creates emotional impact for live viewing.

6. **Compact Stat Grid (Dense)** — The small stat boxes with icons and values pack information efficiently without overwhelming.

## Next Steps

Potential improvements for the production dashboard:

1. **Theme Switching** — Allow users to toggle between light/dark modes regardless of chosen variation
2. **Responsive Optimization** — Better mobile layouts for the dense variation
3. **Animation** — Add smooth transitions between player positions when data updates
4. **Customization** — Let users customize widget placement and sizing
5. **Real-time Updates** — Connect to live data feeds instead of mock data

## Original Project

This prototype is based on the original RTGS dashboard at:
`/projects/rtgs_dashboard`

The original implementation is preserved and can be used for reference or as the production version.