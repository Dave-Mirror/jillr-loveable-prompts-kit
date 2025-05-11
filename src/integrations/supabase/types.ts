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
          created_at: string | null
          description: string | null
          end_date: string | null
          hashtags: string[] | null
          id: string
          start_date: string | null
          status: string | null
          title: string
          type: string | null
          updated_at: string | null
          user_id: string | null
          xp_reward: number | null
        }
        Insert: {
          coin_reward?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hashtags?: string[] | null
          id?: string
          start_date?: string | null
          status?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          xp_reward?: number | null
        }
        Update: {
          coin_reward?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          hashtags?: string[] | null
          id?: string
          start_date?: string | null
          status?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      context_triggers: {
        Row: {
          action_type: string
          active: boolean | null
          brand_id: string | null
          category: string | null
          condition_type: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          reward_id: string | null
          target_value: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          active?: boolean | null
          brand_id?: string | null
          category?: string | null
          condition_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          reward_id?: string | null
          target_value: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          active?: boolean | null
          brand_id?: string | null
          category?: string | null
          condition_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          reward_id?: string | null
          target_value?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "context_triggers_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      memory_snapshots: {
        Row: {
          context_score: number | null
          created_at: string | null
          data: Json | null
          id: string
          interpreted_summary: string | null
          snapshot_date: string
          user_id: string | null
        }
        Insert: {
          context_score?: number | null
          created_at?: string | null
          data?: Json | null
          id?: string
          interpreted_summary?: string | null
          snapshot_date: string
          user_id?: string | null
        }
        Update: {
          context_score?: number | null
          created_at?: string | null
          data?: Json | null
          id?: string
          interpreted_summary?: string | null
          snapshot_date?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reward_logs: {
        Row: {
          granted_at: string | null
          id: string
          reward_id: string | null
          reward_type: string | null
          status: string | null
          trigger_id: string | null
          user_id: string | null
        }
        Insert: {
          granted_at?: string | null
          id?: string
          reward_id?: string | null
          reward_type?: string | null
          status?: string | null
          trigger_id?: string | null
          user_id?: string | null
        }
        Update: {
          granted_at?: string | null
          id?: string
          reward_id?: string | null
          reward_type?: string | null
          status?: string | null
          trigger_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_logs_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_logs_trigger_id_fkey"
            columns: ["trigger_id"]
            isOneToOne: false
            referencedRelation: "context_triggers"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          reward_type: string
          title: string
          usage_limit: number | null
          value: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          reward_type: string
          title: string
          usage_limit?: number | null
          value: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          reward_type?: string
          title?: string
          usage_limit?: number | null
          value?: number
        }
        Relationships: []
      }
      uploads: {
        Row: {
          challenge_id: string | null
          created_at: string | null
          id: string
          likes: number | null
          updated_at: string | null
          user_id: string | null
          views: number | null
        }
        Insert: {
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          likes?: number | null
          updated_at?: string | null
          user_id?: string | null
          views?: number | null
        }
        Update: {
          challenge_id?: string | null
          created_at?: string | null
          id?: string
          likes?: number | null
          updated_at?: string | null
          user_id?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "uploads_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_context_settings: {
        Row: {
          allow_behavioral_tracking: boolean | null
          allow_data_analysis: boolean | null
          created_at: string | null
          id: string
          preferred_trigger_types: string[] | null
          time_windows: Json | null
          user_id: string | null
        }
        Insert: {
          allow_behavioral_tracking?: boolean | null
          allow_data_analysis?: boolean | null
          created_at?: string | null
          id?: string
          preferred_trigger_types?: string[] | null
          time_windows?: Json | null
          user_id?: string | null
        }
        Update: {
          allow_behavioral_tracking?: boolean | null
          allow_data_analysis?: boolean | null
          created_at?: string | null
          id?: string
          preferred_trigger_types?: string[] | null
          time_windows?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_data_permissions: {
        Row: {
          data_type: string
          date_given: string | null
          id: string
          status: boolean | null
          user_id: string | null
          xp_rewarded: number | null
        }
        Insert: {
          data_type: string
          date_given?: string | null
          id?: string
          status?: boolean | null
          user_id?: string | null
          xp_rewarded?: number | null
        }
        Update: {
          data_type?: string
          date_given?: string | null
          id?: string
          status?: boolean | null
          user_id?: string | null
          xp_rewarded?: number | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          coins_total: number | null
          created_at: string | null
          id: string
          rewards_claimed: string[] | null
          updated_at: string | null
          user_id: string
          xp_total: number | null
        }
        Insert: {
          coins_total?: number | null
          created_at?: string | null
          id?: string
          rewards_claimed?: string[] | null
          updated_at?: string | null
          user_id: string
          xp_total?: number | null
        }
        Update: {
          coins_total?: number | null
          created_at?: string | null
          id?: string
          rewards_claimed?: string[] | null
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
