-- Dummy Seed Data for Development
-- Assuming categories are already seeded from schema.sql

DO $$
DECLARE
  cat_alam_id uuid;
  cat_buatan_id uuid;
  cat_museum_id uuid;
  cat_art_id uuid;
BEGIN
  SELECT id INTO cat_alam_id FROM categories WHERE slug = 'wisata-alam';
  SELECT id INTO cat_buatan_id FROM categories WHERE slug = 'wisata-buatan';
  SELECT id INTO cat_museum_id FROM categories WHERE slug = 'museum';
  SELECT id INTO cat_art_id FROM categories WHERE slug = 'wisata-art-space';

  -- Wisata Alam
  INSERT INTO destinations (category_id, name, slug, status) VALUES
  (cat_alam_id, 'Curug Dago', 'curug-dago', 'published'),
  (cat_alam_id, 'Gedong Tjai', 'gedong-tjai', 'published'),
  (cat_alam_id, 'Kampung Tjibarani', 'kampung-tjibarani', 'published'),
  (cat_alam_id, 'Sein Farm Sekemala', 'sein-farm-sekemala', 'published'),
  (cat_alam_id, 'Mupu Jeruk', 'mupu-jeruk', 'published'),
  (cat_alam_id, 'Wisata Petik Anggur', 'wisata-petik-anggur', 'published')
  ON CONFLICT (slug) DO NOTHING;

  -- Wisata Buatan
  INSERT INTO destinations (category_id, name, slug, status, price_info) VALUES
  (cat_buatan_id, 'Kiara Artha Park', 'kiara-artha-park', 'published', 'Rp 10.000'),
  (cat_buatan_id, 'Trans Studio Bandung', 'trans-studio-bandung', 'published', 'Rp 200.000'),
  (cat_buatan_id, 'Taman Lalu Lintas', 'taman-lalu-lintas', 'published', 'Rp 15.000'),
  (cat_buatan_id, 'Karang Setra Waterland', 'karang-setra-waterland', 'published', 'Rp 45.000')
  ON CONFLICT (slug) DO NOTHING;

  -- Museum
  INSERT INTO destinations (category_id, name, slug, status, price_info, address) VALUES
  (cat_museum_id, 'Museum Geologi', 'museum-geologi', 'published', 'Rp 3.000', 'Jl. Diponegoro No.57'),
  (cat_museum_id, 'Museum Gedung Sate', 'museum-gedung-sate', 'published', 'Rp 5.000', 'Jl. Diponegoro No.22'),
  (cat_museum_id, 'Museum Kota Bandung', 'museum-kota-bandung', 'published', 'Gratis', 'Jl. Aceh No.47'),
  (cat_museum_id, 'Museum Konferensi Asia Afrika', 'museum-asia-afrika', 'published', 'Gratis', 'Jl. Asia Afrika No.65')
  ON CONFLICT (slug) DO NOTHING;

  -- Wisata Art Space
  INSERT INTO destinations (category_id, name, slug, status) VALUES
  (cat_art_id, 'NuArt Sculpture Park', 'nuart-sculpture-park', 'published'),
  (cat_art_id, 'Kala Kini Nanti', 'kala-kini-nanti', 'published'),
  (cat_art_id, 'Grey Art Gallery', 'grey-art-gallery', 'published'),
  (cat_art_id, 'Selasar Sunaryo Art Space', 'selasar-sunaryo', 'published')
  ON CONFLICT (slug) DO NOTHING;
END $$;
