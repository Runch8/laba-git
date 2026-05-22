# Master Plan - Ultimate Premium Enhancements (Titan Performance Club)

We will upgrade the **Titan Performance Club** website into an absolute state-of-the-art visual and functional masterpiece. We are adding agency-grade interactive modules, high-fidelity dynamic calculations, personal profile dashboards, and color customizers that persist globally across all pages.

---

## 🚀 The Ultimate Feature Roster

### 1. 🎨 Global Theme Customizer & Custom Neon Accents
- Introduce a sleek floating control widget in the corner of all pages.
- Allows users to switch the club's signature accent color dynamically:
  - **Electric Lime** (Acid Green / Default Performance)
  - **Cyberpunk Violet** (Ultra Premium Late-Night Neon)
  - **Inferno Orange** (High Intensity Combat / Cardio)
- Uses modern CSS variables (`--color-primary-fixed`, `--color-neon-glow`) to transition the entire website instantly.
- Preference persists across all pages using `localStorage`.

### 2. 📊 Titan Labs: Biometric & Macronutrient Engine (Integrated into `index.html`)
- A beautiful, scientific fitness widget titled **TITAN LABS: PERFORMANCE ENGINE**.
- Interactive range sliders for Height (cm), Weight (kg), and Age.
- Dynamic selectors for Activity Level (Sedentary, Active, Elite) and Goal (Cut, Maintenance, Bulk).
- **Live Calculations**:
  - BMI with color-coded gauge (Stealth Grey to Neon Accent).
  - TDEE (Daily Calorie Target) with rolling number animations.
  - Custom Macro Splits (Protein, Carbs, Fats) with animated progress bars.

### 3. 🎯 Coach Matchmaker Quiz (Integrated into `coaches.html`)
- An interactive, card-based diagnostic quiz: **FIND YOUR PERFECT TRAINER**.
- Dynamic, smooth wizard questions (Goal, Experience Level, Preference).
- Matches the user to their ideal coach from our 6-person roster with custom animations, and offers an instant "Direct Contact" call to action.

### 4. 🎛️ Dynamic Pricing Slider & Annual Billing Configurator (Integrated into `membership.html`)
- A high-fidelity toggle between **Monthly** and **Annual (20% Off)** billing.
- Interactive checkboxes for custom performance add-ons:
  - **VIP Private Locker** (+$10/mo)
  - **Weekly 1-on-1 Personal Trainer** (+$30/mo)
  - **Custom Premium Nutrition Engine** (+$15/mo)
- Price display rolls and animates in real-time, feeding directly into the Checkout Modal with exact calculated costs.

### 5. 💼 Titan Dashboard / Personal Portal (Slide-over Panel)
- Clicking "MY PLAN" or a dedicated dashboard button opens a sleek, glassmorphic right-hand slide-over menu.
- Displays:
  - **Active Membership Card** (with Tier details).
  - **Your Scheduled Classes**: List of currently booked sessions with interactive "CANCEL RESERVATION" triggers that sync with `schedule.html` and update card states.
  - **Biometrics Log**: Interactive inputs to log daily body weight and water intake (with local storage visualization).

---

## 📂 Architecture Upgrades

We will update CSS variables in `assets/css/global.css` and expand the core JavaScript in `assets/js/main.js` to coordinate the dynamic theme updates, modal triggers, and shared data structures.

```
C:\Users\Semk88vych\.gemini\antigravity\scratch\sportclub\
├── index.html          (Add Titan Labs Biometric Engine & Global Widget)
├── schedule.html       (Add Dashboard synchronization & Theme engine)
├── coaches.html        (Add Coach Matchmaker Quiz wizard & Theme engine)
├── membership.html     (Add dynamic Add-on pricing & Theme engine)
└── assets/
    ├── css/
    │   └── global.css  (CSS Variable system, theme palettes, and accordion transitions)
    └── js/
        └── main.js     (Global state controller, Theme Customizer injector, and Dashboard panel generator)
```
