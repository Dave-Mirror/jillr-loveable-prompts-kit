export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenges: {
        Row: {
          coin_reward: number | null
          description: string | null
          end_date: string | null
          hashtags: string[] | null
          id: string
          reward_ids: Json | null
          start_date: string | null
          status: string | null
          title: string
          type: string | null
          xp_reward: number | null
        }
        Insert: {
          coin_reward?: number | null
          description?: string | null
          end_date?: string | null
          hashtags?: string[] | null
          id?: string
          reward_ids?: Json | null
          start_date?: string | null
          status?: string | null
          title: string
          type?: string | null
          xp_reward?: number | null
        }
        Update: {
          coin_reward?: number | null
          description?: string | null
          end_date?: string | null
          hashtags?: string[] | null
          id?: string
          reward_ids?: Json | null
          start_date?: string | null
          status?: string | null
          title?: string
          type?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      enterprise_campaigns: {
        Row: {
          analytics: Json | null
          campaign_type: string
          created_at: string
          description: string | null
          end_date: string | null
          enterprise_id: string
          hashtags: string[] | null
          id: string
          location_based: boolean | null
          locations: Json | null
          rewards: Json | null
          settings: Json | null
          start_date: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          analytics?: Json | null
          campaign_type: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          enterprise_id: string
          hashtags?: string[] | null
          id?: string
          location_based?: boolean | null
          locations?: Json | null
          rewards?: Json | null
          settings?: Json | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          analytics?: Json | null
          campaign_type?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          enterprise_id?: string
          hashtags?: string[] | null
          id?: string
          location_based?: boolean | null
          locations?: Json | null
          rewards?: Json | null
          settings?: Json | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_campaigns_enterprise_id_fkey"
            columns: ["enterprise_id"]
            isOneToOne: false
            referencedRelation: "enterprise_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprise_profiles: {
        Row: {
          branding_colors: Json | null
          company_name: string
          created_at: string
          hashtags: string[] | null
          id: string
          industry: string[] | null
          logo_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          branding_colors?: Json | null
          company_name: string
          created_at?: string
          hashtags?: string[] | null
          id?: string
          industry?: string[] | null
          logo_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          branding_colors?: Json | null
          company_name?: string
          created_at?: string
          hashtags?: string[] | null
          id?: string
          industry?: string[] | null
          logo_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      influencer_collaborations: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          influencer_id: string
          payment_amount: number | null
          payment_status: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          influencer_id: string
          payment_amount?: number | null
          payment_status?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          influencer_id?: string
          payment_amount?: number | null
          payment_status?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "influencer_collaborations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "enterprise_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      uploads: {
        Row: {
          capcut_template: string | null
          challenge_id: string
          id: string
          likes: number | null
          status: string | null
          submitted_at: string | null
          tiktok_link: string | null
          user_id: string
          verified: boolean | null
          video_url: string | null
          views: number | null
        }
        Insert: {
          capcut_template?: string | null
          challenge_id: string
          id?: string
          likes?: number | null
          status?: string | null
          submitted_at?: string | null
          tiktok_link?: string | null
          user_id: string
          verified?: boolean | null
          video_url?: string | null
          views?: number | null
        }
        Update: {
          capcut_template?: string | null
          challenge_id?: string
          id?: string
          likes?: number | null
          status?: string | null
          submitted_at?: string | null
          tiktok_link?: string | null
          user_id?: string
          verified?: boolean | null
          video_url?: string | null
          views?: number | null
        }
        Relationships: []
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed_at: string | null
          id: string
          joined_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          id?: string
          joined_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          id?: string
          joined_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          coins_total: number | null
          created_at: string | null
          id: string
          nft_collected: Json | null
          rewards_claimed: Json | null
          updated_at: string | null
          user_id: string
          xp_total: number | null
        }
        Insert: {
          coins_total?: number | null
          created_at?: string | null
          id?: string
          nft_collected?: Json | null
          rewards_claimed?: Json | null
          updated_at?: string | null
          user_id: string
          xp_total?: number | null
        }
        Update: {
          coins_total?: number | null
          created_at?: string | null
          id?: string
          nft_collected?: Json | null
          rewards_claimed?: Json | null
          updated_at?: string | null
          user_id?: string
          xp_total?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
