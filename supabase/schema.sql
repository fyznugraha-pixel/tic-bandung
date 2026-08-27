-- ==========================================
-- 1. ENUMS (Custom Types)
-- ==========================================

-- NFR-09: 3 State Harga Eksplisit
CREATE TYPE ticket_price_type AS ENUM ('FREE', 'PAID', 'UNCONFIRMED');

-- Status publikasi (FR-15)
CREATE TYPE publish_status AS ENUM ('DRAFT', 'PUBLISHED');

-- Tipe Konten Halaman (FR-20)
CREATE TYPE content_page_type AS ENUM ('EKONOMI_KREATIF', 'INFO_UMUM');


-- ==========================================
-- 2. TABLES
-- ==========================================

-- Kategori (FR-01)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    icon_url TEXT,
    color_cluster VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Destinasi Fisik Utama
CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    address TEXT,
    district VARCHAR(100),
    
    -- Koordinat GIS murni atau Float biasa
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    
    -- NFR-09: Harga
    ticket_type ticket_price_type NOT NULL DEFAULT 'UNCONFIRMED',
    ticket_nominal INTEGER, -- Hanya valid jika ticket_type = 'PAID'
    
    operating_hours JSONB,
    established_year INTEGER,
    
    -- Status Publikasi (FR-15)
    status publish_status NOT NULL DEFAULT 'DRAFT',
    
    -- NFR-10: Flag potensi duplikat
    is_potential_duplicate BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Validasi tingkat database agar nominal tidak diisi jika GRATIS/UNCONFIRMED
    CONSTRAINT ticket_price_logic CHECK (
        (ticket_type = 'PAID' AND ticket_nominal IS NOT NULL) OR 
        (ticket_type IN ('FREE', 'UNCONFIRMED') AND ticket_nominal IS NULL)
    )
);

-- Foto Destinasi (NFR-11)
CREATE TABLE destination_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID NOT NULL REFERENCES destinations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    source_photo_credit VARCHAR(255) NOT NULL, -- Wajib diisi sesuai NFR-11
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Konten Non-Fisik (FR-20)
CREATE TABLE content_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type content_page_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Walking Tours (FR-21)
CREATE TABLE walking_tours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER,
    status publish_status NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE walking_tour_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tour_id UUID NOT NULL REFERENCES walking_tours(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL, -- Opsional relasi ke tempat fisik
    stop_name VARCHAR(255) NOT NULL,
    order_sequence INTEGER NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ==========================================
-- 3. VIEWS (NFR-26)
-- ==========================================

-- Menghitung jumlah lokasi per kategori secara real-time dan super cepat
CREATE OR REPLACE VIEW category_stats_view AS
SELECT 
    c.id, 
    c.name, 
    c.slug,
    c.color_cluster,
    COUNT(d.id) AS total_published_locations
FROM 
    categories c
LEFT JOIN 
    destinations d ON c.id = d.category_id AND d.status = 'PUBLISHED'
GROUP BY 
    c.id;


-- ==========================================
-- 4. TRIGGERS & FUNCTIONS (NFR-10)
-- ==========================================

-- Fungsi untuk mengupdate updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_destinations_modtime
BEFORE UPDATE ON destinations
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- NFR-10: Fungsi untuk mendeteksi koordinat ganda menggunakan rumus Haversine dasar
-- Radius deteksi: ~10 meter (0.01 km)
CREATE OR REPLACE FUNCTION check_duplicate_coordinates()
RETURNS TRIGGER AS $$
DECLARE
    duplicate_exists BOOLEAN;
BEGIN
    -- Hitung jarak dengan entri lain menggunakan Haversine formula sederhana di SQL
    SELECT EXISTS (
        SELECT 1 FROM destinations
        WHERE id != NEW.id 
        AND status != 'DRAFT' -- hanya cek terhadap yang sudah publish
        AND (
            6371 * acos(
                cos(radians(NEW.latitude)) * cos(radians(latitude)) *
                cos(radians(longitude) - radians(NEW.longitude)) +
                sin(radians(NEW.latitude)) * sin(radians(latitude))
            )
        ) < 0.01 -- Kurang dari 10 meter (0.01 km)
    ) INTO duplicate_exists;
    
    IF duplicate_exists THEN
        NEW.is_potential_duplicate := TRUE;
    ELSE
        NEW.is_potential_duplicate := FALSE;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_duplicate_coordinates
BEFORE INSERT OR UPDATE OF latitude, longitude ON destinations
FOR EACH ROW
EXECUTE FUNCTION check_duplicate_coordinates();


-- ==========================================
-- 5. INITIAL DATA SEEDING (KATEGORI)
-- ==========================================

INSERT INTO categories (name, slug, color_cluster) VALUES
('Wisata Alam', 'wisata-alam', 'green'),
('Wisata Buatan', 'wisata-buatan', 'blue'),
('Museum', 'museum', 'gold'),
('Wisata Art Space', 'wisata-art-space', 'teal'),
('Taman Kota', 'taman-kota', 'green'),
('Kampung Kreatif', 'kampung-wisata-kreatif', 'emerald'),
('Atraksi Kesenian', 'atraksi-kesenian', 'purple'),
('Kuliner Legendaris', 'kuliner-legendaris', 'orange'),
('Kuliner Malam', 'kuliner-malam', 'orange'),
('Belanja Souvenir', 'belanja-souvenir', 'pink'),
('Wisata Ekonomi Kreatif', 'wisata-ekonomi-kreatif', 'rose'),
('Walking Tour', 'walking-tour', 'slate'),
('Public Space', 'public-space', 'cyan'),
('Religi & Ziarah', 'religi-ziarah', 'yellow'),
('Rekreasi', 'rekreasi', 'blue')
ON CONFLICT (slug) DO NOTHING;
