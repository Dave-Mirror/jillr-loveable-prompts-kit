
import { Reward } from '@/types/dashboard';

// Thematische Bilder für jeden Challenge-Typ
export const challengeTypeImages: Record<string, string> = {
  'Video': 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800',
  'Geofencing': 'https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?q=80&w=800',
  'Photo & Video': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800',
  'Fashion': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800',
  'Sport': 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800',
  'AR': 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80&w=800',
  'Beauty': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800',
  'Fitness': 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800',
  'Travel': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800',
  'Food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800',
  'Dance': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800',
  'Sustainability': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800',
  'Gamification': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800',
  'Community': 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800',
  'Battle': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800',
  'Review': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800',
  // Fallback für nicht definierte Typen
  'default': 'https://images.unsplash.com/photo-1579547621869-0dbd72cf4caa?q=80&w=800'
};

// Spezifische Coach-Tipps für verschiedene Challenge-Typen
export const coachTips: Record<string, string> = {
  'Video': `
1. Verwende gute Beleuchtung, idealerweise natürliches Licht.
2. Halte dein Smartphone im Hochformat (9:16) für TikTok-optimiertes Format.
3. Die ersten 3 Sekunden sind entscheidend - starte mit einem Blickfang!
4. Verwende Musik oder Sound-Effekte für mehr Engagement.
5. Nutze den Schnitt-Effekt für dynamische Übergänge.`,

  'Geofencing': `
1. Aktiviere präzise Standortdienste auf deinem Gerät.
2. Mache erkennbare Aufnahmen der Orte, an denen du eincheckst.
3. Verbinde dein Erlebnis mit einer interessanten Story.
4. Trage auffällige Kleidung, um in deinen Videos hervorzustechen.
5. Nutze lokale Hashtags für mehr Reichweite.`,

  'Photo & Video': `
1. Kombiniere Standbilder mit kurzen Videosequenzen für Dynamik.
2. Experimentiere mit verschiedenen Perspektiven für den gleichen Ort oder Gegenstand.
3. Verwende die "Goldene Stunde" kurz nach Sonnenaufgang oder vor Sonnenuntergang.
4. Erstelle eine konsistente visuelle Ästhetik durch ähnliche Filter.
5. Zeige Authentizität durch unerwartete Momente und echte Reaktionen.`,

  'Fashion': `
1. Nutze Outfit-Transitionen mit einem einfachen Wipe- oder Schnapp-Effekt.
2. Wähle ein konsistentes Farbschema, das zu deinem Mood passt.
3. Der Hintergrund sollte einfach sein, um den Fokus auf dein Outfit zu legen.
4. Zeige Details wie Accessoires, Schuhe oder Make-up in Nahaufnahmen.
5. Bewege dich natürlich, um zu zeigen, wie der Look wirkt.`,

  'Sport': `
1. Filme aus verschiedenen Winkeln, um die Komplexität deiner Tricks zu zeigen.
2. Nutze Slow-Motion für besonders beeindruckende Momente.
3. Kombiniere POV-Aufnahmen mit Aufnahmen aus der Ferne.
4. Zeige sowohl Erfolge als auch Fehlversuche für Authentizität.
5. Füge Musik hinzu, die zum Rhythmus deiner Bewegungen passt.`,

  'AR': `
1. Stelle sicher, dass die AR-Elemente gut erkennbar und mit der Umgebung integriert sind.
2. Bewege dich langsam und gleichmäßig für stabile AR-Erfahrungen.
3. Nutze gut beleuchtete Umgebungen für bessere AR-Erkennung.
4. Zeige deine Reaktion auf das AR-Erlebnis für mehr Engagement.
5. Experimentiere mit verschiedenen Perspektiven der AR-Elemente.`,

  'Beauty': `
1. Zeige deutlich das Vorher und Nachher für maximalen Effekt.
2. Nutze gute, gleichmäßige Beleuchtung - ideal ist Ringlight.
3. Füge Nahaufnahmen der Details hinzu.
4. Erkläre kurz die verwendeten Produkte oder Techniken.
5. Musik und Übergänge können dein Vorher-Nachher dramatischer wirken lassen.`,

  'Fitness': `
1. Filme dich aus einem Winkel, der deine Technik gut zeigt.
2. Nutze intensive, motivierende Musik für den Hintergrund.
3. Zeige echte Anstrengung und Emotionen - Authentizität ist wichtig.
4. Füge Text oder Voice-Over hinzu, um Motivation zu vermitteln.
5. Achte auf gute Beleuchtung, die deine Form und Muskeldefinition betont.`,

  'Travel': `
1. Beginne mit einem atemberaubenden Panorama-Shot des Hotels.
2. Zeige eine Sequenz vom Aufstehen bis zum Sonnenaufgang.
3. Nimm Details wie das Frühstück, die Aussicht oder besondere Hoteleinrichtungen auf.
4. Verwende sanfte Übergänge zwischen den Szenen für ein ruhiges Morgengefühl.
5. Schließe mit einem inspirierenden Moment ab, der den perfekten Start in den Tag verkörpert.`,

  'Food': `
1. Beleuchte das Essen von vorne oder leicht seitlich.
2. Zeige Details wie Dampf, schmelzender Käse oder tropfende Saucen.
3. Nimm den "ersten Bissen" oder das "Aufschneiden" auf.
4. Variiere zwischen Nahaufnahmen und Gesamtansichten des Gerichts.
5. Achte auf ansprechende Farbkontraste bei der Präsentation.`,

  'Dance': `
1. Finde einen Platz mit ausreichend Bewegungsfreiheit und gutem Licht.
2. Stelle die Kamera so auf, dass deine gesamte Bewegung zu sehen ist.
3. Übe den Tanz mehrmals, bevor du aufnimmst.
4. Trage Kleidung, die deine Bewegungen betont und zur Musik passt.
5. Füge Text mit dem Songtitel und Choreografen hinzu.`,

  // Fallback-Tipps für andere Challenge-Typen
  'default': `
1. Achte auf gute Beleuchtung und Tonqualität.
2. Die ersten 3 Sekunden sind entscheidend - starte mit einem Hingucker!
3. Halte dich an die vorgegebenen Hashtags für mehr Reichweite.
4. Sei authentisch und kreativ in deinem Content.
5. Füge Musik oder Sound-Effekte für mehr Engagement hinzu.`
};

// Belohnungsideen basierend auf Challenge-Typen
export const rewardsData: Record<string, Reward[]> = {
  'Video': [
    { type: 'coins', description: '250 Coins für verifizierte Teilnahme', immediate: false },
    { type: 'xp', description: '500 XP nach Upload', immediate: true },
    { type: 'product', description: 'Red Bull Sixpack bei 500+ Views', level: 500, immediate: false, viral_bonus: true }
  ],
  'Geofencing': [
    { type: 'coins', description: '150 Coins für jeden Check-in', immediate: true },
    { type: 'xp', description: '300 XP nach Abschluss aller Orte', immediate: false },
    { type: 'voucher', description: 'Lokale Rabatt-Codes freischalten', immediate: true }
  ],
  'Photo & Video': [
    { type: 'coins', description: '300 Coins für Festival-Content', immediate: false },
    { type: 'xp', description: '600 XP nach Verifizierung', immediate: false },
    { type: 'ticket', description: 'VIP-Upgrade bei 1000+ Likes', level: 1000, immediate: false, viral_bonus: true }
  ],
  'Fashion': [
    { type: 'coins', description: '200 Coins für Upload', immediate: true },
    { type: 'xp', description: '400 XP nach Verifizierung', immediate: false },
    { type: 'voucher', description: '15% Fashion-Gutschein', immediate: true }
  ],
  'Sport': [
    { type: 'coins', description: '400 Coins für verifizierten Trick', immediate: false },
    { type: 'xp', description: '800 XP nach Upload', immediate: true },
    { type: 'product', description: 'Limitierte Sneaker bei 2000+ Views', level: 2000, immediate: false, viral_bonus: true }
  ],
  'AR': [
    { type: 'coins', description: '350 Coins pro AR-Interaktion', immediate: true },
    { type: 'xp', description: '700 XP nach Abschluss', immediate: false },
    { type: 'ticket', description: 'Exklusiver digitaler Drop', immediate: false }
  ],
  'Beauty': [
    { type: 'coins', description: '200 Coins für Vorher-Nachher', immediate: true },
    { type: 'xp', description: '400 XP nach Verifizierung', immediate: false },
    { type: 'product', description: 'Beauty-Box im Wert von 50€', immediate: false }
  ],
  'Fitness': [
    { type: 'coins', description: '300 Coins für deinen härtesten Moment', immediate: true },
    { type: 'xp', description: '600 XP nach Verifizierung', immediate: false },
    { type: 'product', description: 'Gymshark Outfit bei 1500+ Views', level: 1500, immediate: false, viral_bonus: true }
  ],
  'Travel': [
    { type: 'coins', description: '250 Coins für Hotel-Content', immediate: true },
    { type: 'xp', description: '500 XP nach Verifizierung', immediate: false },
    { type: 'voucher', description: 'Marriott Bonvoy Punkte', immediate: false }
  ],
  // Standardbelohnungen für andere Challenge-Typen
  'default': [
    { type: 'coins', description: '250 Coins sofort nach Upload', immediate: true },
    { type: 'xp', description: '500 XP für verifizierte Teilnahme', immediate: false },
    { type: 'product', description: 'T-Shirt bei über 1000 Views', level: 1000, immediate: false, viral_bonus: true }
  ]
};
