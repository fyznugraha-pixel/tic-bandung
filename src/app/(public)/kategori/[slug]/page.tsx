import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import CategoryListingUI from '@/components/public/CategoryListingUI';

// Reusable Next.js Metadata based on category
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const supabase = await createClient();
  
  const { data: category } = await supabase
    .from('categories')
    .select('name, description')
    .eq('slug', slug)
    .single();

  if (!category) return { title: 'Kategori Tidak Ditemukan' };

  return {
    title: `${category.name} | TIC Kota Bandung`,
    description: category.description || `Jelajahi destinasi ${category.name} di Kota Bandung.`,
  };
}

import EkonomiKreatifUI from '@/components/public/EkonomiKreatifUI';
import WalkingTourUI from '@/components/public/WalkingTourUI';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const supabase = await createClient();

  // 1. Fetch category details
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!category) {
    notFound();
  }

  // Handle Editorial/Walking Tour Exceptions (FR-20 & FR-21)
  if (slug === 'wisata-ekonomi-kreatif') {
    return <EkonomiKreatifUI />;
  }
  if (slug === 'walking-tour') {
    return <WalkingTourUI />;
  }

  // 2. Fetch all PUBLISHED destinations for this category
  // We use supabase relational query to get images
  const { data: destinations, error } = await supabase
    .from('destinations')
    .select(`
      id, 
      name, 
      slug, 
      description, 
      district,
      ticket_type,
      ticket_nominal,
      operating_hours,
      destination_images (
        image_url
      )
    `)
    .eq('category_id', category.id)
    .eq('status', 'published');

  if (error) {
    console.error("Supabase Fetch Error:", error);
  }

  return (
    <CategoryListingUI 
      category={category} 
      initialDestinations={destinations || []} 
    />
  );
}
