import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_KEY: process.env.SUPABASE_KEY || '',
    AI_PROVIDER: process.env.AI_PROVIDER || 'default',
    AI_API_KEY: process.env.AI_API_KEY || ''
  }
};

export default nextConfig;
