
// Trigger conditions (WENN...)
export const whenOptions = [
  // Zeit-basierte Trigger
  { value: 'time_morning', label: 'Morgens (6-11 Uhr)', category: 'time' },
  { value: 'time_noon', label: 'Mittags (11-14 Uhr)', category: 'time' },
  { value: 'time_evening', label: 'Abends (14-22 Uhr)', category: 'time' },
  { value: 'time_night', label: 'Nachts (22-6 Uhr)', category: 'time' },
  { value: 'time_weekend', label: 'Am Wochenende', category: 'time' },
  { value: 'time_weekday', label: 'Wochentags', category: 'time' },
  
  // Orts-basierte Trigger
  { value: 'location_home', label: 'Zu Hause', category: 'location' },
  { value: 'location_work', label: 'Auf Arbeit', category: 'location' },
  { value: 'location_shopping', label: 'Im Geschäft', category: 'location' },
  { value: 'location_gym', label: 'Im Fitnessstudio', category: 'location' },
  { value: 'location_restaurant', label: 'Im Restaurant', category: 'location' },
  
  // Aktivitäts-basierte Trigger
  { value: 'activity_camera', label: 'Kamera geöffnet', category: 'activity' },
  { value: 'activity_challenge', label: 'Challenge gestartet', category: 'activity' },
  { value: 'activity_upload', label: 'Inhalt hochgeladen', category: 'activity' },
  { value: 'activity_browse', label: 'App länger als 10 Min genutzt', category: 'activity' },
  { value: 'activity_sharing', label: 'Inhalte geteilt', category: 'activity' },
  
  // Wetter-basierte Trigger
  { value: 'weather_sunny', label: 'Sonniges Wetter', category: 'weather' },
  { value: 'weather_rainy', label: 'Regnerisches Wetter', category: 'weather' },
  { value: 'weather_cold', label: 'Kaltes Wetter (<10°C)', category: 'weather' },
  { value: 'weather_warm', label: 'Warmes Wetter (>20°C)', category: 'weather' },
  
  // Stimmungs-basierte Trigger
  { value: 'mood_happy', label: 'Gute Stimmung', category: 'mood' },
  { value: 'mood_tired', label: 'Müde', category: 'mood' },
  { value: 'mood_motivated', label: 'Motiviert', category: 'mood' },
  { value: 'mood_creative', label: 'Kreativ', category: 'mood' },
  
  // Social-basierte Trigger
  { value: 'social_followers', label: 'Neue Follower', category: 'social' },
  { value: 'social_likes', label: 'Viele Likes erhalten', category: 'social' },
  { value: 'social_comments', label: 'Kommentare erhalten', category: 'social' },
  
  // Erfolgs-basierte Trigger
  { value: 'achievement_level', label: 'Level aufgestiegen', category: 'achievement' },
  { value: 'achievement_badge', label: 'Badge erhalten', category: 'achievement' },
  { value: 'achievement_streak', label: 'Tagesstreak erreicht', category: 'achievement' },
];

// Trigger actions (DANN...)
export const thenOptions = [
  // XP-Belohnungen
  { value: 'reward_xp_small', label: 'Kleine XP-Belohnung (25 XP)', category: 'reward' },
  { value: 'reward_xp_medium', label: 'Mittlere XP-Belohnung (50 XP)', category: 'reward' },
  { value: 'reward_xp_large', label: 'Große XP-Belohnung (100 XP)', category: 'reward' },
  { value: 'reward_xp_booster', label: 'XP-Booster (48 Stunden)', category: 'reward' },
  
  // Challenge-bezogene Aktionen
  { value: 'challenge_suggest', label: 'Challenge vorschlagen', category: 'challenge' },
  { value: 'challenge_start', label: 'Challenge automatisch starten', category: 'challenge' },
  { value: 'challenge_reminder', label: 'Challenge-Erinnerung senden', category: 'challenge' },
  
  // Avatar-bezogene Aktionen
  { value: 'avatar_change', label: 'Avatar verändert sich', category: 'avatar' },
  { value: 'avatar_accessory', label: 'Avatar-Accessoire freischalten', category: 'avatar' },
  
  // Benachrichtigungen
  { value: 'notification_motivational', label: 'Motivierende Nachricht senden', category: 'notification' },
  { value: 'notification_tip', label: 'Tipp des Tages senden', category: 'notification' },
  
  // Marken-spezifische Aktionen
  { value: 'brand_coupon', label: 'Rabatt-Coupon senden', category: 'brand' },
  { value: 'brand_exclusive', label: 'Exklusiven Inhalt freischalten', category: 'brand' },
  
  // Sonstige Aktionen
  { value: 'reward_show', label: 'Belohnung anzeigen', category: 'other' },
  { value: 'share_achievement', label: 'Erfolg automatisch teilen', category: 'other' },
];

// Helper functions 
export const getConditionLabel = (value: string) => {
  return whenOptions.find(option => option.value === value)?.label || value;
};

export const getActionLabel = (value: string) => {
  return thenOptions.find(option => option.value === value)?.label || value;
};
