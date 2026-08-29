'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { logAdminAction } from './log';

// --- HERO SLIDER ACTIONS ---

export async function createHeroSlider(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('hero_sliders').insert([{
    title: formData.get('title'),
    subtitle: formData.get('subtitle'),
    image_url: formData.get('image_url'),
    button_link: formData.get('button_link'),
    is_active: formData.get('is_active') === 'on'
  }]);
  if (error) return { error: error.message };
  revalidatePath('/admin/hero-slider');
  revalidatePath('/');
  await logAdminAction('CREATE', 'HERO_SLIDER', formData.get('title') as string);
  return { success: true };
}

export async function updateHeroSlider(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('hero_sliders').update({
    title: formData.get('title'),
    subtitle: formData.get('subtitle'),
    image_url: formData.get('image_url'),
    button_link: formData.get('button_link'),
    is_active: formData.get('is_active') === 'on'
  }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/hero-slider');
  revalidatePath('/');
  await logAdminAction('UPDATE', 'HERO_SLIDER', formData.get('title') as string);
  return { success: true };
}

export async function deleteHeroSlider(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('hero_sliders').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/hero-slider');
  revalidatePath('/');
  await logAdminAction('DELETE', 'HERO_SLIDER', `ID: ${id}`);
  return { success: true };
}

// --- NEWS ARTICLES ACTIONS ---

export async function createNewsArticle(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('news_articles').insert([{
    title: formData.get('title'),
    category: formData.get('category'),
    date_published: formData.get('date_published'),
    image_url: formData.get('image_url'),
    color_theme: formData.get('color_theme')
  }]);
  if (error) return { error: error.message };
  revalidatePath('/admin/berita');
  revalidatePath('/');
  await logAdminAction('CREATE', 'NEWS', formData.get('title') as string);
  return { success: true };
}

export async function updateNewsArticle(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('news_articles').update({
    title: formData.get('title'),
    category: formData.get('category'),
    date_published: formData.get('date_published'),
    image_url: formData.get('image_url'),
    color_theme: formData.get('color_theme')
  }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/berita');
  revalidatePath('/');
  await logAdminAction('UPDATE', 'NEWS', formData.get('title') as string);
  return { success: true };
}

export async function deleteNewsArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('news_articles').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/berita');
  revalidatePath('/');
  await logAdminAction('DELETE', 'NEWS', `ID: ${id}`);
  return { success: true };
}

// --- GALLERIES ACTIONS ---

export async function createGallery(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('galleries').insert([{
    title: formData.get('title'),
    category: formData.get('category'),
    image_url: formData.get('image_url'),
    is_featured: formData.get('is_featured') === 'on'
  }]);
  if (error) return { error: error.message };
  revalidatePath('/admin/galeri');
  revalidatePath('/');
  await logAdminAction('CREATE', 'GALLERY', formData.get('title') as string);
  return { success: true };
}

export async function updateGallery(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from('galleries').update({
    title: formData.get('title'),
    category: formData.get('category'),
    image_url: formData.get('image_url'),
    is_featured: formData.get('is_featured') === 'on'
  }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/galeri');
  revalidatePath('/');
  await logAdminAction('UPDATE', 'GALLERY', formData.get('title') as string);
  return { success: true };
}

export async function deleteGallery(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('galleries').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/galeri');
  revalidatePath('/');
  await logAdminAction('DELETE', 'GALLERY', `ID: ${id}`);
  return { success: true };
}

// --- SITE SETTINGS ---

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
  return data;
}

export async function updateSiteSettings(formData: FormData) {
  const supabase = await createClient();
  
  const updates = {
    description: formData.get('description'),
    address: formData.get('address'),
    whatsapp_number: formData.get('whatsapp_number'),
    emergency_police: formData.get('emergency_police'),
    emergency_ambulance: formData.get('emergency_ambulance'),
    emergency_fire: formData.get('emergency_fire'),
    facebook_url: formData.get('facebook_url'),
    instagram_url: formData.get('instagram_url'),
    youtube_url: formData.get('youtube_url'),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('site_settings')
    .update(updates)
    .eq('id', '00000000-0000-0000-0000-000000000001');

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/pengaturan');
  await logAdminAction('UPDATE', 'SETTINGS', 'Pengaturan Website');
  return { success: true };
}

export async function toggleNewsStatus(id: string, currentStatus: string) {
  const supabase = await createClient();
  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  const { error } = await supabase.from('news_articles').update({ status: newStatus }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/berita');
  revalidatePath('/');
  await logAdminAction('UPDATE', 'NEWS_STATUS', "ID:  to ");
  return { success: true, newStatus };
}

export async function toggleGalleryStatus(id: string, currentStatus: string) {
  const supabase = await createClient();
  const newStatus = currentStatus === 'published' ? 'draft' : 'published';
  const { error } = await supabase.from('galleries').update({ status: newStatus }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/galeri');
  revalidatePath('/');
  await logAdminAction('UPDATE', 'GALLERY_STATUS', "ID:  to ");
  return { success: true, newStatus };
}
