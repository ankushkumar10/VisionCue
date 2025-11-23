# VisionCue

A modern, professional teleprompter web app built with **React**, **Vite**, and **Tailwind CSS**. Designed for presenters, streamers, and content creators, VisionCue offers a polished, accessible, and highly customizable teleprompter experience—right in your browser.

![VisionCue Screenshot](./screenshot.png)

---

## ✨ Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.
- **Script Editor**: Rich textarea for writing and editing scripts, with auto-save and script management.
- **Adjustable Scroll Speed**: Real-time control for smooth script playback.
- **Font & Display Settings**: Change font size, color, family, line height, and background for maximum readability.
- **Playback Controls**: Start, pause, reset, and return to editor.
- **Mirror Mode**: Flip the script for use with physical teleprompter hardware.
- **Dark/Light Mode**: Toggle between themes; respects system preference.
- **Word Highlighting**: Highlights the current word as the script scrolls.
- **Keyboard Shortcuts**: Control playback and navigation without leaving the keyboard.
- **Persistent State**: Scripts and preferences are saved in your browser.
- **Voice Control (Experimental)**: Use your voice to play, pause, reset, or exit the prompter.
- **Accessible & Modern UI**: Built with accessibility and usability in mind.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/VisionCue.git
   cd VisionCue
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Start the development server:**
   ```
   npm run dev
   ```
5. **Open in your browser:**
   ```
   http://localhost:517
   ```
---

## 🖥️ Usage

- **Write or paste your script** in the editor.
- **Adjust settings** (scroll speed, font, colors, etc.) via the Settings page.
- **Start the teleprompter** by clicking "Start Teleprompter" or pressing <kbd>Space</kbd>.
- **Control playback** with on-screen buttons, keyboard shortcuts, or (optionally) your voice.

### Keyboard Shortcuts

| Action                | Shortcut      |
|-----------------------|--------------|
| Play/Pause            | `Space`      |
| Reset                 | `R`          |
| Exit Prompter         | `Esc`        |
| Scroll Up             | `↑`          |
| Scroll Down           | `↓`          |

---

## ⚙️ Configuration

All user settings and scripts are stored in your browser’s local storage. No account or server required.

---

## 🛠️ Project Structure
```
src/
├── components/      # Reusable UI components
├── contexts/        # React Context providers for state management
├── hooks/           # Custom React hooks
├── pages/           # Route-based page components
├── utils/           # Utility functions
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Tailwind and custom styles
```
---

## 🧑‍💻 Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes, features, or improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Slate](https://docs.slatejs.org/) (for rich text editing)
- [Heroicons](https://heroicons.com/)
- [Headless UI](https://headlessui.dev/)

---

## 📣 Feedback

Have suggestions or need help? [Open an issue](https://github.com/yourusername/proteleprompter/issues) or contact the maintainer.

---

**Enjoy your professional teleprompter experience!**
