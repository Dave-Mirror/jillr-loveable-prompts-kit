
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// We can't use hooks at the top level, so we're removing the direct call to useHypocampusSystem
// The system will be initialized in the App component or via a provider

createRoot(document.getElementById("root")!).render(<App />);
