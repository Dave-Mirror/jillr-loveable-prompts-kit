
// Nur die tatsächlich vorhandenen Module exportieren
export { default as MapExperience } from './MapExperience';
export { default as Dashboard } from './Dashboard';
export { default as LiveMap } from './LiveMap';
export { default as NotFound } from './NotFound';
export { default as Profile } from './Profile';
export { default as ChallengeDetails } from './ChallengeDetail';

// Da die folgenden Module nicht gefunden wurden, 
// sollten wir sie importieren, falls sie an anderer Stelle im Projekt definiert sind,
// oder entsprechende leere Implementierungen erstellen.
// Füge hier vorübergehend Platzhalter für nicht vorhandene Module ein
export { default as Onboarding } from './Index';
export { default as Login } from './Auth';
export { default as Register } from './Auth';
export { default as Settings } from './Profile';
export { default as Community } from './NotFound';
