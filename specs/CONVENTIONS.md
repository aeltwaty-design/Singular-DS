# Singular Design System - Naming Conventions

This document defines the canonical naming conventions that both Flutter and React implementations must follow.

## Status / Semantic Names

| Concept | Canonical | NOT | Rationale |
|---------|-----------|-----|-----------|
| Destructive action | `error` | `danger` | Aligns with Figma status colors and semantic token names |
| Neutral color | `gray` | `grey` | Aligns with CSS/Tailwind convention |
| Default/neutral status | `default` | `neutral`, `none` | Consistent across all components |

## Size Scale

| Size | Name | NOT |
|------|------|-----|
| Extra small | `xs` | `extraSmall` |
| Small | `sm` | `small` |
| Medium | `md` | `medium` |
| Large | `lg` | `large` |
| Extra large | `xl` | `extraLarge` |
| 2x Extra large | `2xl` | `xxl` |

Note: Flutter enums use `2xl` not `xxl` to align with Tailwind convention.

## Component Naming

| Platform | Pattern | Example |
|----------|---------|---------|
| Flutter class | `Singular{Name}` | `SingularTag`, `SingularAlert` |
| React export | `{Name}` | `Tag`, `Alert` |
| Figma component | `{Name}` | `Tag`, `Alert` |
| Spec file | `{name}.yaml` | `tag.yaml`, `alert.yaml` |

## Prop Naming

| Concept | Flutter | React | Rationale |
|---------|---------|-------|-----------|
| Primary content | `label` (String) | `children` (ReactNode) | Platform-idiomatic |
| Image source | `src` | `src` | Standard HTML convention |
| Click handler | `onTap` / `onPressed` | `onClick` / `onPress` | Platform-idiomatic |
| Variant style | `variant` | `variant` | Shared |
| Size | `size` | `size` | Shared |
| Status/color | `status` | `status` | Shared (not `color`) |
| Disabled state | `disabled` | `disabled` | Shared |
| Loading state | `loading` | `loading` | Shared |

## Token Naming

| Canonical (kebab-case) | Flutter (camelCase) | CSS Custom Property |
|------------------------|--------------------|--------------------|
| `bg-primary` | `bgPrimary` | `--bg-primary` |
| `text-secondary` | `textSecondary` | `--text-secondary` |
| `border-brand` | `borderBrand` | `--border-brand` |

## Enum / Variant Values

Both platforms use the same string values for variants:
- Status: `default`, `gray`, `error`, `warning`, `success`, `info`
- Type: `solid`, `subtle`, `outline`
- Size: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

Flutter uses Dart enums (e.g., `SingularTagStatus.error`).
React uses string unions (e.g., `status: 'error'`).
