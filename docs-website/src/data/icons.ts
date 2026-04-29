// Icon Library Data - Full Iconsax/Vuesax icon library
// Dynamically loads icons from iconsax-react package
// 6 variants per icon: Linear, Bold, Outline, TwoTone, Bulk, Broken

export type IconVariant = 'linear' | 'bold' | 'outline' | 'twotone' | 'bulk' | 'broken';

export interface IconData {
  name: string;
  category: string;
  keywords?: string[];
}

export interface IconCategory {
  id: string;
  name: string;
  nameAr: string;
  icons: IconData[];
}

// Category mappings for iconsax icons
const categoryKeywords: Record<string, { keywords: string[]; nameAr: string }> = {
  arrow: { keywords: ['arrow', 'arrange', 'back', 'forward', 'rotate', 'undo', 'redo', 'maximize', 'login', 'logout', 'import', 'export', 'receive', 'send', 'convert', 'recovery', 'refresh', 'repeat'], nameAr: 'الأسهم' },
  user: { keywords: ['user', 'profile', 'people', 'personal', 'teacher', 'man', 'woman'], nameAr: 'المستخدمين' },
  message: { keywords: ['message', 'sms', 'directbox', 'direct'], nameAr: 'الرسائل' },
  call: { keywords: ['call', 'calling'], nameAr: 'الاتصال' },
  location: { keywords: ['location', 'map', 'gps', 'global', 'routing', 'route', 'radar', 'discover'], nameAr: 'الموقع' },
  search: { keywords: ['search'], nameAr: 'البحث' },
  security: { keywords: ['shield', 'security', 'lock', 'unlock', 'password', 'key', 'finger', 'scan', 'eye', 'alarm', 'forbidden'], nameAr: 'الأمان' },
  media: { keywords: ['image', 'gallery', 'video', 'play', 'pause', 'stop', 'record', 'camera', 'microphone', 'volume', 'music', 'next', 'previous', 'forward', 'backward', 'shuffle', 'repeat', 'subtitle', 'screen', 'airpod', 'headphone', 'speaker', 'radio'], nameAr: 'الوسائط' },
  money: { keywords: ['wallet', 'card', 'receipt', 'money', 'dollar', 'coin', 'strongbox', 'ticket', 'percentage', 'discount', 'math', 'transaction', 'bitcoin', 'crypto'], nameAr: 'المال' },
  shop: { keywords: ['shop', 'shopping', 'bag', 'barcode', 'buy'], nameAr: 'التسوق' },
  document: { keywords: ['folder', 'document', 'note', 'sticky', 'task', 'book', 'clipboard', 'archive'], nameAr: 'الملفات' },
  design: { keywords: ['brush', 'color', 'paint', 'roller', 'eraser', 'pen', 'path', 'bezier', 'bucket', 'magic', 'design', 'shapes', 'blend', 'size', 'crop', 'mask', 'scissor', 'slice', 'component', 'format', 'omega', 'layer', 'blur', 'lifebuoy', 'ruler'], nameAr: 'التصميم' },
  device: { keywords: ['mobile', 'tablet', 'monitor', 'cpu', 'ram', 'printer', 'mouse', 'keyboard', 'gameboy', 'game', 'watch', 'airdrop', 'bluetooth', 'usb', 'simcard', 'wifi', 'battery', 'charger', 'electricity', 'driver', 'mirroring', 'device'], nameAr: 'الأجهزة' },
  weather: { keywords: ['sun', 'moon', 'cloud', 'drop', 'wind'], nameAr: 'الطقس' },
  support: { keywords: ['like', 'dislike', 'heart', 'medal', 'smil', 'support'], nameAr: 'الدعم' },
  programming: { keywords: ['code', 'command', 'data', 'hierarchy', 'hashtag', 'sidebar', 'programming'], nameAr: 'البرمجة' },
  grid: { keywords: ['grid', 'element', 'candle', 'category', 'row', 'fatrow', 'kanban', 'slider', 'toggle', 'menu', 'hamberger'], nameAr: 'الشبكة' },
  building: { keywords: ['building', 'bank', 'hospital', 'house', 'home', 'courthouse', 'safe'], nameAr: 'المباني' },
  transport: { keywords: ['car', 'bus', 'airplane', 'ship', 'truck', 'driving', 'smart', 'gas'], nameAr: 'النقل' },
  notification: { keywords: ['notification', 'bell'], nameAr: 'الإشعارات' },
  time: { keywords: ['clock', 'timer', 'calendar', 'time', 'wrist'], nameAr: 'الوقت' },
  essential: { keywords: ['home', 'add', 'minus', 'close', 'tick', 'trash', 'edit', 'setting', 'more', 'info', 'danger', 'warning', 'verify', 'crown', 'flag', 'cup', 'gift', 'star', 'flash', 'slash', 'link', 'tag', 'cake', 'reserve', 'sticker', 'ghost', 'lamp', 'tree', 'milk', 'coffee', 'pet', 'weight', 'glass', 'box', 'emoji', 'happy', 'activity', 'judge', 'ranking', 'level', 'triangle', 'diamond', 'status', 'signpost', 'mirror', 'bubble', 'grammerly', 'computing', 'information', 'autobright', 'cube', 'rotate', 'cd', 'chrome', 'instagram', 'speedometer', 'sound', 'story', 'chart', 'copy', 'check', 'award', 'sort', 'filter', 'broom', 'health', 'lovely'], nameAr: 'الأساسية' },
  crypto: { keywords: ['aave', 'ankr', 'augur', 'avalanche', 'binance', 'cardano', 'celsius', 'chainlink', 'civic', 'dai', 'dash', 'decred', 'dent', 'emercoin', 'enjin', 'eos', 'ethereum', 'ftx', 'harmony', 'hedera', 'hex', 'huobi', 'iost', 'kyber', 'litecoin', 'maker', 'monero', 'nebulas', 'nem', 'nexo', 'ocean', 'okb', 'ontology', 'polkadot', 'polygon', 'polyswarm', 'quant', 'siacoin', 'solana', 'stacks', 'stellar', 'tenx', 'tether', 'theta', 'thorchain', 'tron', 'usd', 'velas', 'wanchain', 'xrp', 'zel'], nameAr: 'العملات الرقمية' },
  brand: { keywords: ['android', 'apple', 'blogger', 'bootstrap', 'dribbble', 'dropbox', 'facebook', 'figma', 'framer', 'google', 'html', 'illustrator', 'javascript', 'messenger', 'okru', 'paypal', 'photoshop', 'python', 'shutterstock', 'slack', 'snapchat', 'spotify', 'trello', 'twitch', 'ui8', 'whatsapp', 'windows', 'xd', 'xiaomi', 'youtube'], nameAr: 'العلامات التجارية' },
};

// Build categories from iconsax-react exports
function categorizeIcon(name: string): string {
  const lowerName = name.toLowerCase();
  
  for (const [category, data] of Object.entries(categoryKeywords)) {
    if (data.keywords.some(keyword => lowerName.includes(keyword))) {
      return category;
    }
  }
  return 'essential'; // Default category
}

// Import all icon names from iconsax-react at build time
import * as IconsaxIcons from 'iconsax-react';

// Get all icon names
const allIconsaxNames = Object.keys(IconsaxIcons).filter(key => {
  const icon = (IconsaxIcons as Record<string, unknown>)[key];
  return icon && typeof icon === 'object' && key !== 'default';
});

// Build icon data for all icons
const allIcons: IconData[] = [
  // Add custom icons first
  {
    name: 'Close',
    category: 'essential',
    keywords: ['close', 'dismiss', 'cancel', 'remove', 'x', 'exit'],
  },
  // Then all iconsax icons
  ...allIconsaxNames.map(name => ({
    name,
    category: categorizeIcon(name),
  })),
];

// Group icons by category
const iconsByCategory = allIcons.reduce((acc, icon) => {
  if (!acc[icon.category]) {
    acc[icon.category] = [];
  }
  acc[icon.category].push(icon);
  return acc;
}, {} as Record<string, IconData[]>);

// Build category list
export const iconCategories: IconCategory[] = Object.entries(iconsByCategory)
  .map(([id, icons]) => ({
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    nameAr: categoryKeywords[id]?.nameAr || id,
    icons: icons.sort((a, b) => a.name.localeCompare(b.name)),
  }))
  .sort((a, b) => {
    // Put essential first, then sort alphabetically
    if (a.id === 'essential') return -1;
    if (b.id === 'essential') return 1;
    return a.name.localeCompare(b.name);
  });

// All unique icon names for quick lookup
export const allIconNames = allIconsaxNames;

// Get icon by name
export function getIconByName(name: string): IconData | undefined {
  return allIcons.find(i => i.name.toLowerCase() === name.toLowerCase());
}

// Search icons
export function searchIcons(query: string): IconData[] {
  const lowerQuery = query.toLowerCase();
  return allIcons.filter(icon => icon.name.toLowerCase().includes(lowerQuery));
}

// Get icons by category
export function getIconsByCategory(categoryId: string): IconData[] {
  return iconsByCategory[categoryId] || [];
}

// Variant descriptions for iconsax
export const variantDescriptions = {
  linear: {
    en: 'Clean, minimal line icons with consistent stroke width',
    ar: 'أيقونات خطية نظيفة وبسيطة بعرض خط متسق',
  },
  bold: {
    en: 'Solid, filled icons for strong visual impact',
    ar: 'أيقونات صلبة مملوءة لتأثير بصري قوي',
  },
  outline: {
    en: 'Double-line icons with inner and outer strokes',
    ar: 'أيقونات بخطين داخلي وخارجي',
  },
  twotone: {
    en: 'Two-color icons with primary and secondary fills',
    ar: 'أيقونات بلونين مع تعبئة أساسية وثانوية',
  },
  bulk: {
    en: 'Multi-layered icons with varying opacities',
    ar: 'أيقونات متعددة الطبقات بشفافيات متفاوتة',
  },
  broken: {
    en: 'Stylized icons with intentional line breaks',
    ar: 'أيقونات منمقة بفواصل خطية مقصودة',
  },
};
