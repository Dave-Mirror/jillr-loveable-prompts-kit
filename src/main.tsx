
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { useHypocampusSystem } from './hooks/useHypocampusSystem'

// Aktiviere das Hypocampus-System
useHypocampusSystem();

createRoot(document.getElementById("root")!).render(<App />);
