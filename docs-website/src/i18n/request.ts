import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Try to get locale from cookie first, then header, default to 'en'
  const cookieStore = await cookies();
  const headerStore = await headers();
  
  const localeCookie = cookieStore.get('locale')?.value;
  const acceptLanguage = headerStore.get('accept-language');
  
  let locale = localeCookie || 'en';
  
  // Check if Arabic is preferred
  if (!localeCookie && acceptLanguage?.includes('ar')) {
    locale = 'ar';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

