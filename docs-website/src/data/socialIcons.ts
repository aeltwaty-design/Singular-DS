// Social Media Icons data from Figma design
// Supports colored and monochrome variants

export interface SocialIconData {
  id: string;
  name: string;
  nameAr: string;
  color: string; // Brand color
}

// All social media icons from the Figma design
export const socialIcons: SocialIconData[] = [
  { id: 'apple', name: 'Apple', nameAr: 'أبل', color: '#000000' },
  { id: 'discord', name: 'Discord', nameAr: 'ديسكورد', color: '#5865F2' },
  { id: 'dribbble', name: 'Dribbble', nameAr: 'دريبل', color: '#EA4C89' },
  { id: 'facebook', name: 'Facebook', nameAr: 'فيسبوك', color: '#1877F2' },
  { id: 'figma', name: 'Figma', nameAr: 'فيجما', color: '#F24E1E' },
  { id: 'github', name: 'GitHub', nameAr: 'جيت هب', color: '#181717' },
  { id: 'google', name: 'Google', nameAr: 'جوجل', color: '#4285F4' },
  { id: 'instagram', name: 'Instagram', nameAr: 'انستغرام', color: '#E4405F' },
  { id: 'linkedin', name: 'LinkedIn', nameAr: 'لينكد إن', color: '#0A66C2' },
  { id: 'pinterest', name: 'Pinterest', nameAr: 'بينترست', color: '#BD081C' },
  { id: 'reddit', name: 'Reddit', nameAr: 'ريديت', color: '#FF4500' },
  { id: 'signal', name: 'Signal', nameAr: 'سيجنال', color: '#3A76F0' },
  { id: 'snapchat', name: 'Snapchat', nameAr: 'سناب شات', color: '#FFFC00' },
  { id: 'telegram', name: 'Telegram', nameAr: 'تيليجرام', color: '#26A5E4' },
  { id: 'tiktok', name: 'TikTok', nameAr: 'تيك توك', color: '#000000' },
  { id: 'tumblr', name: 'Tumblr', nameAr: 'تمبلر', color: '#36465D' },
  { id: 'twitter', name: 'Twitter / X', nameAr: 'تويتر / إكس', color: '#000000' },
  { id: 'whatsapp', name: 'WhatsApp', nameAr: 'واتساب', color: '#25D366' },
  { id: 'youtube', name: 'YouTube', nameAr: 'يوتيوب', color: '#FF0000' },
];

// Search social icons by name
export function searchSocialIcons(query: string): SocialIconData[] {
  const lowerQuery = query.toLowerCase();
  return socialIcons.filter(icon =>
    icon.id.toLowerCase().includes(lowerQuery) ||
    icon.name.toLowerCase().includes(lowerQuery) ||
    icon.nameAr.includes(query)
  );
}

// Get social icon by id
export function getSocialIconById(id: string): SocialIconData | undefined {
  return socialIcons.find(i => i.id.toLowerCase() === id.toLowerCase());
}

// Get all social icon ids
export const allSocialIconIds = socialIcons.map(i => i.id);

