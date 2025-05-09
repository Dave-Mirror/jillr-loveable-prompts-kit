
import { ChallengeType } from "@/components/challenge/types";

export const getCoachTip = (challengeType: ChallengeType | string): string => {
  const tips: Record<string, string[]> = {
    Video: [
      "Nutze natürliches Licht für bessere Videoqualität.",
      "Halte dein Video kurz und auf den Punkt – die ersten 3 Sekunden sind entscheidend.",
      "Verwende Musik, die zur Marke und zum Produkt passt.",
      "Plane deine Aufnahmen im Voraus mit einem einfachen Storyboard.",
      "Achte auf einen stabilen Bildausschnitt oder nutze ein Stativ."
    ],
    Geofencing: [
      "Erkunde die Location zunächst vollständig, bevor du mit der Challenge startest.",
      "Achte auf ausreichende Akkulaufzeit und mobile Daten.",
      "Trage bequeme Kleidung und Schuhe für diese Challenge.",
      "Halte dein Smartphone für schnelle Aufnahmen bereit.",
      "Plane deine Route im Voraus, um Zeit zu sparen."
    ],
    AR: [
      "Achte auf gute Lichtverhältnisse für optimale AR-Erkennung.",
      "Halte dein Gerät ruhig während der AR-Erfahrung.",
      "Finde eine Umgebung mit ausreichend Platz für AR-Elemente.",
      "Achte auf kontrastreiche Hintergründe für besseres Tracking.",
      "Experimentiere mit verschiedenen Winkeln und Perspektiven."
    ],
    Dance: [
      "Übe die Choreographie mehrmals, bevor du filmst.",
      "Wähle einen Ort mit ausreichend Platz zum Tanzen.",
      "Achte auf gutes Licht und passende Kleidung.",
      "Finde einen ruhigen Hintergrund, der nicht ablenkt.",
      "Nimm mehrere Takes auf und wähle den besten aus."
    ],
    Fitness: [
      "Achte auf die korrekte Ausführung der Übungen.",
      "Trage passende Sportkleidung für bessere Sichtbarkeit.",
      "Wähle einen ruhigen Hintergrund ohne Ablenkungen.",
      "Trinke ausreichend Wasser vor und nach der Challenge.",
      "Achte auf deinen Atem während der Aufnahmen."
    ]
  };

  // Default to Video type if the specific type doesn't have tips
  const tipCategory = tips[challengeType] || tips.Video;
  
  // Return a random tip from the appropriate category
  const randomIndex = Math.floor(Math.random() * tipCategory.length);
  return tipCategory[randomIndex];
};
