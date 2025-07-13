export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      budget_expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string | null
          description: string | null
          expense_date: string
          id: string
          itinerary_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency?: string | null
          description?: string | null
          expense_date: string
          id?: string
          itinerary_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          expense_date?: string
          id?: string
          itinerary_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budget_expenses_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "itineraries"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          average_cost_per_day: number | null
          best_time_to_visit: string | null
          coordinates: Json | null
          country: string
          created_at: string
          description: string | null
          id: string
          name: string
          safety_rating: number | null
        }
        Insert: {
          average_cost_per_day?: number | null
          best_time_to_visit?: string | null
          coordinates?: Json | null
          country: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          safety_rating?: number | null
        }
        Update: {
          average_cost_per_day?: number | null
          best_time_to_visit?: string | null
          coordinates?: Json | null
          country?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          safety_rating?: number | null
        }
        Relationships: []
      }
      itineraries: {
        Row: {
          budget: number | null
          created_at: string
          description: string | null
          destination_id: string | null
          end_date: string | null
          id: string
          start_date: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          description?: string | null
          destination_id?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          description?: string | null
          destination_id?: string | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      local_alerts: {
        Row: {
          active: boolean | null
          alert_type: string
          created_at: string
          destination_id: string | null
          expires_at: string | null
          id: string
          message: string
          severity: string | null
          title: string
        }
        Insert: {
          active?: boolean | null
          alert_type: string
          created_at?: string
          destination_id?: string | null
          expires_at?: string | null
          id?: string
          message: string
          severity?: string | null
          title: string
        }
        Update: {
          active?: boolean | null
          alert_type?: string
          created_at?: string
          destination_id?: string | null
          expires_at?: string | null
          id?: string
          message?: string
          severity?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "local_alerts_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          travel_preferences: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          travel_preferences?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          travel_preferences?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      travel_analytics: {
        Row: {
          id: string
          metric_type: string
          metric_value: Json
          recorded_at: string
          user_id: string
        }
        Insert: {
          id?: string
          metric_type: string
          metric_value: Json
          recorded_at?: string
          user_id: string
        }
        Update: {
          id?: string
          metric_type?: string
          metric_value?: Json
          recorded_at?: string
          user_id?: string
        }
        Relationships: []
      }
      travel_recommendations: {
        Row: {
          coordinates: Json | null
          created_at: string
          description: string | null
          destination_id: string | null
          id: string
          price_range: string | null
          rating: number | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Insert: {
          coordinates?: Json | null
          created_at?: string
          description?: string | null
          destination_id?: string | null
          id?: string
          price_range?: string | null
          rating?: number | null
          recommendation_type: string
          title: string
          user_id: string
        }
        Update: {
          coordinates?: Json | null
          created_at?: string
          description?: string | null
          destination_id?: string | null
          id?: string
          price_range?: string | null
          rating?: number | null
          recommendation_type?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "travel_recommendations_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      travel_tips: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          destination_name: string
          id: string
          importance: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          destination_name: string
          id: string
          importance?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          destination_name?: string
          id?: string
          importance?: string | null
          title?: string
        }
        Relationships: []
      }
      user_favorites: {
        Row: {
          created_at: string | null
          destination_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          destination_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          destination_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "world_destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_visited_destinations: {
        Row: {
          created_at: string | null
          destination_id: string | null
          id: string
          notes: string | null
          rating: number | null
          user_id: string | null
          visit_date: string | null
        }
        Insert: {
          created_at?: string | null
          destination_id?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          user_id?: string | null
          visit_date?: string | null
        }
        Update: {
          created_at?: string | null
          destination_id?: string | null
          id?: string
          notes?: string | null
          rating?: number | null
          user_id?: string | null
          visit_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_visited_destinations_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "world_destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      world_destinations: {
        Row: {
          activities: string[] | null
          attractions: string[] | null
          avg_temperature: Json | null
          best_time_to_visit: string[] | null
          climate: string | null
          continent: string
          coordinates: Json | null
          country: string
          created_at: string | null
          cuisine: string[] | null
          currency: string | null
          description: string | null
          id: string
          image_url: string | null
          languages: string[] | null
          name: string
          price_range: string | null
          rating: number | null
          safety_level: string | null
          timezone: string | null
          updated_at: string | null
          visa_required: boolean | null
        }
        Insert: {
          activities?: string[] | null
          attractions?: string[] | null
          avg_temperature?: Json | null
          best_time_to_visit?: string[] | null
          climate?: string | null
          continent: string
          coordinates?: Json | null
          country: string
          created_at?: string | null
          cuisine?: string[] | null
          currency?: string | null
          description?: string | null
          id: string
          image_url?: string | null
          languages?: string[] | null
          name: string
          price_range?: string | null
          rating?: number | null
          safety_level?: string | null
          timezone?: string | null
          updated_at?: string | null
          visa_required?: boolean | null
        }
        Update: {
          activities?: string[] | null
          attractions?: string[] | null
          avg_temperature?: Json | null
          best_time_to_visit?: string[] | null
          climate?: string | null
          continent?: string
          coordinates?: Json | null
          country?: string
          created_at?: string | null
          cuisine?: string[] | null
          currency?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          languages?: string[] | null
          name?: string
          price_range?: string | null
          rating?: number | null
          safety_level?: string | null
          timezone?: string | null
          updated_at?: string | null
          visa_required?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_destinations_by_budget: {
        Args: { budget_filter: string }
        Returns: {
          id: string
          name: string
          country: string
          continent: string
          description: string
          image_url: string
          rating: number
          price_range: string
          best_time_to_visit: string[]
          attractions: string[]
          cuisine: string[]
          activities: string[]
          coordinates: Json
          climate: string
          languages: string[]
          currency: string
          timezone: string
          safety_level: string
          visa_required: boolean
          avg_temperature: Json
        }[]
      }
      get_destinations_by_continent: {
        Args: { continent_filter: string }
        Returns: {
          id: string
          name: string
          country: string
          continent: string
          description: string
          image_url: string
          rating: number
          price_range: string
          best_time_to_visit: string[]
          attractions: string[]
          cuisine: string[]
          activities: string[]
          coordinates: Json
          climate: string
          languages: string[]
          currency: string
          timezone: string
          safety_level: string
          visa_required: boolean
          avg_temperature: Json
        }[]
      }
      get_user_favorites: {
        Args: { user_uuid: string }
        Returns: {
          destination_id: string
          destination_name: string
          country: string
          continent: string
          image_url: string
          rating: number
          price_range: string
          added_at: string
        }[]
      }
      search_destinations: {
        Args: { search_query: string }
        Returns: {
          id: string
          name: string
          country: string
          continent: string
          description: string
          image_url: string
          rating: number
          price_range: string
          best_time_to_visit: string[]
          attractions: string[]
          cuisine: string[]
          activities: string[]
          coordinates: Json
          climate: string
          languages: string[]
          currency: string
          timezone: string
          safety_level: string
          visa_required: boolean
          avg_temperature: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
