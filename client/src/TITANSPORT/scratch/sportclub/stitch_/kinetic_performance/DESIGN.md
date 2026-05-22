---
name: Kinetic Performance
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c6c9ab'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#909378'
  outline-variant: '#454932'
  surface-tint: '#b8d300'
  primary: '#ffffff'
  on-primary: '#2c3400'
  primary-container: '#d2f000'
  on-primary-container: '#5d6b00'
  inverse-primary: '#576500'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#4a4949'
  on-secondary-container: '#bab8b7'
  tertiary: '#ffffff'
  on-tertiary: '#303030'
  tertiary-container: '#e5e2e1'
  on-tertiary-container: '#656464'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d2f000'
  primary-fixed-dim: '#b8d300'
  on-primary-fixed: '#191e00'
  on-primary-fixed-variant: '#414c00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1b1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Metropolis
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Metropolis
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Metropolis
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Metropolis
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is built for an elite, high-energy sports and fitness environment. It prioritizes momentum, power, and technical precision. The visual language evokes the atmosphere of a premium, late-night performance center—focused, intense, and exclusive.

The aesthetic follows a **High-Contrast / Bold** direction with elements of **Minimalism**. It utilizes a dark mode foundation to allow professional photography to pop, while "Electric Lime" accents guide the user's eye toward critical actions and performance metrics. Dynamic angles and heavy typography create a sense of forward motion and urgency.

## Colors

The palette is rooted in a deep-space charcoal to minimize eye strain and maximize the impact of the accent.

- **Primary (Electric Lime):** Used exclusively for primary calls to action, active states, and highlights. It represents energy and "go" signals.
- **Secondary/Background (Deep Charcoal):** The canvas of the application. It provides a sophisticated, "pro-spec" feel.
- **Tertiary (Surface):** A slightly lighter grey used for cards, input fields, and section nesting to create subtle depth without breaking the dark aesthetic.
- **Neutral (White):** High-clarity typography. High contrast is maintained to ensure readability during high-activity use.

## Typography

The typographic hierarchy is designed for maximum impact. **Anton** is used for headlines to provide a condensed, authoritative "stadium" feel. All major headlines should be set in Uppercase to reinforce the brand's strength.

**Metropolis** serves as the functional workhorse. Its geometric structure complements the technical nature of sports science. For data points and labels, use the Bold or Semi-Bold weights of Metropolis with increased letter spacing to ensure clarity against dark backgrounds.

## Layout & Spacing

This design system employs a **Fluid Grid** model based on an 8px root unit. 

- **Desktop:** 12-column grid with 24px gutters and wide 64px margins to allow content to breathe.
- **Mobile:** 4-column grid with 16px margins.
- **Dynamic Angles:** To evoke speed, certain background sections or image masks should utilize a 3-degree diagonal shear. 

Layouts should favor asymmetrical compositions and large-scale imagery that breaks the grid slightly to create a more "editorial" and dynamic feel.

## Elevation & Depth

Depth in this system is achieved through **Tonal Layers** and **Ambient Glows**. 

1.  **Base Layer:** `#121212` (Background).
2.  **Surface Layer:** `#1E1E1E` (Cards/Containers) with a 1px subtle border of `#FFFFFF` at 10% opacity.
3.  **Active Elevation:** Elements like primary buttons or active class cards do not use traditional shadows. Instead, they use a "Neon Glow"—a drop shadow with 0px spread, a large blur (20px+), and a color matching the Electric Lime at 30-50% opacity.

Avoid heavy blurs on non-interactive elements to keep the UI feeling "sharp" and "fast."

## Shapes

The shape language balances "aggressive" and "accessible." While the overall layout is architectural and sharp, individual components use **Rounded (Level 2)** corners (0.5rem / 8px). This softens the high-contrast aesthetic just enough to feel modern and premium rather than industrial or brutalist.

Interactive elements like buttons and input fields should strictly follow the 8px radius. Container elements (like large cards) may scale up to 16px (1rem) to maintain visual harmony.

## Components

### Buttons
- **Primary:** Background in Electric Lime, text in Deep Charcoal (Anton, Uppercase). Includes a subtle external glow in the primary color.
- **Secondary:** Transparent background with a 2px White border. Text in White.

### Cards (Classes & Trainers)
- Utilize `#1E1E1E` surfaces.
- Images should feature a desaturated or "high-contrast dramatic" treatment.
- Use the 3-degree shear on the bottom edge of the image header within the card.

### Pricing Tables
- Use high-contrast vertical columns. 
- The "Featured/Most Popular" plan should be outlined in Electric Lime with a subtle glow to distinguish it from others.

### Input Fields
- Dark grey fills with a 1px bottom-border only for a "sleek" appearance. 
- Upon focus, the border transitions to Electric Lime.

### Chips/Badges
- Small, pill-shaped indicators for "Live," "Full," or "New."
- High-intensity background colors with black text for immediate legibility.