export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
          full_name: string | null;
          stripe_customer_id: string | null;
          has_access: boolean;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          stripe_customer_id?: string | null;
          has_access?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          stripe_customer_id?: string | null;
          has_access?: boolean;
        };
      };
      tiktok_accounts: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          created_at: string;
          updated_at: string;
          niche: string | null;
          status: 'warming' | 'active' | 'paused' | 'banned';
          warm_up_day: number;
          notes: string | null;
          total_views: number;
          follower_count: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          created_at?: string;
          updated_at?: string;
          niche?: string | null;
          status?: 'warming' | 'active' | 'paused' | 'banned';
          warm_up_day?: number;
          notes?: string | null;
          total_views?: number;
          follower_count?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          created_at?: string;
          updated_at?: string;
          niche?: string | null;
          status?: 'warming' | 'active' | 'paused' | 'banned';
          warm_up_day?: number;
          notes?: string | null;
          total_views?: number;
          follower_count?: number;
        };
      };
      hooks: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          niche: string;
          hook_text: string;
          is_used: boolean;
          account_id: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          niche: string;
          hook_text: string;
          is_used?: boolean;
          account_id?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          niche?: string;
          hook_text?: string;
          is_used?: boolean;
          account_id?: string | null;
        };
      };
      content_pieces: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          updated_at: string;
          title: string;
          hook_id: string | null;
          account_id: string | null;
          status: 'draft' | 'ready' | 'scheduled' | 'posted';
          scheduled_at: string | null;
          posted_at: string | null;
          views: number | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          hook_id?: string | null;
          account_id?: string | null;
          status?: 'draft' | 'ready' | 'scheduled' | 'posted';
          scheduled_at?: string | null;
          posted_at?: string | null;
          views?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          hook_id?: string | null;
          account_id?: string | null;
          status?: 'draft' | 'ready' | 'scheduled' | 'posted';
          scheduled_at?: string | null;
          posted_at?: string | null;
          views?: number | null;
          notes?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
