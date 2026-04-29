# Iconsax Icons Reference

The Singular Design System uses **Iconsax** icons exclusively. Do NOT use Material Icons.

## Import

```dart
import 'package:iconsax_flutter/iconsax_flutter.dart';
```

## Basic Usage

```dart
Icon(
  Iconsax.home_2,
  size: 24,
  color: c.textPrimary,
)
```

---

## Common Icons by Category

### Navigation

| Icon | Name | Usage |
|------|------|-------|
| 🏠 | `Iconsax.home_2` | Home screen |
| 👤 | `Iconsax.user` | Profile, account |
| ⚙️ | `Iconsax.setting_2` | Settings |
| 🔔 | `Iconsax.notification` | Notifications |
| 🔍 | `Iconsax.search_normal_1` | Search |
| ☰ | `Iconsax.menu` | Menu, hamburger |
| 🧭 | `Iconsax.discover_1` | Explore, discover |

### Actions

| Icon | Name | Usage |
|------|------|-------|
| ➕ | `Iconsax.add` | Add (simple) |
| ⊕ | `Iconsax.add_circle` | Add (emphasized) |
| ✏️ | `Iconsax.edit_2` | Edit |
| 🗑️ | `Iconsax.trash` | Delete |
| ✖️ | `Iconsax.close_circle` | Close, remove |
| ✓ | `Iconsax.tick_circle` | Success, check |
| 📋 | `Iconsax.copy` | Copy |
| 📤 | `Iconsax.send_2` | Send |
| 🔄 | `Iconsax.refresh` | Refresh |
| ⬇️ | `Iconsax.import` | Download |
| ⬆️ | `Iconsax.export_1` | Upload |

### Commerce & Finance

| Icon | Name | Usage |
|------|------|-------|
| 🛒 | `Iconsax.shopping_cart` | Shopping cart |
| 🏪 | `Iconsax.shop` | Store, merchant |
| 👜 | `Iconsax.bag_2` | Shopping bag |
| 🎁 | `Iconsax.gift` | Gift, rewards |
| 🎫 | `Iconsax.ticket` | Voucher, ticket |
| 👛 | `Iconsax.wallet_2` | Wallet |
| 💳 | `Iconsax.card` | Payment card |
| 💰 | `Iconsax.money` | Money |
| 📊 | `Iconsax.chart` | Analytics |
| 🧾 | `Iconsax.receipt_1` | Receipt |

### Status & Feedback

| Icon | Name | Usage |
|------|------|-------|
| ℹ️ | `Iconsax.info_circle` | Information |
| ⚠️ | `Iconsax.warning_2` | Warning |
| 🚨 | `Iconsax.danger` | Error, danger |
| ✅ | `Iconsax.tick_circle` | Success |
| ❓ | `Iconsax.message_question` | Help |

### Arrows & Direction

| Icon | Name | Usage |
|------|------|-------|
| ← | `Iconsax.arrow_left_2` | Back |
| → | `Iconsax.arrow_right_2` | Forward |
| ↑ | `Iconsax.arrow_up_2` | Up |
| ↓ | `Iconsax.arrow_down_2` | Down |
| ↩️ | `Iconsax.arrow_left` | Return |
| ↗️ | `Iconsax.arrow_right` | External |
| ▼ | `Iconsax.arrow_down` | Dropdown |
| ▲ | `Iconsax.arrow_up` | Collapse |

### Media

| Icon | Name | Usage |
|------|------|-------|
| 🖼️ | `Iconsax.image` | Image |
| 📷 | `Iconsax.camera` | Camera |
| 🎬 | `Iconsax.video` | Video |
| 🖼️ | `Iconsax.gallery` | Gallery |
| 📄 | `Iconsax.document` | Document |
| 📁 | `Iconsax.folder` | Folder |

### Communication

| Icon | Name | Usage |
|------|------|-------|
| 💬 | `Iconsax.message` | Message |
| 📞 | `Iconsax.call` | Phone call |
| ✉️ | `Iconsax.sms` | SMS |
| 📧 | `Iconsax.directbox_default` | Email |

### Theme & Display

| Icon | Name | Usage |
|------|------|-------|
| ☀️ | `Iconsax.sun_1` | Light mode |
| 🌙 | `Iconsax.moon` | Dark mode |
| 🌐 | `Iconsax.global` | Language |
| 👁️ | `Iconsax.eye` | Show |
| 🙈 | `Iconsax.eye_slash` | Hide |

### Time & Date

| Icon | Name | Usage |
|------|------|-------|
| 🕐 | `Iconsax.clock` | Time, history |
| 📅 | `Iconsax.calendar` | Calendar, date |
| ⏰ | `Iconsax.timer` | Timer |

### Location

| Icon | Name | Usage |
|------|------|-------|
| 📍 | `Iconsax.location` | Location pin |
| 🗺️ | `Iconsax.map` | Map |
| 🧭 | `Iconsax.gps` | GPS |

### Favorites & Rating

| Icon | Name | Usage |
|------|------|-------|
| ❤️ | `Iconsax.heart` | Favorite (outline) |
| 💖 | `Iconsax.lovely` | Favorite (filled) |
| ⭐ | `Iconsax.star_1` | Star rating |
| 🔖 | `Iconsax.bookmark` | Bookmark |

### Misc

| Icon | Name | Usage |
|------|------|-------|
| 🔧 | `Iconsax.setting` | Settings (alt) |
| 🔒 | `Iconsax.lock` | Lock, secure |
| 🔓 | `Iconsax.unlock` | Unlock |
| 🔗 | `Iconsax.link` | Link |
| 📎 | `Iconsax.attach_circle` | Attachment |
| 🏷️ | `Iconsax.tag` | Tag |
| 🔽 | `Iconsax.filter` | Filter |
| ⇅ | `Iconsax.sort` | Sort |
| ⋯ | `Iconsax.more` | More (horizontal) |
| ⋮ | `Iconsax.more_2` | More (vertical) |
| ➕ | `Iconsax.minus` | Minus |
| ✖️ | `Iconsax.close_square` | Close (square) |

---

## Icon Sizes

Use consistent sizes based on context:

| Size | Value | Usage |
|------|-------|-------|
| Small | 16px | Inline icons, badges |
| Default | 20px | Buttons, list items |
| Medium | 24px | Navigation, cards |
| Large | 32px | Empty states, headers |
| XL | 48px | Hero sections |

```dart
// Small icon
Icon(Iconsax.add, size: 16)

// Default
Icon(Iconsax.add, size: 20)

// Medium
Icon(Iconsax.add, size: 24)

// Large
Icon(Iconsax.add, size: 32)
```

---

## Icon Colors

Always use token colors:

```dart
// Primary icon
Icon(Iconsax.home_2, color: c.textPrimary)

// Secondary icon
Icon(Iconsax.info_circle, color: c.textSecondary)

// Disabled icon
Icon(Iconsax.lock, color: c.textDisabled)

// Brand icon
Icon(Iconsax.star_1, color: c.brandPrimary)

// Status icons
Icon(Iconsax.tick_circle, color: c.statusSuccess)
Icon(Iconsax.warning_2, color: c.statusWarning)
Icon(Iconsax.danger, color: c.statusError)
Icon(Iconsax.info_circle, color: c.statusInfo)

// On colored background
Icon(Iconsax.add, color: c.textOnColor)
```


