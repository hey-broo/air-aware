

## Admin Dashboard - Recommended Measures Panel

Add a new "Recommended Actions" card section to the Admin Dashboard that dynamically shows 3-4 pollution control measures based on the selected city's AQI level. This section will only appear on the Admin Dashboard, making it visually distinct from the User Dashboard.

### What will be added

A new component `RecommendedActions.tsx` that displays actionable policy measures for the pollution control department. The measures will be AQI-driven:

**When AQI > 200 (Severe):**
- Enforce Odd-Even Vehicle Policy
- Shut down non-essential industrial units
- Ban firecrackers and open burning (festival-aware)
- Deploy water sprinklers and anti-smog guns

**When AQI 150-200 (Unhealthy):**
- Restrict heavy diesel vehicles in city limits
- Issue public health advisory for sensitive groups
- Ban construction activities during peak hours
- Increase public transport frequency

**When AQI < 150 (Moderate/Good):**
- Monitor industrial emissions compliance
- Promote carpool and public transport campaigns
- Schedule road dust suppression drives
- Review upcoming festival preparedness

Each measure will show as a card with an icon, title, short description, and a priority tag (Immediate / Recommended / Preventive).

### Technical Details

**New file:** `src/components/RecommendedActions.tsx`
- Accepts `city: City` as prop
- Returns a grid of 4 action cards based on AQI thresholds
- Uses lucide icons (Car, Factory, Flame, Droplets, Truck, Shield, etc.)
- Styled with existing Card components and color-coded priority badges

**Modified file:** `src/pages/AdminDashboard.tsx`
- Import and place `RecommendedActions` between the AlertBanner and View Toggle sections
- Pass `selectedCity` as prop

No backend changes needed - this is purely a frontend UI addition.
