
export interface DataPermission {
  id: string;
  type: DataType;
  enabled: boolean;
  xpReward: number;
  description: string;
}

export type DataType = 'location' | 'tracking' | 'ugc' | 'activity';

export interface DataPermissionSetting {
  user_id: string;
  data_type: DataType;
  status: boolean;
  xp_rewarded: number;
  date_given: string | null;
}

export const DATA_PERMISSION_DEFAULTS: Record<DataType, Omit<DataPermission, 'id'>> = {
  location: {
    type: 'location',
    enabled: false,
    xpReward: 500,
    description: 'Standortdaten helfen Unternehmen, lokale Angebote und Events für dich zu personalisieren.'
  },
  tracking: {
    type: 'tracking',
    enabled: false,
    xpReward: 300,
    description: 'App-Nutzungsdaten helfen uns, die Plattform besser auf deine Bedürfnisse anzupassen.'
  },
  ugc: {
    type: 'ugc',
    enabled: false,
    xpReward: 1000,
    description: 'Deine erstellten Inhalte können für Marken-Kampagnen verwendet werden, natürlich mit deiner Namensnennung.'
  },
  activity: {
    type: 'activity',
    enabled: false,
    xpReward: 200,
    description: 'Dein Aktivitätsverlauf hilft uns, relevantere Challenges für dich zu finden.'
  }
};
