# 🚀 3D Portfolio - Cyber-Noir Space Theme

A stunning interactive portfolio website featuring a scientifically-accurate 3D solar system with orbiting planets built with Next.js, React Three Fiber, and Framer Motion.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.183.2-black?logo=three.js)

## ✨ Features

- **🪐 3D Solar System**: Interactive elliptical orbits with realistic 3D planet models loaded from GLTF files
- **🎨 Cyber-Noir Theme**: Futuristic dark aesthetic with neon accents and space-inspired design
- **⚡ Smooth Animations**: Powered by Framer Motion for fluid transitions and interactions
- **📱 Responsive Design**: Fully responsive layout optimized for all screen sizes
- **🎯 Project Showcase**: Click on planets to view detailed project information
- **✨ Interactive Starfield**: Dynamic twinkling stars background with warp effects
- **🎭 Multiple Views**: Galaxy view, project detail view, and bio view with smooth transitions

## 🛠️ Tech Stack

### Core
- **[Next.js 16.1.6](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library with React Compiler
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type safety

### 3D Graphics
- **[React Three Fiber 9.5.0](https://docs.pmnd.rs/react-three-fiber)** - React renderer for Three.js
- **[@react-three/drei 10.7.7](https://github.com/pmndrs/drei)** - Useful helpers for React Three Fiber
- **[Three.js 0.183.2](https://threejs.org/)** - 3D graphics library

### Animation & UI
- **[Framer Motion 12.35.0](https://www.framer.com/motion/)** - Production-ready animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon system
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page with view management
│   └── globals.css         # Global styles
├── components/
│   ├── GalaxyView.tsx      # Solar system with orbiting planets
│   ├── Planet3D.tsx        # 3D planet component with GLTF loader
│   ├── ProjectView.tsx     # Detailed project information
│   ├── BioView.tsx         # About/bio section
│   ├── TopNav.tsx          # Navigation bar
│   ├── BottomHUD.tsx       # Bottom HUD controls
│   └── LoadingScreen.tsx   # Initial loading animation
├── lib/
│   └── data.ts            # Projects, stars, and configuration data
├── public/
│   └── models/
│       ├── scene.gltf     # 3D planet model
│       ├── scene.bin      # GLTF binary data
│       └── textures/      # Planet textures
└── README.md
```

## 🎨 Customization

### Adding Projects

Edit `lib/data.ts` to add or modify projects:

```typescript
export const PROJECTS: Project[] = [
  {
    id: "project-name",
    name: "Project Name",
    description: "Project description",
    tech: ["React", "TypeScript"],
    colors: ["#hexcolor1", "#hexcolor2", "#hexcolor3"],
    shadowColor: "#hexcolor",
    // ... more fields
  },
];
```

### Orbital Parameters

Customize planet orbits in `components/GalaxyView.tsx`:

```typescript
const ORBITAL_PARAMS = [
  { semiMajor: 180, eccentricity: 0.08, startAngle: -Math.PI / 4, period: 50 },
  // Add more orbital configurations
];
```

### 3D Models

Replace the planet model by updating files in `public/models/`:
- `scene.gltf` - GLTF model file
- `scene.bin` - Binary mesh data
- `textures/` - Texture images

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This Next.js app can be deployed on:
- Netlify
- AWS Amplify
- Railway
- Render
- Any Node.js hosting

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🎯 Features in Detail

### Elliptical Orbits
Planets follow scientifically-accurate elliptical orbits with varying:
- Semi-major axis (distance from center)
- Eccentricity (orbit shape)
- Orbital period (speed based on distance)

### 3D Planet Rendering
- GLTF model loading with texture support
- Dynamic material properties based on project colors
- Smooth rotation animations
- Hover effects with scale and lighting changes

### Animation System
- View transitions with Framer Motion
- Staggered planet entrance animations
- Continuous orbital motion
- Twinkling starfield background

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Aashit Paliwal**

---

⭐ Star this repo if you find it useful!
