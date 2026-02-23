

# Project Update Plan: Virtual Pollution Intelligence Grid

## Overview

This plan adds authentication (admin/user roles), an AI-powered chat panel for admins using Lovable AI (Gemini), fixes the city/state dropdown, expands the city list, improves map updates, and polishes the UI -- all without rebuilding the core architecture.

---

## Phase 1: Enable Lovable Cloud

Before any backend work, Lovable Cloud must be enabled to support edge functions and the AI gateway.

- Enable Lovable Cloud on the project
- This provides Supabase infrastructure for edge functions and the pre-configured `LOVABLE_API_KEY`

---

## Phase 2: Authentication (Client-Side Mock Login)

Since there's no existing auth system and the user wants hardcoded credentials (`admin/123`, `user/123`), implement a simple client-side auth context. No database required.

### New files:
- **`src/contexts/AuthContext.tsx`** -- React context providing `user`, `login()`, `logout()`, and `role` (admin/user)
- **`src/pages/Login.tsx`** -- Clean login page with username/password fields, error handling, and redirect logic
- **`src/components/ProtectedRoute.tsx`** -- Route wrapper that redirects unauthenticated users to `/login`

### Changes:
- **`src/App.tsx`** -- Wrap app in `AuthProvider`, add routes for `/login`, `/admin`, `/dashboard`
- **`src/components/Header.tsx`** -- Add user avatar/role badge and logout button

### Auth logic:
- Credentials stored in a simple map: `{ admin: { password: "123", role: "admin" }, user: { password: "123", role: "user" } }`
- Session stored in React state (resets on refresh -- simple and safe for a demo)
- Admin users see the Admin Dashboard; regular users see the User Dashboard

---

## Phase 3: Fix City/State Dropdown

### Problem:
The current `CitySelector` uses a custom dropdown that may have z-index and interaction issues.

### Solution:
- Refactor to use proper Radix `Select` or `Popover` components from the existing UI library for reliable dropdown behavior
- Ensure the dropdown has `z-50` and opaque `bg-card` background (not transparent)
- On city change, all dependent components (map, stats, alerts, graphs) already react via props -- verify this chain works

### Expand data:
- **`src/data/mockData.ts`** -- Add 15-20 more Indian cities across additional states (e.g., Hyderabad, Pune, Patna, Varanasi, Kochi, Guwahati, Indore, Nagpur, Visakhapatnam, Coimbatore, Surat, Thiruvananthapuram)
- Add corresponding states and zone data generators

---

## Phase 4: Admin Dashboard with AI Chat

### New files:
- **`supabase/functions/chat/index.ts`** -- Edge function that calls Lovable AI gateway with a system prompt specialized for pollution analysis
- **`supabase/config.toml`** -- Register the chat function with `verify_jwt = false`
- **`src/pages/AdminDashboard.tsx`** -- Admin-only dashboard page with:
  - City selector (shared component)
  - Stats bar and alerts (reused)
  - AI Chat panel (main new feature)
- **`src/components/AIChatPanel.tsx`** -- Chat component with:
  - Streaming SSE responses from the edge function
  - Auto-includes selected city/state context in every message
  - Prediction buttons for 6h / 12h / 24h pollution forecasts
  - Policy insights mode: bullet-point analysis of previous solutions, success/failure, and new recommendations
  - Markdown rendering of responses

### Edge function system prompt:
The system prompt will instruct the AI to:
- Act as a pollution intelligence analyst
- Read the city name, current AQI, and zone data provided in user messages
- Provide predictions in simple language
- For policy insights: list previous environmental measures for that region, evaluate outcomes, suggest alternatives if they failed
- Always respond with structured bullet points

### Chat flow:
1. User selects a city -- context auto-updates
2. User clicks "6h Prediction" or types a question
3. Frontend sends message + city context to edge function
4. Edge function streams response from Lovable AI
5. Tokens render progressively in the chat panel

---

## Phase 5: User Dashboard (Simple Language)

### New file:
- **`src/pages/UserDashboard.tsx`** -- Simplified dashboard for regular users:
  - City selector
  - Large, clear health advisory message (e.g., "Air quality is poor today. Avoid outdoor exercise.")
  - Color-coded alert cards with icons and plain language
  - Map view (default) with graph view toggle
  - No technical jargon -- labels like "Air Quality: Bad" instead of "AQI: 287"
  - What-If simulator (reused)

---

## Phase 6: Visualization & Map Improvements

### Changes to `src/components/PollutionMap.tsx`:
- Add pulsing animation on high-risk zone markers (AQI > 200)
- Improve popup styling with larger text and clearer color coding
- Ensure `setView()` is called whenever zones change (already implemented, verify)

### Changes to `src/components/AlertBanner.tsx`:
- Add subtle animation for severe alerts
- Make alert text even simpler for user dashboard context

### Changes to `src/components/PollutionGraph.tsx`:
- Add loading skeleton while data updates
- Ensure smooth transitions when city changes

---

## Phase 7: UI/UX Polish

- **Mobile responsiveness**: Review all layouts with `sm:` / `md:` breakpoints; ensure stats bar stacks on mobile (currently `grid-cols-4` with no responsive fallback)
- **Loading states**: Add skeleton loaders when switching cities
- **Dropdown fix**: Ensure all custom dropdowns use opaque backgrounds with proper z-index
- **Header**: Add navigation links for Admin/User dashboards based on role

---

## Technical Details

### File changes summary:

| File | Action |
|------|--------|
| `src/contexts/AuthContext.tsx` | Create |
| `src/pages/Login.tsx` | Create |
| `src/pages/AdminDashboard.tsx` | Create |
| `src/pages/UserDashboard.tsx` | Create |
| `src/components/ProtectedRoute.tsx` | Create |
| `src/components/AIChatPanel.tsx` | Create |
| `supabase/functions/chat/index.ts` | Create |
| `supabase/config.toml` | Create |
| `src/App.tsx` | Modify -- add auth, routes |
| `src/components/Header.tsx` | Modify -- add nav, logout |
| `src/components/CitySelector.tsx` | Modify -- fix dropdown |
| `src/components/StatsBar.tsx` | Modify -- responsive grid |
| `src/components/PollutionMap.tsx` | Modify -- high-risk pulse |
| `src/data/mockData.ts` | Modify -- add cities |
| `src/index.css` | Modify -- add new utility classes |

### Dependencies:
- `react-markdown` -- for rendering AI chat responses with markdown formatting

