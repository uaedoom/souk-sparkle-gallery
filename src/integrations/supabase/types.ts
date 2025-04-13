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
      products: {
        Row: {
          category: Database["public"]["Enums"]["product_category_enum"]
          created_at: string
          currency: string
          description: string | null
          featured: boolean
          id: string
          image_url: string | null
          in_stock: boolean
          name: string
          price: number
          specs: Json | null
          trader_id: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["product_category_enum"]
          created_at?: string
          currency?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          in_stock?: boolean
          name: string
          price: number
          specs?: Json | null
          trader_id: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["product_category_enum"]
          created_at?: string
          currency?: string
          description?: string | null
          featured?: boolean
          id?: string
          image_url?: string | null
          in_stock?: boolean
          name?: string
          price?: number
          specs?: Json | null
          trader_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_trader_id_fkey"
            columns: ["trader_id"]
            isOneToOne: false
            referencedRelation: "traders"
            referencedColumns: ["id"]
          },
        ]
      }
      trader_applications: {
        Row: {
          business_description: string
          business_name: string
          contact_email: string
          contact_phone: string
          created_at: string
          id: string
          physical_location: string
          product_category: Database["public"]["Enums"]["product_category_enum"]
          specialty: string
          status: Database["public"]["Enums"]["application_status_enum"]
          updated_at: string
          user_id: string
          website: string | null
          years_experience: number
        }
        Insert: {
          business_description: string
          business_name: string
          contact_email: string
          contact_phone: string
          created_at?: string
          id?: string
          physical_location: string
          product_category: Database["public"]["Enums"]["product_category_enum"]
          specialty: string
          status?: Database["public"]["Enums"]["application_status_enum"]
          updated_at?: string
          user_id: string
          website?: string | null
          years_experience?: number
        }
        Update: {
          business_description?: string
          business_name?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string
          id?: string
          physical_location?: string
          product_category?: Database["public"]["Enums"]["product_category_enum"]
          specialty?: string
          status?: Database["public"]["Enums"]["application_status_enum"]
          updated_at?: string
          user_id?: string
          website?: string | null
          years_experience?: number
        }
        Relationships: []
      }
      traders: {
        Row: {
          banner_url: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          established_date: string | null
          id: string
          logo_url: string | null
          name: string
          physical_location: string | null
          rating: number | null
          specialty: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          banner_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          established_date?: string | null
          id?: string
          logo_url?: string | null
          name: string
          physical_location?: string | null
          rating?: number | null
          specialty?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          banner_url?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          established_date?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          physical_location?: string | null
          rating?: number | null
          specialty?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status_enum: "pending" | "approved" | "rejected"
      product_category_enum:
        | "Gold Jewelry"
        | "Silver Jewelry"
        | "Diamond Jewelry"
        | "Gemstone Jewelry"
        | "Watches"
        | "Custom Designs"
        | "Other"
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
    Enums: {
      application_status_enum: ["pending", "approved", "rejected"],
      product_category_enum: [
        "Gold Jewelry",
        "Silver Jewelry",
        "Diamond Jewelry",
        "Gemstone Jewelry",
        "Watches",
        "Custom Designs",
        "Other",
      ],
    },
  },
} as const
