import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rlaibtahedzqjnvipekj.supabase.co';
const supabaseAnonKey = 'sb_publishable_3RXaBq_w1-QmFxUHLD-cjQ_b0BUmsJy';

export const isSupabaseConfigured = true;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
