
import { Challenge } from '@/components/challenge/types';
import { Video, MapPin, Camera } from 'lucide-react';

/**
 * Get challenge type icon
 */
export const getChallengeTypeIcon = (type: string | null | undefined): JSX.Element => {
  switch(type?.toLowerCase()) {
    case 'video': return <Video size={24} />;
    case 'geofencing': return <MapPin size={24} />;
    case 'ar': return <Camera size={24} />;
    default: return <Video size={24} />;
  }
};

/**
 * Generate coach tip based on challenge type
 */
export const getCoachTip = (challengeType: string): string => {
  const tips: Record<string, string> = {
    'Video': `
      • Film im Hochformat für beste Ergebnisse
      • Achte auf gute Beleuchtung und klaren Ton
      • Beginne mit einem Hingucker in den ersten 3 Sekunden
      • Nutze Trends und populäre Sounds
      • Füge Text-Overlays für mehr Kontext hinzu
      • Halte das Video kurz und auf den Punkt (15-30 Sekunden)`,
    'Photo': `
      • Wähle interessante Perspektiven
      • Achte auf gute Lichtverhältnisse
      • Folge der Drittel-Regel für die Komposition
      • Experimentiere mit verschiedenen Filtern
      • Fokussiere auf ein klares Hauptmotiv
      • Nutze Kontraste für mehr Wirkung`,
    'Geofencing': `
      • Aktiviere GPS und Ortungsdienste
      • Halte dein Telefon vollständig aufgeladen
      • Plane deine Route im Voraus
      • Nutze eine stabile Internetverbindung
      • Achte auf AR-Overlays in der Umgebung
      • Besuche auch weniger bekannte Orte für seltene Belohnungen`,
    'AR': `
      • Scanne die Umgebung langsam und vollständig
      • Achte auf ausreichend Licht für die AR-Erkennung
      • Halte die Kamera still für bessere Ergebnisse
      • Entferne alle Objektivabdeckungen
      • Reinige deine Kameralinse
      • Stelle sicher, dass genug Speicherplatz vorhanden ist`,
    'default': `
      • Sei kreativ und authentisch
      • Beziehe deine Community mit ein
      • Nutze relevante Hashtags
      • Sei konsistent mit deinen Posts
      • Reagiere auf Kommentare
      • Teile deine Ergebnisse in sozialen Medien`
  };
  
  return tips[challengeType] || tips['default'];
};

/**
 * Generate AI coach tips for a challenge
 */
export const generateCoachTip = async (
  challenge: Challenge, 
  user: any, 
  coachTips: Record<string, string>
): Promise<string> => {
  // In a real implementation, this would call an AI service
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Select specific tips based on the challenge type
  const specificTips = coachTips[challenge.type || 'default'] || coachTips['default'];
  
  // Add hashtags and personal greeting
  return `Hey ${user?.email?.split('@')[0] || 'Creator'}! 

Hier sind meine Tipps für deine "${challenge.title}" (${challenge.type || 'Video'})-Challenge:

${specificTips}

Wichtig: Vergiss nicht die Hashtags ${challenge.hashtags?.map((tag: string) => '#' + tag).join(' ') || '#jillr'} zu verwenden!

Viel Erfolg! 🚀`;
};
