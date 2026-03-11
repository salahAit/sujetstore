= UI/UX & Design System

SujetStore was designed with the principle that _"simplicity creates effectiveness."_ The interface feels native, fast, and accessible regardless of the device.

== Native RTL & Arabic Typography

The entire design is built from the ground up for Right-to-Left (RTL) text direction. 

- *Typography:* The `Cairo` font from Google Fonts is applied globally. It was selected for its exceptional legibility in Arabic numerals and varied stroke weights, making it ideal for both long reading (like document summaries) and bold headers.
- *Layout Engine:* Flexbox and CSS Grid are utilized exclusively with logical CSS properties (`padding-inline`, `margin-inline-start`) to ensure perfect mirroring natively without any hacky overrides.

== Dark & Light Mode with Shadcn-Svelte Theming

The platform implements a complete dual-theme system using `Shadcn-Svelte` semantic color tokens. Every component — from buttons and dropdowns to cards and toggle switches — automatically adapts to the user's preferred color scheme based on their system setting, with a manual override toggle available in the navigation bar.

Key semantic tokens used throughout the interface:
- `bg-background` / `text-foreground` — Base page colors
- `bg-card` / `text-card-foreground` — Elevated surface containers (like Document boxes)
- `bg-muted` / `text-muted-foreground` — Subdued backgrounds and secondary helper text
- `bg-primary` / `text-primary-foreground` — Active elements, CTAs, and primary buttons
- `bg-accent` / `text-accent-foreground` — Hover and interactive states

This approach guarantees that *no hardcoded hex colors* appear in the core UI codebase (excluding specific gamification badges), ensuring perfect visual contrast in both modes.

== Mobile-First Responsive Design

Recognizing that the vast majority of Algerian students access educational content from smartphones, the interface implements strict mobile-first paradigms:

- *Stacked Controls:* Filter controls stack vertically on small screens and align horizontally on desktop displays.
- *Horizontal Scrolling:* Tab navigation (for trimesters and quiz stats) scrolls horizontally with hidden scrollbars when screen width is constrained to preserve vertical screen real estate.
- *Touch Targets:* All interactive elements meet or exceed the minimum touch target size of 44×44px.
- *Glassmorphism Architecture:* The UI utilizes a premium "Glassmorphism" effect for year and subject cards. This involves backdrop-blur filters combined with semi-transparent borders and subtle gradients, creating a multi-layered depth effect that remains performant on mobile devices.
- *Data Visualization:* Cards dynamically display item counts (e.g., "15 Subjects", "24 Exams"), providing students with immediate visual cues about content density before navigation.

== Global Navigation Hierarchy

A global breadcrumb navigation system (`Level / Year / Subject`) is present on all inner pages. This ensures the student always knows their exact location in the curriculum taxonomy and can navigate back to a parent category with a single click, completely eliminating the feeling of being "lost" inside the application.
