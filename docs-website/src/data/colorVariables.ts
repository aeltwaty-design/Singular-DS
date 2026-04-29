// Color Variables - Semantic Design Tokens
// These map primitive colors to semantic meanings with light/dark mode support

export interface ColorVariable {
  name: string;
  lightValue: string;      // e.g., "gray-900", "primary-600"
  darkValue: string;       // e.g., "gray-50", "gray-400"
  usage: string;           // Description of when to use
  usageAr: string;         // Arabic description
}

export interface ColorVariableCategory {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  variables: ColorVariable[];
}

// Text Color Variables
export const textColorVariables: ColorVariable[] = [
  {
    name: 'text-primary',
    lightValue: 'gray-900',
    darkValue: 'gray-50',
    usage: 'Primary text such as page headings.',
    usageAr: 'النص الأساسي مثل عناوين الصفحات.',
  },
  {
    name: 'text-primary_on-brand',
    lightValue: 'white',
    darkValue: 'gray-50',
    usage: 'Primary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).',
    usageAr: 'النص الأساسي عند استخدامه على خلفيات ألوان العلامة التجارية.',
  },
  {
    name: 'text-secondary',
    lightValue: 'gray-700',
    darkValue: 'gray-300',
    usage: 'Secondary text such as labels and section headings.',
    usageAr: 'النص الثانوي مثل التسميات وعناوين الأقسام.',
  },
  {
    name: 'text-secondary_hover',
    lightValue: 'gray-800',
    darkValue: 'gray-200',
    usage: 'Secondary text when in hover state.',
    usageAr: 'النص الثانوي في حالة التمرير.',
  },
  {
    name: 'text-secondary_on-brand',
    lightValue: 'primary-200',
    darkValue: 'gray-300',
    usage: 'Secondary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).',
    usageAr: 'النص الثانوي عند استخدامه على خلفيات ألوان العلامة التجارية.',
  },
  {
    name: 'text-tertiary',
    lightValue: 'gray-600',
    darkValue: 'gray-400',
    usage: 'Tertiary text such as supporting text and paragraph text.',
    usageAr: 'النص الثالثي مثل النص الداعم ونص الفقرات.',
  },
  {
    name: 'text-tertiary_hover',
    lightValue: 'gray-700',
    darkValue: 'gray-300',
    usage: 'Tertiary text when in hover state.',
    usageAr: 'النص الثالثي في حالة التمرير.',
  },
  {
    name: 'text-tertiary_on-brand',
    lightValue: 'primary-200',
    darkValue: 'gray-400',
    usage: 'Tertiary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. CTA sections).',
    usageAr: 'النص الثالثي عند استخدامه على خلفيات ألوان العلامة التجارية.',
  },
  {
    name: 'text-quaternary',
    lightValue: 'gray-500',
    darkValue: 'gray-400',
    usage: 'Quaternary text for more subtle and lower-contrast text, such as footer column headings.',
    usageAr: 'النص الرباعي للنصوص الأكثر دقة وأقل تباينًا.',
  },
  {
    name: 'text-quaternary_on-brand',
    lightValue: 'primary-300',
    darkValue: 'gray-400',
    usage: 'Quaternary text when used on solid brand color backgrounds. Commonly used for brand theme website sections (e.g. footers).',
    usageAr: 'النص الرباعي عند استخدامه على خلفيات ألوان العلامة التجارية.',
  },
  {
    name: 'text-white',
    lightValue: 'white',
    darkValue: 'white',
    usage: 'Text that is always white, regardless of the mode.',
    usageAr: 'النص الذي يكون دائمًا أبيض بغض النظر عن الوضع.',
  },
  {
    name: 'text-disabled',
    lightValue: 'gray-500',
    darkValue: 'gray-500',
    usage: 'Default color for disabled text such as disabled input fields or buttons. This can be changed to gray-400, but gray-500 is higher contrast and more accessible.',
    usageAr: 'اللون الافتراضي للنص المعطل مثل حقول الإدخال أو الأزرار المعطلة.',
  },
  {
    name: 'text-placeholder',
    lightValue: 'gray-500',
    darkValue: 'gray-400',
    usage: 'Default color for placeholder text such as input field placeholders. This can be changed to gray-400, but gray-500 is more accessible because it is higher contrast.',
    usageAr: 'اللون الافتراضي لنص العنصر النائب مثل العناصر النائبة في حقول الإدخال.',
  },
  {
    name: 'text-placeholder_subtle',
    lightValue: 'gray-300',
    darkValue: 'gray-700',
    usage: 'A more subtle (lower contrast) alternative placeholder text. Useful for components such as verification code input fields.',
    usageAr: 'نص عنصر نائب بديل أكثر دقة (تباين أقل).',
  },
  {
    name: 'text-primary-primary',
    lightValue: 'gray-900',
    darkValue: 'gray-50',
    usage: 'Primary brand text useful for headings (e.g. cards in pricing page headers).',
    usageAr: 'نص العلامة التجارية الأساسي مفيد للعناوين.',
  },
  {
    name: 'text-primary-secondary',
    lightValue: 'primary-700',
    darkValue: 'gray-300',
    usage: 'Secondary brand text for brand buttons, as well as accented text, highlights, and subheadings (e.g. subheadings in blog post cards).',
    usageAr: 'نص العلامة التجارية الثانوي لأزرار العلامة التجارية والنصوص المميزة.',
  },
  {
    name: 'text-primary-secondary_hover',
    lightValue: 'primary-800',
    darkValue: 'gray-300',
    usage: 'Secondary brand text when in hover state (e.g. brand buttons).',
    usageAr: 'نص العلامة التجارية الثانوي في حالة التمرير.',
  },
  {
    name: 'text-primary-tertiary',
    lightValue: 'primary-600',
    darkValue: 'gray-400',
    usage: 'Tertiary brand text for lighter accented text and highlights (e.g. numbers in metric cards).',
    usageAr: 'نص العلامة التجارية الثالثي للنصوص المميزة الأخف.',
  },
  {
    name: 'text-primary-tertiary_alt',
    lightValue: 'primary-600',
    darkValue: 'gray-50',
    usage: 'An alternative to tertiary brand text that is lighter in dark mode (e.g. numbers in metric cards).',
    usageAr: 'بديل لنص العلامة التجارية الثالثي يكون أفتح في الوضع الداكن.',
  },
  {
    name: 'text-error-primary',
    lightValue: 'error-600',
    darkValue: 'error-400',
    usage: 'Default error state semantic text color (e.g. input field error states).',
    usageAr: 'لون النص الدلالي لحالة الخطأ الافتراضية.',
  },
  {
    name: 'text-warning-primary',
    lightValue: 'warning-600',
    darkValue: 'warning-400',
    usage: 'Default warning state semantic text color.',
    usageAr: 'لون النص الدلالي لحالة التحذير الافتراضية.',
  },
  {
    name: 'text-success-primary',
    lightValue: 'success-600',
    darkValue: 'success-400',
    usage: 'Default success state semantic text color.',
    usageAr: 'لون النص الدلالي لحالة النجاح الافتراضية.',
  },
];

// Border Color Variables
export const borderColorVariables: ColorVariable[] = [
  {
    name: 'border-primary',
    lightValue: 'gray-300',
    darkValue: 'gray-700',
    usage: 'High contrast borders. These are used for components such as input fields, button groups, and checkboxes.',
    usageAr: 'حدود عالية التباين. تُستخدم للمكونات مثل حقول الإدخال ومجموعات الأزرار ومربعات الاختيار.',
  },
  {
    name: 'border-secondary',
    lightValue: 'gray-200',
    darkValue: 'gray-800',
    usage: 'Medium contrast borders. This is the most commonly used border color and is the default for most components (such as file uploaders), cards (such as tables), and content dividers.',
    usageAr: 'حدود متوسطة التباين. هذا هو لون الحدود الأكثر استخدامًا وهو الافتراضي لمعظم المكونات مثل رافعات الملفات والبطاقات وفواصل المحتوى.',
  },
  {
    name: 'border-secondary_alt',
    lightValue: '#00000014',
    darkValue: 'gray-800',
    usage: 'An alternative to secondary border that uses alpha transparency. This is used exclusively for floating menus such as input dropdowns and notifications to create sharper bottom border.',
    usageAr: 'بديل للحدود الثانوية يستخدم شفافية ألفا. يُستخدم حصريًا للقوائم العائمة مثل القوائم المنسدلة والإشعارات.',
  },
  {
    name: 'border-tertiary',
    lightValue: 'gray-100',
    darkValue: 'gray-800',
    usage: 'Low contrast borders useful for very subtle dividers and borders such as line and bar chart axis dividers.',
    usageAr: 'حدود منخفضة التباين مفيدة للفواصل الدقيقة جدًا مثل فواصل محاور المخططات.',
  },
  {
    name: 'border-disabled',
    lightValue: 'gray-300',
    darkValue: 'gray-700',
    usage: 'Default disabled border color for disabled states in components such as input fields and checkboxes.',
    usageAr: 'لون الحدود المعطل الافتراضي لحالات التعطيل في المكونات مثل حقول الإدخال ومربعات الاختيار.',
  },
  {
    name: 'border-disabled_subtle',
    lightValue: 'gray-200',
    darkValue: 'gray-800',
    usage: 'A more subtle (lower contrast) alternative for disabled borders such as disabled buttons.',
    usageAr: 'بديل أكثر دقة (تباين أقل) للحدود المعطلة مثل الأزرار المعطلة.',
  },
  {
    name: 'border-brand',
    lightValue: 'primary-500',
    darkValue: 'primary-400',
    usage: 'Default brand border color. Useful for active states in components such as input fields.',
    usageAr: 'لون حدود العلامة التجارية الافتراضي. مفيد للحالات النشطة في المكونات مثل حقول الإدخال.',
  },
  {
    name: 'border-brand_alt',
    lightValue: 'primary-600',
    darkValue: 'gray-700',
    usage: 'A brand border color that switches to gray when in dark mode. Useful for components such as brand-style variants of banners and footers.',
    usageAr: 'لون حدود العلامة التجارية الذي يتحول إلى رمادي في الوضع الداكن. مفيد للمكونات مثل اللافتات والتذييلات.',
  },
  {
    name: 'border-error',
    lightValue: 'error-500',
    darkValue: 'error-400',
    usage: 'Default error state semantic border color. Useful for error states in components such as input fields and file uploaders.',
    usageAr: 'لون الحدود الدلالي لحالة الخطأ الافتراضية. مفيد لحالات الخطأ في المكونات مثل حقول الإدخال.',
  },
  {
    name: 'border-error_subtle',
    lightValue: 'error-300',
    darkValue: 'error-500',
    usage: 'A more subtle (lower contrast) alternative for error state semantic borders such as error state input fields.',
    usageAr: 'بديل أكثر دقة (تباين أقل) للحدود الدلالية لحالة الخطأ.',
  },
];

// Foreground Color Variables
export const foregroundColorVariables: ColorVariable[] = [
  {
    name: 'fg-primary',
    lightValue: 'gray-900',
    darkValue: 'white',
    usage: 'Highest contrast non-text foreground elements such as icons.',
    usageAr: 'عناصر المقدمة غير النصية ذات التباين الأعلى مثل الأيقونات.',
  },
  {
    name: 'fg-secondary',
    lightValue: 'gray-700',
    darkValue: 'gray-300',
    usage: 'High contrast non-text foreground elements such as icons.',
    usageAr: 'عناصر المقدمة غير النصية عالية التباين مثل الأيقونات.',
  },
  {
    name: 'fg-secondary_hover',
    lightValue: 'gray-800',
    darkValue: 'gray-200',
    usage: 'Secondary foreground elements when in hover state.',
    usageAr: 'عناصر المقدمة الثانوية في حالة التمرير.',
  },
  {
    name: 'fg-tertiary',
    lightValue: 'gray-600',
    darkValue: 'gray-400',
    usage: 'Medium contrast non-text foreground elements such as icons.',
    usageAr: 'عناصر المقدمة غير النصية متوسطة التباين مثل الأيقونات.',
  },
  {
    name: 'fg-tertiary_hover',
    lightValue: 'gray-700',
    darkValue: 'gray-300',
    usage: 'Tertiary foreground elements when in hover state.',
    usageAr: 'عناصر المقدمة الثالثية في حالة التمرير.',
  },
  {
    name: 'fg-quaternary',
    lightValue: 'gray-400',
    darkValue: 'gray-600',
    usage: 'Low contrast non-text foreground elements such as icons in buttons, help icons and icons used in input fields.',
    usageAr: 'عناصر المقدمة غير النصية منخفضة التباين مثل الأيقونات في الأزرار وأيقونات المساعدة.',
  },
  {
    name: 'fg-quaternary_hover',
    lightValue: 'gray-500',
    darkValue: 'gray-500',
    usage: 'Quaternary foreground elements when in hover state, such as help icons.',
    usageAr: 'عناصر المقدمة الرباعية في حالة التمرير مثل أيقونات المساعدة.',
  },
  {
    name: 'fg-white',
    lightValue: 'white',
    darkValue: 'white',
    usage: 'Foreground elements that are always white, regardless of the mode.',
    usageAr: 'عناصر المقدمة التي تكون دائمًا بيضاء بغض النظر عن الوضع.',
  },
  {
    name: 'fg-disabled',
    lightValue: 'gray-400',
    darkValue: 'gray-500',
    usage: 'Default color for disabled non-text foreground elements such as icons in disabled button group buttons and input dropdown menu items.',
    usageAr: 'اللون الافتراضي لعناصر المقدمة غير النصية المعطلة مثل الأيقونات في الأزرار المعطلة.',
  },
  {
    name: 'fg-disabled_subtle',
    lightValue: 'gray-300',
    darkValue: 'gray-600',
    usage: 'A more subtle (lower contrast) alternative for non-text disabled foreground elements such as disabled active checkboxes and tag checkboxes.',
    usageAr: 'بديل أكثر دقة (تباين أقل) لعناصر المقدمة المعطلة غير النصية.',
  },
  {
    name: 'fg-brand-primary',
    lightValue: 'primary-600',
    darkValue: 'primary-500',
    usage: 'Primary brand color non-text foreground elements such as featured icons and progress bars.',
    usageAr: 'عناصر المقدمة غير النصية بلون العلامة التجارية الأساسي مثل الأيقونات المميزة وأشرطة التقدم.',
  },
  {
    name: 'fg-brand-primary_alt',
    lightValue: 'primary-600',
    darkValue: 'gray-300',
    usage: 'An alternative for primary brand color non-text foreground elements that switches to gray when in dark mode such as active horizontal tabs.',
    usageAr: 'بديل لعناصر المقدمة بلون العلامة التجارية الأساسي يتحول إلى رمادي في الوضع الداكن.',
  },
  {
    name: 'fg-brand-secondary',
    lightValue: 'primary-500',
    darkValue: 'primary-500',
    usage: 'Secondary brand color non-text foreground elements such as accents and arrows in marketing site sections (e.g. hero header sections).',
    usageAr: 'عناصر المقدمة غير النصية بلون العلامة التجارية الثانوي مثل اللهجات والأسهم في أقسام الموقع.',
  },
  {
    name: 'fg-brand-secondary_alt',
    lightValue: 'primary-500',
    darkValue: 'gray-600',
    usage: 'An alternative for secondary brand color non-text foreground elements that switches to gray when in dark mode such as brand buttons.',
    usageAr: 'بديل لعناصر المقدمة بلون العلامة التجارية الثانوي يتحول إلى رمادي في الوضع الداكن.',
  },
  {
    name: 'fg-error-primary',
    lightValue: 'error-600',
    darkValue: 'error-500',
    usage: 'Primary error state color for non-text foreground elements such as featured icons.',
    usageAr: 'لون حالة الخطأ الأساسي لعناصر المقدمة غير النصية مثل الأيقونات المميزة.',
  },
  {
    name: 'fg-error-secondary',
    lightValue: 'error-500',
    darkValue: 'error-400',
    usage: 'Secondary error state color for non-text foreground elements such as icons in error state input fields and negative metrics item charts and icons.',
    usageAr: 'لون حالة الخطأ الثانوي لعناصر المقدمة غير النصية مثل الأيقونات في حقول الإدخال.',
  },
  {
    name: 'fg-warning-primary',
    lightValue: 'warning-600',
    darkValue: 'warning-500',
    usage: 'Primary warning state color for non-text foreground elements such as featured icons.',
    usageAr: 'لون حالة التحذير الأساسي لعناصر المقدمة غير النصية مثل الأيقونات المميزة.',
  },
  {
    name: 'fg-warning-secondary',
    lightValue: 'warning-500',
    darkValue: 'warning-400',
    usage: 'Secondary warning state color for non-text foreground elements.',
    usageAr: 'لون حالة التحذير الثانوي لعناصر المقدمة غير النصية.',
  },
  {
    name: 'fg-success-primary',
    lightValue: 'success-600',
    darkValue: 'success-500',
    usage: 'Primary success state color for non-text foreground elements such as featured icons.',
    usageAr: 'لون حالة النجاح الأساسي لعناصر المقدمة غير النصية مثل الأيقونات المميزة.',
  },
  {
    name: 'fg-success-secondary',
    lightValue: 'success-500',
    darkValue: 'success-400',
    usage: 'Secondary success state color for non-text foreground elements such as button dots, avatar online indicator dots, and negative metrics item charts and icons.',
    usageAr: 'لون حالة النجاح الثانوي لعناصر المقدمة غير النصية مثل نقاط الأزرار ومؤشرات الحضور.',
  },
];

// Background Color Variables
export const backgroundColorVariables: ColorVariable[] = [
  {
    name: 'bg-primary',
    lightValue: 'white',
    darkValue: 'gray-950',
    usage: 'The primary background color (white) used across all layouts and components.',
    usageAr: 'لون الخلفية الأساسي (أبيض) المستخدم في جميع التخطيطات والمكونات.',
  },
  {
    name: 'bg-primary_alt',
    lightValue: 'white',
    darkValue: 'gray-900',
    usage: 'An alternative primary background color (white) that switches to bg-secondary when in dark mode.',
    usageAr: 'لون خلفية أساسي بديل (أبيض) يتحول إلى bg-secondary في الوضع الداكن.',
  },
  {
    name: 'bg-primary_hover',
    lightValue: 'gray-50',
    darkValue: 'gray-800',
    usage: 'Primary background hover color. This acts as the default hover state background color for components with white backgrounds (e.g. input dropdown menu items).',
    usageAr: 'لون خلفية التمرير الأساسي. يعمل كلون خلفية حالة التمرير الافتراضي للمكونات ذات الخلفيات البيضاء.',
  },
  {
    name: 'bg-primary_solid',
    lightValue: 'gray-950',
    darkValue: 'gray-900',
    usage: 'The primary dark background color used across layouts and components. This switches to bg-secondary when in dark mode and is useful for components such as footers and text editor toolbars.',
    usageAr: 'لون الخلفية الداكنة الأساسي المستخدم في التخطيطات والمكونات. مفيد للتذييلات وأشرطة أدوات محرر النصوص.',
  },
  {
    name: 'bg-secondary',
    lightValue: 'gray-50',
    darkValue: 'gray-900',
    usage: 'The secondary background color used to create contrast against white backgrounds, such as website section backgrounds.',
    usageAr: 'لون الخلفية الثانوي المستخدم لإنشاء تباين ضد الخلفيات البيضاء مثل خلفيات أقسام الموقع.',
  },
  {
    name: 'bg-secondary_alt',
    lightValue: 'gray-50',
    darkValue: 'gray-950',
    usage: 'An alternative secondary background color that switches to bg-primary when in dark mode. Useful for components such as border-style horizontal tabs.',
    usageAr: 'لون خلفية ثانوي بديل يتحول إلى bg-primary في الوضع الداكن.',
  },
  {
    name: 'bg-secondary_hover',
    lightValue: 'gray-100',
    darkValue: 'gray-800',
    usage: 'Secondary background hover color. Useful for hover states for components with gray-50 backgrounds such as active clothes (e.g. navigation items and date pickers).',
    usageAr: 'لون خلفية التمرير الثانوي. مفيد لحالات التمرير للمكونات ذات الخلفيات الرمادية.',
  },
  {
    name: 'bg-secondary_subtle',
    lightValue: 'gray-25',
    darkValue: 'gray-800',
    usage: 'An alternative secondary background color that is slightly lighter and more subtle in light mode. This is useful for components such as banners.',
    usageAr: 'لون خلفية ثانوي بديل أفتح قليلاً وأكثر دقة في الوضع الفاتح. مفيد للافتات.',
  },
  {
    name: 'bg-secondary_solid',
    lightValue: 'gray-600',
    darkValue: 'gray-600',
    usage: 'The secondary dark background color used across layouts and components. This is useful for components such as featured icons.',
    usageAr: 'لون الخلفية الداكنة الثانوي المستخدم في التخطيطات والمكونات. مفيد للأيقونات المميزة.',
  },
  {
    name: 'bg-tertiary',
    lightValue: 'gray-100',
    darkValue: 'gray-800',
    usage: 'The tertiary background color used to create contrast against light backgrounds such as toggles.',
    usageAr: 'لون الخلفية الثالثي المستخدم لإنشاء تباين ضد الخلفيات الفاتحة مثل أزرار التبديل.',
  },
  {
    name: 'bg-quaternary',
    lightValue: 'gray-200',
    darkValue: 'gray-700',
    usage: 'The quaternary background color used to create contrast against light backgrounds, such as sliders and progress bars.',
    usageAr: 'لون الخلفية الرباعي المستخدم لإنشاء تباين ضد الخلفيات الفاتحة مثل أشرطة التمرير وأشرطة التقدم.',
  },
  {
    name: 'bg-active',
    lightValue: 'gray-50',
    darkValue: 'gray-800',
    usage: 'Default active background color for components such as selected menu items in input dropdowns.',
    usageAr: 'لون الخلفية النشطة الافتراضي للمكونات مثل عناصر القائمة المحددة في القوائم المنسدلة.',
  },
  {
    name: 'bg-disabled',
    lightValue: 'gray-100',
    darkValue: 'gray-800',
    usage: 'Default disabled background color for components such as disabled primary buttons and toggles.',
    usageAr: 'لون الخلفية المعطلة الافتراضي للمكونات مثل الأزرار الأساسية المعطلة وأزرار التبديل.',
  },
  {
    name: 'bg-disabled_subtle',
    lightValue: 'gray-50',
    darkValue: 'gray-800',
    usage: 'An alternative disabled background color that is more subtle. This is useful for components such as disabled input fields and checkboxes.',
    usageAr: 'لون خلفية معطلة بديل أكثر دقة. مفيد للمكونات مثل حقول الإدخال المعطلة ومربعات الاختيار.',
  },
  {
    name: 'bg-overlay',
    lightValue: 'gray-950',
    darkValue: 'gray-800',
    usage: 'Default background color for background overlays. These are useful for overlay components such as modals.',
    usageAr: 'لون الخلفية الافتراضي للطبقات العلوية. مفيد لمكونات الطبقات مثل النوافذ المنبثقة.',
  },
  {
    name: 'bg-brand-primary',
    lightValue: 'primary-50',
    darkValue: 'primary-500',
    usage: 'The primary brand background color. Useful for components such as check icons.',
    usageAr: 'لون خلفية العلامة التجارية الأساسي. مفيد للمكونات مثل أيقونات الاختيار.',
  },
  {
    name: 'bg-brand-primary_alt',
    lightValue: 'primary-50',
    darkValue: 'gray-800',
    usage: 'An alternative primary brand background color that switches to bg-secondary when in dark mode such as active horizontal tabs.',
    usageAr: 'لون خلفية العلامة التجارية الأساسي البديل الذي يتحول إلى bg-secondary في الوضع الداكن.',
  },
  {
    name: 'bg-brand-secondary',
    lightValue: 'primary-100',
    darkValue: 'primary-600',
    usage: 'The secondary brand background color. Useful for components such as featured icons.',
    usageAr: 'لون خلفية العلامة التجارية الثانوي. مفيد للمكونات مثل الأيقونات المميزة.',
  },
  {
    name: 'bg-brand-solid',
    lightValue: 'primary-500',
    darkValue: 'primary-600',
    usage: 'Default solid (dark) brand background solid color. Useful for components such as toggles and progress bars.',
    usageAr: 'لون خلفية العلامة التجارية الصلبة الافتراضي. مفيد للمكونات مثل أزرار التبديل وأشرطة التقدم.',
  },
  {
    name: 'bg-brand-solid_hover',
    lightValue: 'primary-700',
    darkValue: 'primary-500',
    usage: 'Solid brand background color when in hover state. Useful for components such as droplets.',
    usageAr: 'لون خلفية العلامة التجارية الصلبة في حالة التمرير.',
  },
  {
    name: 'bg-brand-section',
    lightValue: 'primary-800',
    darkValue: 'gray-800',
    usage: 'This is the default dark brand color background used for website sections such as CTA sections and testimonial sections. Switches to bg-secondary when in dark mode.',
    usageAr: 'لون خلفية العلامة التجارية الداكنة الافتراضي المستخدم لأقسام الموقع مثل أقسام CTA والشهادات.',
  },
  {
    name: 'bg-brand-section_subtle',
    lightValue: 'primary-700',
    darkValue: 'gray-950',
    usage: 'An alternative brand section background color to provide contrast for website sections such as FAQ sections. Switches to bg-primary when in dark mode.',
    usageAr: 'لون خلفية قسم العلامة التجارية البديل لتوفير تباين لأقسام الموقع مثل أقسام الأسئلة الشائعة.',
  },
  {
    name: 'bg-error-primary',
    lightValue: 'error-50',
    darkValue: 'error-950',
    usage: 'Primary error state background color for components such as buttons.',
    usageAr: 'لون خلفية حالة الخطأ الأساسي للمكونات مثل الأزرار.',
  },
  {
    name: 'bg-error-secondary',
    lightValue: 'error-100',
    darkValue: 'error-800',
    usage: 'Secondary error state background color for components such as featured icons.',
    usageAr: 'لون خلفية حالة الخطأ الثانوي للمكونات مثل الأيقونات المميزة.',
  },
  {
    name: 'bg-error-solid',
    lightValue: 'error-600',
    darkValue: 'error-600',
    usage: 'Default solid (dark) error state background color for components such as buttons, featured icons and metric items.',
    usageAr: 'لون خلفية حالة الخطأ الصلبة الافتراضي للمكونات مثل الأزرار والأيقونات المميزة.',
  },
  {
    name: 'bg-error-solid_hover',
    lightValue: 'error-700',
    darkValue: 'error-500',
    usage: 'Default solid (dark) error hover state background color for components such as buttons.',
    usageAr: 'لون خلفية حالة التمرير للخطأ الصلب الافتراضي للمكونات مثل الأزرار.',
  },
  {
    name: 'bg-warning-primary',
    lightValue: 'warning-50',
    darkValue: 'warning-950',
    usage: 'Primary warning state background color for components.',
    usageAr: 'لون خلفية حالة التحذير الأساسي للمكونات.',
  },
  {
    name: 'bg-warning-secondary',
    lightValue: 'warning-100',
    darkValue: 'warning-800',
    usage: 'Secondary warning state background color for components such as featured icons.',
    usageAr: 'لون خلفية حالة التحذير الثانوي للمكونات مثل الأيقونات المميزة.',
  },
  {
    name: 'bg-warning-solid',
    lightValue: 'warning-600',
    darkValue: 'warning-600',
    usage: 'Default solid (dark) warning state background color for components such as featured icons.',
    usageAr: 'لون خلفية حالة التحذير الصلبة الافتراضي للمكونات مثل الأيقونات المميزة.',
  },
  {
    name: 'bg-success-primary',
    lightValue: 'success-50',
    darkValue: 'success-950',
    usage: 'Primary success state background color for components.',
    usageAr: 'لون خلفية حالة النجاح الأساسي للمكونات.',
  },
  {
    name: 'bg-success-secondary',
    lightValue: 'success-100',
    darkValue: 'success-600',
    usage: 'Secondary success state background color for components such as featured icons.',
    usageAr: 'لون خلفية حالة النجاح الثانوي للمكونات مثل الأيقونات المميزة.',
  },
  {
    name: 'bg-success-solid',
    lightValue: 'success-600',
    darkValue: 'success-600',
    usage: 'Default solid (dark) success state background color for components such as featured icons and metric items.',
    usageAr: 'لون خلفية حالة النجاح الصلبة الافتراضي للمكونات مثل الأيقونات المميزة وعناصر القياس.',
  },
];

// Alpha Color Variables
export const alphaColorVariables: ColorVariable[] = [
  {
    name: 'alpha-white-10',
    lightValue: '#FFFFFF1A',
    darkValue: '#0A0D121A',
    usage: 'White at 10% opacity for light mode, gray-950 at 10% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 10% شفافية للوضع الفاتح، رمادي-950 بنسبة 10% للوضع الداكن.',
  },
  {
    name: 'alpha-white-20',
    lightValue: '#FFFFFF33',
    darkValue: '#0A0D1233',
    usage: 'White at 20% opacity for light mode, gray-950 at 20% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 20% شفافية للوضع الفاتح، رمادي-950 بنسبة 20% للوضع الداكن.',
  },
  {
    name: 'alpha-white-30',
    lightValue: '#FFFFFF4D',
    darkValue: '#0A0D124D',
    usage: 'White at 30% opacity for light mode, gray-950 at 30% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 30% شفافية للوضع الفاتح، رمادي-950 بنسبة 30% للوضع الداكن.',
  },
  {
    name: 'alpha-white-40',
    lightValue: '#FFFFFF66',
    darkValue: '#0A0D1266',
    usage: 'White at 40% opacity for light mode, gray-950 at 40% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 40% شفافية للوضع الفاتح، رمادي-950 بنسبة 40% للوضع الداكن.',
  },
  {
    name: 'alpha-white-50',
    lightValue: '#FFFFFF80',
    darkValue: '#0A0D1280',
    usage: 'White at 50% opacity for light mode, gray-950 at 50% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 50% شفافية للوضع الفاتح، رمادي-950 بنسبة 50% للوضع الداكن.',
  },
  {
    name: 'alpha-white-60',
    lightValue: '#FFFFFF99',
    darkValue: '#0A0D1299',
    usage: 'White at 60% opacity for light mode, gray-950 at 60% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 60% شفافية للوضع الفاتح، رمادي-950 بنسبة 60% للوضع الداكن.',
  },
  {
    name: 'alpha-white-70',
    lightValue: '#FFFFFFB3',
    darkValue: '#0A0D12B3',
    usage: 'White at 70% opacity for light mode, gray-950 at 70% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 70% شفافية للوضع الفاتح، رمادي-950 بنسبة 70% للوضع الداكن.',
  },
  {
    name: 'alpha-white-80',
    lightValue: '#FFFFFFCC',
    darkValue: '#0A0D12CC',
    usage: 'White at 80% opacity for light mode, gray-950 at 80% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 80% شفافية للوضع الفاتح، رمادي-950 بنسبة 80% للوضع الداكن.',
  },
  {
    name: 'alpha-white-90',
    lightValue: '#FFFFFFE6',
    darkValue: '#0A0D12E6',
    usage: 'White at 90% opacity for light mode, gray-950 at 90% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 90% شفافية للوضع الفاتح، رمادي-950 بنسبة 90% للوضع الداكن.',
  },
  {
    name: 'alpha-white-100',
    lightValue: '#FFFFFFFF',
    darkValue: '#0A0D12FF',
    usage: 'White at 100% opacity for light mode, gray-950 at 100% opacity for dark mode.',
    usageAr: 'أبيض بنسبة 100% شفافية للوضع الفاتح، رمادي-950 بنسبة 100% للوضع الداكن.',
  },
  {
    name: 'alpha-black-10',
    lightValue: '#0000001A',
    darkValue: '#FFFFFF1A',
    usage: 'Black at 10% opacity for light mode, white at 10% opacity for dark mode.',
    usageAr: 'أسود بنسبة 10% شفافية للوضع الفاتح، أبيض بنسبة 10% للوضع الداكن.',
  },
  {
    name: 'alpha-black-20',
    lightValue: '#00000033',
    darkValue: '#FFFFFF33',
    usage: 'Black at 20% opacity for light mode, white at 20% opacity for dark mode.',
    usageAr: 'أسود بنسبة 20% شفافية للوضع الفاتح، أبيض بنسبة 20% للوضع الداكن.',
  },
  {
    name: 'alpha-black-30',
    lightValue: '#0000004D',
    darkValue: '#FFFFFF4D',
    usage: 'Black at 30% opacity for light mode, white at 30% opacity for dark mode.',
    usageAr: 'أسود بنسبة 30% شفافية للوضع الفاتح، أبيض بنسبة 30% للوضع الداكن.',
  },
  {
    name: 'alpha-black-40',
    lightValue: '#00000066',
    darkValue: '#FFFFFF66',
    usage: 'Black at 40% opacity for light mode, white at 40% opacity for dark mode.',
    usageAr: 'أسود بنسبة 40% شفافية للوضع الفاتح، أبيض بنسبة 40% للوضع الداكن.',
  },
  {
    name: 'alpha-black-50',
    lightValue: '#00000080',
    darkValue: '#FFFFFF80',
    usage: 'Black at 50% opacity for light mode, white at 50% opacity for dark mode.',
    usageAr: 'أسود بنسبة 50% شفافية للوضع الفاتح، أبيض بنسبة 50% للوضع الداكن.',
  },
  {
    name: 'alpha-black-60',
    lightValue: '#00000099',
    darkValue: '#FFFFFF99',
    usage: 'Black at 60% opacity for light mode, white at 60% opacity for dark mode.',
    usageAr: 'أسود بنسبة 60% شفافية للوضع الفاتح، أبيض بنسبة 60% للوضع الداكن.',
  },
  {
    name: 'alpha-black-70',
    lightValue: '#000000B3',
    darkValue: '#FFFFFFB3',
    usage: 'Black at 70% opacity for light mode, white at 70% opacity for dark mode.',
    usageAr: 'أسود بنسبة 70% شفافية للوضع الفاتح، أبيض بنسبة 70% للوضع الداكن.',
  },
  {
    name: 'alpha-black-80',
    lightValue: '#000000CC',
    darkValue: '#FFFFFFCC',
    usage: 'Black at 80% opacity for light mode, white at 80% opacity for dark mode.',
    usageAr: 'أسود بنسبة 80% شفافية للوضع الفاتح، أبيض بنسبة 80% للوضع الداكن.',
  },
  {
    name: 'alpha-black-90',
    lightValue: '#000000E6',
    darkValue: '#FFFFFFE6',
    usage: 'Black at 90% opacity for light mode, white at 90% opacity for dark mode.',
    usageAr: 'أسود بنسبة 90% شفافية للوضع الفاتح، أبيض بنسبة 90% للوضع الداكن.',
  },
  {
    name: 'alpha-black-100',
    lightValue: '#000000FF',
    darkValue: '#FFFFFFFF',
    usage: 'Black at 100% opacity for light mode, white at 100% opacity for dark mode.',
    usageAr: 'أسود بنسبة 100% شفافية للوضع الفاتح، أبيض بنسبة 100% للوضع الداكن.',
  },
];

// All color variable categories
export const colorVariableCategories: ColorVariableCategory[] = [
  {
    id: 'text',
    name: 'Text color',
    nameAr: 'لون النص',
    description: 'Use text color variables to manage all text fill colors in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr: 'استخدم متغيرات لون النص لإدارة جميع ألوان تعبئة النص في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    variables: textColorVariables,
  },
  {
    id: 'border',
    name: 'Border color',
    nameAr: 'لون الحدود',
    description: 'Use border color variables to manage all stroke colors in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr: 'استخدم متغيرات لون الحدود لإدارة جميع ألوان الحدود في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    variables: borderColorVariables,
  },
  {
    id: 'foreground',
    name: 'Foreground color',
    nameAr: 'لون المقدمة',
    description: 'Use foreground color variables to manage all non-text foreground elements in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr: 'استخدم متغيرات لون المقدمة لإدارة جميع عناصر المقدمة غير النصية في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    variables: foregroundColorVariables,
  },
  {
    id: 'background',
    name: 'Background color',
    nameAr: 'لون الخلفية',
    description: 'Use background color variables to manage all fill colors for elements in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr: 'استخدم متغيرات لون الخلفية لإدارة جميع ألوان التعبئة للعناصر في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    variables: backgroundColorVariables,
  },
  {
    id: 'alpha',
    name: 'Alpha colors',
    nameAr: 'ألوان الشفافية',
    description: 'Use alpha color variables to manage all white and black opacity fill colors in your designs across light and dark modes. For more detail on how these variables are structured and how to use them, please refer to our Introduction to variables.',
    descriptionAr: 'استخدم متغيرات ألوان الشفافية لإدارة جميع ألوان التعبئة بالأبيض والأسود مع الشفافية في تصميماتك عبر الأوضاع الفاتحة والداكنة.',
    variables: alphaColorVariables,
  },
];

// Helper function to get the actual hex color from a color reference
export function getColorHex(
  colorRef: string,
  brandPrimary: Record<string, string>,
  brandSecondary: Record<string, string>,
  grayLight: Record<string, string>,
  grayDark: Record<string, string>,
  statusColors: {
    error: Record<string, string>;
    warning: Record<string, string>;
    success: Record<string, string>;
    info: Record<string, string>;
  },
  isDarkMode: boolean = false
): string {
  // Handle special cases
  if (colorRef === 'white') return '#FFFFFF';
  if (colorRef === 'black') return '#000000';
  if (colorRef === 'transparent') return 'transparent';
  
  // Handle direct hex values (e.g., "#00000014" for alpha colors)
  if (colorRef.startsWith('#')) return colorRef;

  // Parse the color reference (e.g., "gray-900", "primary-600", "error-400")
  const parts = colorRef.split('-');
  if (parts.length < 2) return '#000000';

  const colorType = parts[0];
  const shade = parts[1];

  switch (colorType) {
    case 'gray':
      return isDarkMode ? (grayDark[shade] || '#000000') : (grayLight[shade] || '#000000');
    case 'primary':
      return brandPrimary[shade] || '#000000';
    case 'secondary':
      return brandSecondary[shade] || '#000000';
    case 'error':
      return statusColors.error[shade] || '#000000';
    case 'warning':
      return statusColors.warning[shade] || '#000000';
    case 'success':
      return statusColors.success[shade] || '#000000';
    case 'info':
      return statusColors.info[shade] || '#000000';
    default:
      return '#000000';
  }
}

