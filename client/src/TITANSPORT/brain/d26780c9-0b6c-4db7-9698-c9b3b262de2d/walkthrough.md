# Walkthrough - Titan Performance Club Website

We have successfully engineered a high-performance, premium multi-page static website for **Titan Performance Club** located in the workspace directory:
[sportclub/](file:///C:/Users/Semk88vych/.gemini/antigravity/scratch/sportclub)

Here is a comprehensive breakdown of the features, interactivity, and how they function.

---

## 🏗️ Core Architecture & Shared Assets

1. **[global.css](file:///C:/Users/Semk88vych/.gemini/antigravity/scratch/sportclub/assets/css/global.css)**
   - **Scrollbar**: Custom dark-mode scrollbar with Electric Lime highlight triggers.
   - **Neon Glows**: Premium drop shadow glows on buttons, active cards, and modal components.
   - **Modals**: Background blurs (`backdrop-blur-md`) and scale-pop transitions.
   - **Checkmark Animations**: Success screen draws checkmarks dynamically using vector SVG line animations.
2. **[main.js](file:///C:/Users/Semk88vych/.gemini/antigravity/scratch/sportclub/assets/js/main.js)**
   - **Active Highlighting**: Autodetects page location and underlines the active link with Electric Lime in the navbar.
   - **Mobile Menu**: Responsive slide-out hamburger drawer with custom blurs and lock behaviors.
   - **Membership Synchronization**: Listens to LocalStorage to dynamically update navigation states (e.g., changing "JOIN NOW" to "MY PLAN").

---

## 📱 Page Features & Interaction Flow

### 1. **[index.html (Home/Landing Page)](file:///C:/Users/Semk88vych/.gemini/antigravity/scratch/sportclub/index.html)**
- Dramatic sheared hero with full dark-to-light gradient overlay.
- High-contrast authoritative headers using the **Anton** font.
- Premium Bento grid highlighting state-of-the-art facilities, coaches, and schedule with custom hover scale triggers.

### 2. **[schedule.html (Class Schedule)](file:///C:/Users/Semk88vych/.gemini/antigravity/scratch/sportclub/schedule.html)**
- **Animated Categories**: Smoothly filters class cards (Gym, CrossFit, Yoga, Boxing, All). If a day column has zero classes active, it gracefully fades away.
- **Dynamic Booking & Waitlisting**: 
  - Clicking "BOOK" or "WAITLIST" slides open a custom, sleek dialog.
  - Features high-fidelity input fields with bottom-border glows on focus.
  - Submitting forms displays a dynamic loading spinner followed by a custom checkmark draw animation.
  - **LocalStorage State Persistence**: Keeps booked status active even after page refreshes. Card states dynamically change to show `RESERVED` or `JOINED WAITLIST` badges.

### 3. **[coaches.html (Coaches & Experts)](file:///C:/Users/Semk88vych/.gemini/antigravity/scratch/sportclub/coaches.html)**
- Grayscale-to-color transitions on card images upon hover.
- Social overlays displaying custom action triggers.
- **Direct Mail Dialog**: Interactive overlay letting users draft contact inquiries directly to the selected coach.

### 4. **[membership.html (Pricing plans)](file:///C:/Users/Semk88vych/.gemini/antigravity/scratch/sportclub/membership.html)**
- **Plan Selection Checkout**:
  - Selecting "Starter", "Pro", or "Elite" triggers a tailored purchase modal.
  - Dynamically calculates base amount, 10% VAT tax, and due totals.
  - Interactive payment card fields (automatically formats credit card spaces and CVV fields).
  - Displays transaction authorization states.
- **Active Highlights**: Highlights selected membership in the plans grid with an "Active Plan" banner, custom glowing border, and turns selecting buttons into marked checkmarks.
- **FAQ Accordion**: Clickable, smooth dropdown elements showing and hiding answers dynamically.

---

## 🚀 How to Run the Website Locally

You can launch a simple local development server to test all features instantly:

### Option A: VS Code Live Server
1. Open the folder `C:\Users\Semk88vych\.gemini\antigravity\scratch\sportclub` in VS Code.
2. Click **Go Live** in the bottom right corner.

### Option B: Python (No dependencies)
Run the following commands in PowerShell:
```powershell
cd C:\Users\Semk88vych\.gemini\antigravity\scratch\sportclub
python -m http.server 8000
```
Then open your browser and navigate to: `http://localhost:8000`
