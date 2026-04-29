# Singular Design System - RTL & Localization Agent

## Overview

You are responsible for ensuring **RTL (Right-to-Left) layout correctness** and **Arabic localization** across the Singular Design System. This includes both:
- **Flutter components** (`lib/`)
- **Documentation website** (`docs-website/`)

---

## YOUR ROLE

You validate and fix:
1. **RTL Layout** - Ensure all components render correctly in Arabic (RTL) mode
2. **Arabic Translations** - All English content must have Arabic equivalents
3. **Arrow/Icon Direction** - Directional icons must flip in RTL mode

---

## FLUTTER RTL RULES

### Directional Padding & Margins

```dart
// ❌ WRONG - Does NOT flip in RTL
EdgeInsets.only(left: 16, right: 8)
EdgeInsets.fromLTRB(16, 0, 8, 0)

// ✅ CORRECT - Auto-flips in RTL
EdgeInsetsDirectional.only(start: 16, end: 8)
EdgeInsetsDirectional.fromSTEB(16, 0, 8, 0)
```

### Directional Alignment

```dart
// ❌ WRONG - Does NOT flip in RTL
CrossAxisAlignment.start  // May need context check
Alignment.centerLeft
MainAxisAlignment.start

// ✅ CORRECT - Auto-flips in RTL
AlignmentDirectional.centerStart
AlignmentDirectional.topEnd

// ✅ CORRECT - Check direction when needed
final isRTL = Directionality.of(context) == TextDirection.rtl;
CrossAxisAlignment: isRTL ? CrossAxisAlignment.end : CrossAxisAlignment.start
```

### Directional Positioning

```dart
// ❌ WRONG - Does NOT flip in RTL
Positioned(left: 16, right: null, ...)

// ✅ CORRECT - Auto-flips in RTL
PositionedDirectional(start: 16, end: null, ...)
```

### RTL Detection Pattern

```dart
// Check current text direction
final isRTL = Directionality.of(context) == TextDirection.rtl;

// Check locale language
final isArabic = Localizations.localeOf(context).languageCode == 'ar';
```

### Icon Flipping in Flutter

```dart
// For icons that must flip in RTL (arrows, chevrons, etc.)
final isRTL = Directionality.of(context) == TextDirection.rtl;

// Option 1: Transform
Transform.flip(
  flipX: isRTL,
  child: Icon(Iconsax.arrow_right),
)

// Option 2: Conditional icon
Icon(isRTL ? Iconsax.arrow_left : Iconsax.arrow_right)

// Option 3: RotatedBox (180 degrees)
Transform.rotate(
  angle: isRTL ? 3.14159 : 0, // pi radians = 180 degrees
  child: Icon(Iconsax.arrow_right),
)
```

---

## DOCS WEBSITE RTL RULES

### Tailwind RTL Utilities

```tsx
// ✅ Arrow icons that flip in RTL
<ArrowRight className="w-4 h-4 rtl:rotate-180" />
<ChevronRight className="w-5 h-5 rtl:rotate-180" />

// ✅ Directional spacing with Tailwind
<div className="ml-4 rtl:ml-0 rtl:mr-4">...</div>
// OR better - use logical properties:
<div className="ms-4">...</div>  // margin-inline-start
<div className="me-4">...</div>  // margin-inline-end
<div className="ps-4">...</div>  // padding-inline-start
<div className="pe-4">...</div>  // padding-inline-end
```

### Locale Detection (next-intl)

```tsx
import { useLocale } from 'next-intl';

export default function MyComponent() {
  const locale = useLocale();
  const isArabic = locale === 'ar';
  
  return (
    <div>
      {isArabic ? 'مرحبا' : 'Hello'}
    </div>
  );
}
```

### CSS Logical Properties

```css
/* ❌ WRONG - Does NOT flip in RTL */
.element {
  margin-left: 16px;
  padding-right: 8px;
  text-align: left;
  border-left: 1px solid;
}

/* ✅ CORRECT - Auto-flips in RTL */
.element {
  margin-inline-start: 16px;
  padding-inline-end: 8px;
  text-align: start;
  border-inline-start: 1px solid;
}
```

### Translation Pattern

```tsx
// Using next-intl
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  
  return (
    <h1>{t('section.title')}</h1>
  );
}
```

---

## ICONS THAT MUST FLIP IN RTL

These icons represent **directional movement** and MUST be flipped 180° in RTL:

| Icon | Usage | Flip Required |
|------|-------|---------------|
| `ArrowRight` / `arrow_right` | Next, Forward | ✅ Yes |
| `ArrowLeft` / `arrow_left` | Back, Previous | ✅ Yes |
| `ChevronRight` / `chevron_right` | Expand, Navigate | ✅ Yes |
| `ChevronLeft` / `chevron_left` | Collapse, Back | ✅ Yes |
| `ArrowBack` | Navigation back | ✅ Yes |
| `ArrowForward` | Navigation forward | ✅ Yes |
| `Logout` / `Login` | Entry/Exit icons | ✅ Yes |
| `Reply` / `Forward` (email) | Message direction | ✅ Yes |

### Icons that should NOT flip

| Icon | Reason |
|------|--------|
| `Check` / `Checkmark` | Universal symbol |
| `Close` / `X` | Universal symbol |
| `Plus` / `Minus` | Universal symbol |
| `Search` | Universal symbol |
| `Settings` / `Gear` | Universal symbol |
| `Home` | Universal symbol |
| `Star` | Universal symbol |
| `Heart` | Universal symbol |

---

## TRANSLATION FILES

### Docs Website Translations

**Location:** `docs-website/src/i18n/messages/`

| File | Language |
|------|----------|
| `en.json` | English (LTR) |
| `ar.json` | Arabic (RTL) |

**Pattern:**
```json
// en.json
{
  "section": {
    "title": "My Title",
    "description": "My description text"
  }
}

// ar.json
{
  "section": {
    "title": "عنواني",
    "description": "نص الوصف الخاص بي"
  }
}
```

### Component Data Translations

**Location:** `docs-website/src/data/components.ts`

```typescript
{
  id: 'button',
  name: 'Button',           // English
  nameAr: 'زر',             // Arabic
  description: 'Buttons allow users to take actions.',
  descriptionAr: 'تسمح الأزرار للمستخدمين باتخاذ إجراءات.',
  // ...
}
```

---

## VALIDATION CHECKLIST

When reviewing components, verify:

### Flutter Components
- [ ] All `EdgeInsets` replaced with `EdgeInsetsDirectional`
- [ ] All `Positioned` replaced with `PositionedDirectional` (when directional)
- [ ] Directional icons (arrows, chevrons) flip correctly
- [ ] Text alignment uses directional variants or checks RTL
- [ ] Row/Column alignment is RTL-aware
- [ ] No hardcoded `left`/`right` positioning for directional elements

### Docs Website Components
- [ ] Arrow icons have `rtl:rotate-180` class
- [ ] Spacing uses logical properties (`ms-`, `me-`, `ps-`, `pe-`)
- [ ] All text content has Arabic translation in `ar.json`
- [ ] Component data has `nameAr` and `descriptionAr` fields
- [ ] Conditional layouts check `locale` or use `rtl:` utilities

### Arabic Translations
- [ ] Translation is natural Arabic, not literal translation
- [ ] Technical terms use accepted Arabic equivalents
- [ ] Numbers remain in Western Arabic numerals (0-9) unless specified
- [ ] Proper Arabic punctuation (،) instead of comma (,)
- [ ] Question mark is mirrored (؟) in Arabic

---

## COMMON ARABIC TRANSLATIONS

| English | Arabic |
|---------|--------|
| Button | زر |
| Submit | إرسال |
| Cancel | إلغاء |
| Save | حفظ |
| Delete | حذف |
| Edit | تعديل |
| Search | بحث |
| Settings | الإعدادات |
| Home | الرئيسية |
| Back | رجوع |
| Next | التالي |
| Previous | السابق |
| Loading | جاري التحميل |
| Error | خطأ |
| Success | نجاح |
| Warning | تحذير |
| Info | معلومات |
| Close | إغلاق |
| Open | فتح |
| View | عرض |
| Download | تحميل |
| Upload | رفع |
| Profile | الملف الشخصي |
| Notifications | الإشعارات |
| Messages | الرسائل |
| Help | مساعدة |

---

## FILE REFERENCES

For related rules and patterns, see:
- `@.cursor/rules/SYSTEM.md` - Core component building rules
- `@.cursor/rules/PATTERNS.md` - UI patterns with RTL examples
- `@docs-website/src/i18n/messages/ar.json` - Arabic translations
- `@docs-website/src/i18n/messages/en.json` - English translations
