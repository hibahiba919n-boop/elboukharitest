-- ============================================================================
-- TOUABEL EL BOUKHARI - SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- ============================================================================

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name JSONB NOT NULL, -- { "ar": "...", "fr": "...", "en": "..." }
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name JSONB NOT NULL,
    category TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    category_name JSONB NOT NULL,
    short_description JSONB NOT NULL,
    description JSONB NOT NULL,
    ingredients JSONB,
    origin JSONB,
    nutritional_info JSONB,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    reviews JSONB DEFAULT '[]'::jsonb,
    weight_prices JSONB NOT NULL DEFAULT '[]'::jsonb,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_best_seller BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. RECIPE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.recipe_categories (
    id TEXT PRIMARY KEY,
    name JSONB NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. RECIPES TABLE
CREATE TABLE IF NOT EXISTS public.recipes (
    id TEXT PRIMARY KEY,
    title JSONB NOT NULL,
    category TEXT REFERENCES public.recipe_categories(id) ON DELETE SET NULL,
    description JSONB NOT NULL,
    image TEXT NOT NULL,
    prep_time TEXT NOT NULL,
    cook_time TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    difficulty_label JSONB,
    servings INTEGER NOT NULL DEFAULT 4,
    ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    spices_used JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.coupons (
    code TEXT PRIMARY KEY,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    value NUMERIC(10, 2) NOT NULL,
    min_subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    shipping_address JSONB NOT NULL,
    payment_method TEXT NOT NULL DEFAULT 'cod',
    payment_status TEXT NOT NULL DEFAULT 'pending',
    tracking_number TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SHIPPING RATES TABLE (58 WILAYAS)
CREATE TABLE IF NOT EXISTS public.shipping_rates (
    code INTEGER PRIMARY KEY,
    name JSONB NOT NULL,
    home_rate NUMERIC(10, 2) NOT NULL,
    desk_rate NUMERIC(10, 2) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_rates ENABLE ROW LEVEL SECURITY;

-- Allow public read access to catalog, recipes, coupons, and shipping rates
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Recipe Categories" ON public.recipe_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Recipes" ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Public Read Coupons" ON public.coupons FOR SELECT USING (true);
CREATE POLICY "Public Read Shipping Rates" ON public.shipping_rates FOR SELECT USING (true);

-- Allow public order submission (Checkout)
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Own Orders" ON public.orders FOR SELECT USING (true);

-- Admin write policies (allows full management for authenticated users or public if using anon key in admin mode)
CREATE POLICY "Allow All on Categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All on Products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All on Recipe Categories" ON public.recipe_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All on Recipes" ON public.recipes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All on Coupons" ON public.coupons FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All on Orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow All on Shipping Rates" ON public.shipping_rates FOR ALL USING (true) WITH CHECK (true);
