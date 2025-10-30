# 🚀 React + TypeScript + Vite + Tailwind + Vitest Template

A modern, minimal boilerplate for building scalable React applications with **TypeScript**, **Vite**, **TailwindCSS**, and **Vitest**.
Fully configured for fast development, linting, formatting, and testing.

---

## 🧩 Features

- ⚡ **Vite 7** — Ultra-fast dev server and optimized builds
- ⚛️ **React 19 + React Router 7** — Concurrent rendering and routing
- 💅 **TailwindCSS 4.1** — Utility-first styling via `@tailwindcss/vite`
- 🧠 **TypeScript 5.9** — Strong static typing with modular configs
- 🧪 **Vitest + Testing Library** — Unit and integration testing ready out of the box
- 🧹 **ESLint + Prettier** — Consistent and conflict-free code style
- 🧰 **VSCode Ready** — Auto-format, lint, and type-check support

---

## 📦 Folder Structure

```
.
|-- .gitignore
|-- .prettierignore
|-- .prettierrc.json
|-- eslint.config.js
|-- index.html
|-- package.json
|-- README.md
|-- tsconfig.json
|-- tsconfig.app.json
|-- tsconfig.node.json
|-- tsconfig.test.json
|-- vite.config.ts
|-- .vscode/
|   |-- settings.json
|-- public/
|   |-- vite.svg
|-- src/
|   |-- main.tsx
|   |-- App.tsx
|   |-- components/
|   |   |-- Header.tsx
|   |   |-- Header.test.tsx
|   |   |-- Hero.tsx
|   |-- styles/
|       |-- index.css
|       |-- App.css
|-- tests/
    |-- integration/
        |-- app.test.tsx
```

---

## ⚙️ Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start the development server     |
| `npm run build`      | Build the project for production |
| `npm run preview`    | Preview the production build     |
| `npm run lint`       | Run ESLint                       |
| `npm run format`     | Format code with Prettier        |
| `npm run typecheck`  | Run TypeScript type checking     |
| `npm run test`       | Run all Vitest tests             |
| `npm run test:watch` | Run tests in watch mode          |

---

## 🧪 Testing

- **Unit tests** live next to their components
  Example: `src/components/Header.test.tsx`
- **Integration tests** live in `/tests/integration`
  Example: `tests/integration/app.test.tsx`

Run all tests:

```bash
npm run test
```

---

## 💅 Linting & Formatting

ESLint and Prettier are configured to work together using `eslint-config-prettier`.

```bash
npm run lint
npm run format
```

---

## 🧠 Type Checking

Run standalone type checking with:

```bash
npm run typecheck
```

---

## 🧭 Routing

Uses **React Router DOM v7** for client-side navigation.

---

## 🧰 VSCode Integration

`.vscode/settings.json` includes:

- Format on save
- ESLint auto-fix
- Prettier as default formatter
- TypeScript strict validation

---
