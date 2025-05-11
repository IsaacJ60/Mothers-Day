# Mother’s Day Gift Generator

A fun, interactive Next.js app that lets anyone create a personalized Mother’s Day message with:

* **Dynamic Scroll Animations**: Smooth, Scroll-Motion–driven intro screens with Framer Motion transitions.
* **Custom Photo Upload**: Upload your favorite mother-and-child photo.
* **Color Tinting**: Screen tint adjusts based on Mom’s favorite color for a personalized touch.
* **Interactive Particle Background**: Falling flower petals or custom shapes driven by tsParticles.
* **Global State Management**: Zustand store to carry user inputs across pages without prop-drilling.

---

## Features

1. **Overall Function**

   * Collects Mom’s name, favorite flower, preferred color, personal message, and a photo.
   * Validated with Formik + Yup, featuring custom dropdowns using Headless UI.
   * Scroll-driven reveal of greetings: “Hi, Mom!”, “Happy Mother’s Day!” and your personal message/card.
   * Live photo preview and dynamic backdrop blur as you scroll.

3. **State Management**

   * Global store via Zustand to pass data seamlessly between pages.

4. **Animation Libraries**

   * **Framer Motion** for initial fade-in/out and scroll-based blur.
   * **react-scroll-motion** for sticky, scroll-timed animations.

---

## Want to Make It Your Own?

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/mothers-day-gift.git
   cd mothers-day-gift
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

---

## License

MIT © Isaac Jiang
