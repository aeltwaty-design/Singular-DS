// Flag data for country flags from Figma design
// Uses ISO 3166-1 alpha-2 country codes

export interface FlagData {
  code: string;
  name: string;
  nameAr: string;
}

// All flags from the Figma design with country names
export const flags: FlagData[] = [
  // A
  { code: 'AD', name: 'Andorra', nameAr: 'أندورا' },
  { code: 'AE', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة' },
  { code: 'AF', name: 'Afghanistan', nameAr: 'أفغانستان' },
  { code: 'AG', name: 'Antigua and Barbuda', nameAr: 'أنتيغوا وبربودا' },
  { code: 'AI', name: 'Anguilla', nameAr: 'أنغيلا' },
  { code: 'AL', name: 'Albania', nameAr: 'ألبانيا' },
  { code: 'AM', name: 'Armenia', nameAr: 'أرمينيا' },
  // AN (Netherlands Antilles) removed - dissolved in 2010, not in flag-icons
  { code: 'AO', name: 'Angola', nameAr: 'أنغولا' },
  { code: 'AR', name: 'Argentina', nameAr: 'الأرجنتين' },
  { code: 'AT', name: 'Austria', nameAr: 'النمسا' },
  { code: 'AU', name: 'Australia', nameAr: 'أستراليا' },
  { code: 'AW', name: 'Aruba', nameAr: 'أروبا' },
  { code: 'AX', name: 'Åland Islands', nameAr: 'جزر آلاند' },
  { code: 'AZ', name: 'Azerbaijan', nameAr: 'أذربيجان' },
  
  // B
  { code: 'BA', name: 'Bosnia and Herzegovina', nameAr: 'البوسنة والهرسك' },
  { code: 'BB', name: 'Barbados', nameAr: 'بربادوس' },
  { code: 'BD', name: 'Bangladesh', nameAr: 'بنغلاديش' },
  { code: 'BE', name: 'Belgium', nameAr: 'بلجيكا' },
  { code: 'BF', name: 'Burkina Faso', nameAr: 'بوركينا فاسو' },
  { code: 'BG', name: 'Bulgaria', nameAr: 'بلغاريا' },
  { code: 'BH', name: 'Bahrain', nameAr: 'البحرين' },
  { code: 'BI', name: 'Burundi', nameAr: 'بوروندي' },
  { code: 'BJ', name: 'Benin', nameAr: 'بنين' },
  { code: 'BM', name: 'Bermuda', nameAr: 'برمودا' },
  { code: 'BN', name: 'Brunei', nameAr: 'بروناي' },
  { code: 'BO', name: 'Bolivia', nameAr: 'بوليفيا' },
  { code: 'BR', name: 'Brazil', nameAr: 'البرازيل' },
  { code: 'BS', name: 'Bahamas', nameAr: 'الباهاما' },
  { code: 'BT', name: 'Bhutan', nameAr: 'بوتان' },
  { code: 'BW', name: 'Botswana', nameAr: 'بوتسوانا' },
  { code: 'BY', name: 'Belarus', nameAr: 'بيلاروسيا' },
  { code: 'BZ', name: 'Belize', nameAr: 'بليز' },
  
  // C
  { code: 'CA', name: 'Canada', nameAr: 'كندا' },
  { code: 'CD', name: 'DR Congo', nameAr: 'جمهورية الكونغو الديمقراطية' },
  { code: 'CF', name: 'Central African Republic', nameAr: 'جمهورية أفريقيا الوسطى' },
  { code: 'CG', name: 'Republic of the Congo', nameAr: 'جمهورية الكونغو' },
  { code: 'CH', name: 'Switzerland', nameAr: 'سويسرا' },
  { code: 'CI', name: 'Côte d\'Ivoire', nameAr: 'ساحل العاج' },
  { code: 'CL', name: 'Chile', nameAr: 'تشيلي' },
  { code: 'CM', name: 'Cameroon', nameAr: 'الكاميرون' },
  { code: 'CN', name: 'China', nameAr: 'الصين' },
  { code: 'CO', name: 'Colombia', nameAr: 'كولومبيا' },
  { code: 'CR', name: 'Costa Rica', nameAr: 'كوستاريكا' },
  { code: 'CU', name: 'Cuba', nameAr: 'كوبا' },
  { code: 'CV', name: 'Cape Verde', nameAr: 'الرأس الأخضر' },
  { code: 'CY', name: 'Cyprus', nameAr: 'قبرص' },
  { code: 'CZ', name: 'Czech Republic', nameAr: 'التشيك' },
  
  // D
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا' },
  { code: 'DJ', name: 'Djibouti', nameAr: 'جيبوتي' },
  { code: 'DK', name: 'Denmark', nameAr: 'الدنمارك' },
  { code: 'DM', name: 'Dominica', nameAr: 'دومينيكا' },
  { code: 'DO', name: 'Dominican Republic', nameAr: 'جمهورية الدومينيكان' },
  { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر' },
  
  // E
  { code: 'EC', name: 'Ecuador', nameAr: 'الإكوادور' },
  { code: 'EE', name: 'Estonia', nameAr: 'إستونيا' },
  { code: 'EG', name: 'Egypt', nameAr: 'مصر' },
  { code: 'ER', name: 'Eritrea', nameAr: 'إريتريا' },
  { code: 'ES', name: 'Spain', nameAr: 'إسبانيا' },
  { code: 'ET', name: 'Ethiopia', nameAr: 'إثيوبيا' },
  { code: 'EU', name: 'European Union', nameAr: 'الاتحاد الأوروبي' },
  
  // F
  { code: 'FI', name: 'Finland', nameAr: 'فنلندا' },
  { code: 'FJ', name: 'Fiji', nameAr: 'فيجي' },
  { code: 'FK', name: 'Falkland Islands', nameAr: 'جزر فوكلاند' },
  { code: 'FM', name: 'Micronesia', nameAr: 'ميكرونيزيا' },
  { code: 'FR', name: 'France', nameAr: 'فرنسا' },
  
  // G
  { code: 'GA', name: 'Gabon', nameAr: 'الغابون' },
  { code: 'GB', name: 'United Kingdom', nameAr: 'المملكة المتحدة' },
  { code: 'GD', name: 'Grenada', nameAr: 'غرينادا' },
  { code: 'GE', name: 'Georgia', nameAr: 'جورجيا' },
  { code: 'GG', name: 'Guernsey', nameAr: 'غيرنزي' },
  { code: 'GH', name: 'Ghana', nameAr: 'غانا' },
  { code: 'GI', name: 'Gibraltar', nameAr: 'جبل طارق' },
  { code: 'GM', name: 'Gambia', nameAr: 'غامبيا' },
  { code: 'GN', name: 'Guinea', nameAr: 'غينيا' },
  { code: 'GQ', name: 'Equatorial Guinea', nameAr: 'غينيا الاستوائية' },
  { code: 'GR', name: 'Greece', nameAr: 'اليونان' },
  { code: 'GT', name: 'Guatemala', nameAr: 'غواتيمالا' },
  { code: 'GW', name: 'Guinea-Bissau', nameAr: 'غينيا بيساو' },
  { code: 'GY', name: 'Guyana', nameAr: 'غيانا' },
  
  // H
  { code: 'HK', name: 'Hong Kong', nameAr: 'هونغ كونغ' },
  { code: 'HN', name: 'Honduras', nameAr: 'هندوراس' },
  { code: 'HR', name: 'Croatia', nameAr: 'كرواتيا' },
  { code: 'HT', name: 'Haiti', nameAr: 'هايتي' },
  { code: 'HU', name: 'Hungary', nameAr: 'المجر' },
  
  // I
  { code: 'ID', name: 'Indonesia', nameAr: 'إندونيسيا' },
  { code: 'IE', name: 'Ireland', nameAr: 'أيرلندا' },
  { code: 'IM', name: 'Isle of Man', nameAr: 'جزيرة مان' },
  { code: 'IN', name: 'India', nameAr: 'الهند' },
  { code: 'IQ', name: 'Iraq', nameAr: 'العراق' },
  { code: 'IR', name: 'Iran', nameAr: 'إيران' },
  { code: 'IS', name: 'Iceland', nameAr: 'آيسلندا' },
  { code: 'IT', name: 'Italy', nameAr: 'إيطاليا' },
  
  // J
  { code: 'JE', name: 'Jersey', nameAr: 'جيرسي' },
  { code: 'JM', name: 'Jamaica', nameAr: 'جامايكا' },
  { code: 'JO', name: 'Jordan', nameAr: 'الأردن' },
  { code: 'JP', name: 'Japan', nameAr: 'اليابان' },
  
  // K
  { code: 'KE', name: 'Kenya', nameAr: 'كينيا' },
  { code: 'KG', name: 'Kyrgyzstan', nameAr: 'قيرغيزستان' },
  { code: 'KH', name: 'Cambodia', nameAr: 'كمبوديا' },
  { code: 'KM', name: 'Comoros', nameAr: 'جزر القمر' },
  { code: 'KN', name: 'Saint Kitts and Nevis', nameAr: 'سانت كيتس ونيفيس' },
  { code: 'KP', name: 'North Korea', nameAr: 'كوريا الشمالية' },
  { code: 'KR', name: 'South Korea', nameAr: 'كوريا الجنوبية' },
  { code: 'KW', name: 'Kuwait', nameAr: 'الكويت' },
  { code: 'KY', name: 'Cayman Islands', nameAr: 'جزر كايمان' },
  { code: 'KZ', name: 'Kazakhstan', nameAr: 'كازاخستان' },
  
  // L
  { code: 'LA', name: 'Laos', nameAr: 'لاوس' },
  { code: 'LB', name: 'Lebanon', nameAr: 'لبنان' },
  { code: 'LC', name: 'Saint Lucia', nameAr: 'سانت لوسيا' },
  { code: 'LI', name: 'Liechtenstein', nameAr: 'ليختنشتاين' },
  { code: 'LK', name: 'Sri Lanka', nameAr: 'سريلانكا' },
  { code: 'LR', name: 'Liberia', nameAr: 'ليبيريا' },
  { code: 'LS', name: 'Lesotho', nameAr: 'ليسوتو' },
  { code: 'LT', name: 'Lithuania', nameAr: 'ليتوانيا' },
  { code: 'LU', name: 'Luxembourg', nameAr: 'لوكسمبورغ' },
  { code: 'LV', name: 'Latvia', nameAr: 'لاتفيا' },
  { code: 'LY', name: 'Libya', nameAr: 'ليبيا' },
  
  // M
  { code: 'MA', name: 'Morocco', nameAr: 'المغرب' },
  { code: 'MC', name: 'Monaco', nameAr: 'موناكو' },
  { code: 'MD', name: 'Moldova', nameAr: 'مولدوفا' },
  { code: 'ME', name: 'Montenegro', nameAr: 'الجبل الأسود' },
  { code: 'MG', name: 'Madagascar', nameAr: 'مدغشقر' },
  { code: 'MK', name: 'North Macedonia', nameAr: 'مقدونيا الشمالية' },
  { code: 'ML', name: 'Mali', nameAr: 'مالي' },
  { code: 'MM', name: 'Myanmar', nameAr: 'ميانمار' },
  { code: 'MN', name: 'Mongolia', nameAr: 'منغوليا' },
  { code: 'MO', name: 'Macau', nameAr: 'ماكاو' },
  { code: 'MR', name: 'Mauritania', nameAr: 'موريتانيا' },
  { code: 'MS', name: 'Montserrat', nameAr: 'مونتسيرات' },
  { code: 'MT', name: 'Malta', nameAr: 'مالطا' },
  { code: 'MU', name: 'Mauritius', nameAr: 'موريشيوس' },
  { code: 'MV', name: 'Maldives', nameAr: 'المالديف' },
  { code: 'MW', name: 'Malawi', nameAr: 'ملاوي' },
  { code: 'MX', name: 'Mexico', nameAr: 'المكسيك' },
  { code: 'MY', name: 'Malaysia', nameAr: 'ماليزيا' },
  { code: 'MZ', name: 'Mozambique', nameAr: 'موزمبيق' },
  
  // N
  { code: 'NA', name: 'Namibia', nameAr: 'ناميبيا' },
  { code: 'NE', name: 'Niger', nameAr: 'النيجر' },
  { code: 'NG', name: 'Nigeria', nameAr: 'نيجيريا' },
  { code: 'NI', name: 'Nicaragua', nameAr: 'نيكاراغوا' },
  { code: 'NL', name: 'Netherlands', nameAr: 'هولندا' },
  { code: 'NO', name: 'Norway', nameAr: 'النرويج' },
  { code: 'NP', name: 'Nepal', nameAr: 'نيبال' },
  { code: 'NZ', name: 'New Zealand', nameAr: 'نيوزيلندا' },
  
  // O
  { code: 'OM', name: 'Oman', nameAr: 'عُمان' },
  
  // P
  { code: 'PA', name: 'Panama', nameAr: 'بنما' },
  { code: 'PE', name: 'Peru', nameAr: 'بيرو' },
  { code: 'PF', name: 'French Polynesia', nameAr: 'بولينيزيا الفرنسية' },
  { code: 'PG', name: 'Papua New Guinea', nameAr: 'بابوا غينيا الجديدة' },
  { code: 'PH', name: 'Philippines', nameAr: 'الفلبين' },
  { code: 'PK', name: 'Pakistan', nameAr: 'باكستان' },
  { code: 'PL', name: 'Poland', nameAr: 'بولندا' },
  { code: 'PR', name: 'Puerto Rico', nameAr: 'بورتوريكو' },
  { code: 'PT', name: 'Portugal', nameAr: 'البرتغال' },
  { code: 'PW', name: 'Palau', nameAr: 'بالاو' },
  { code: 'PY', name: 'Paraguay', nameAr: 'باراغواي' },
  
  // Q
  { code: 'QA', name: 'Qatar', nameAr: 'قطر' },
  
  // R
  { code: 'RO', name: 'Romania', nameAr: 'رومانيا' },
  { code: 'RS', name: 'Serbia', nameAr: 'صربيا' },
  { code: 'RU', name: 'Russia', nameAr: 'روسيا' },
  { code: 'RW', name: 'Rwanda', nameAr: 'رواندا' },
  
  // S
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية' },
  { code: 'SB', name: 'Solomon Islands', nameAr: 'جزر سليمان' },
  { code: 'SC', name: 'Seychelles', nameAr: 'سيشل' },
  { code: 'SD', name: 'Sudan', nameAr: 'السودان' },
  { code: 'SE', name: 'Sweden', nameAr: 'السويد' },
  { code: 'SG', name: 'Singapore', nameAr: 'سنغافورة' },
  { code: 'SH', name: 'Saint Helena', nameAr: 'سانت هيلانة' },
  { code: 'SI', name: 'Slovenia', nameAr: 'سلوفينيا' },
  { code: 'SK', name: 'Slovakia', nameAr: 'سلوفاكيا' },
  { code: 'SL', name: 'Sierra Leone', nameAr: 'سيراليون' },
  { code: 'SM', name: 'San Marino', nameAr: 'سان مارينو' },
  { code: 'SN', name: 'Senegal', nameAr: 'السنغال' },
  { code: 'SO', name: 'Somalia', nameAr: 'الصومال' },
  { code: 'SR', name: 'Suriname', nameAr: 'سورينام' },
  { code: 'ST', name: 'São Tomé and Príncipe', nameAr: 'ساو تومي وبرينسيبي' },
  { code: 'SV', name: 'El Salvador', nameAr: 'السلفادور' },
  { code: 'SY', name: 'Syria', nameAr: 'سوريا' },
  { code: 'SZ', name: 'Eswatini', nameAr: 'إسواتيني' },
  
  // T
  { code: 'TC', name: 'Turks and Caicos Islands', nameAr: 'جزر تركس وكايكوس' },
  { code: 'TD', name: 'Chad', nameAr: 'تشاد' },
  { code: 'TG', name: 'Togo', nameAr: 'توغو' },
  { code: 'TH', name: 'Thailand', nameAr: 'تايلاند' },
  { code: 'TJ', name: 'Tajikistan', nameAr: 'طاجيكستان' },
  { code: 'TL', name: 'Timor-Leste', nameAr: 'تيمور الشرقية' },
  { code: 'TM', name: 'Turkmenistan', nameAr: 'تركمانستان' },
  { code: 'TN', name: 'Tunisia', nameAr: 'تونس' },
  { code: 'TO', name: 'Tonga', nameAr: 'تونغا' },
  { code: 'TR', name: 'Turkey', nameAr: 'تركيا' },
  { code: 'TT', name: 'Trinidad and Tobago', nameAr: 'ترينيداد وتوباغو' },
  { code: 'TW', name: 'Taiwan', nameAr: 'تايوان' },
  { code: 'TZ', name: 'Tanzania', nameAr: 'تنزانيا' },
  
  // U
  { code: 'UA', name: 'Ukraine', nameAr: 'أوكرانيا' },
  { code: 'UG', name: 'Uganda', nameAr: 'أوغندا' },
  { code: 'US', name: 'United States', nameAr: 'الولايات المتحدة' },
  { code: 'UY', name: 'Uruguay', nameAr: 'أوروغواي' },
  { code: 'UZ', name: 'Uzbekistan', nameAr: 'أوزبكستان' },
  
  // V
  { code: 'VC', name: 'Saint Vincent and the Grenadines', nameAr: 'سانت فنسنت والغرينادين' },
  { code: 'VE', name: 'Venezuela', nameAr: 'فنزويلا' },
  { code: 'VG', name: 'British Virgin Islands', nameAr: 'جزر فيرجن البريطانية' },
  { code: 'VN', name: 'Vietnam', nameAr: 'فيتنام' },
  { code: 'VU', name: 'Vanuatu', nameAr: 'فانواتو' },
  
  // W
  { code: 'WS', name: 'Samoa', nameAr: 'ساموا' },
  // WW (Worldwide) removed - custom code, not in flag-icons
  
  // Y
  { code: 'YE', name: 'Yemen', nameAr: 'اليمن' },
  
  // Z
  { code: 'ZA', name: 'South Africa', nameAr: 'جنوب أفريقيا' },
  { code: 'ZM', name: 'Zambia', nameAr: 'زامبيا' },
  { code: 'ZW', name: 'Zimbabwe', nameAr: 'زيمبابوي' },
  
  // Note: Regional codes (CAF, CAS, CEU, COC, CSA) removed - custom codes not in flag-icons
];

// Search flags by name or code
export function searchFlags(query: string): FlagData[] {
  const lowerQuery = query.toLowerCase();
  return flags.filter(flag => 
    flag.code.toLowerCase().includes(lowerQuery) ||
    flag.name.toLowerCase().includes(lowerQuery) ||
    flag.nameAr.includes(query)
  );
}

// Get flag by code
export function getFlagByCode(code: string): FlagData | undefined {
  return flags.find(f => f.code.toLowerCase() === code.toLowerCase());
}

// Get all flag codes
export const allFlagCodes = flags.map(f => f.code);

