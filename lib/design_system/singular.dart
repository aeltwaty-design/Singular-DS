/// =============================================================================
/// SINGULAR DESIGN SYSTEM
/// =============================================================================
/// A multi-brand, scalable Design System for WalaPlus, WalaOne, and Doam products.
/// 
/// This library exports all design system tokens, themes, components, and utilities.
/// 
/// ## Quick Start
/// 
/// ```dart
/// import 'package:singular_design_system/design_system/singular.dart';
/// 
/// // Get theme for your brand
/// final theme = AppThemeFactory.walaPlus.lightTheme;
/// 
/// // Use in MaterialApp
/// MaterialApp(
///   theme: AppThemeFactory.walaPlus.lightTheme,
///   darkTheme: AppThemeFactory.walaPlus.darkTheme,
/// );
/// 
/// // Access tokens in widgets
/// Widget build(BuildContext context) {
///   final colors = context.colors;
///   final typography = context.typography;
///   final spacing = context.spacing;
///   
///   return Container(
///     color: colors.bgPrimary,
///     padding: EdgeInsets.all(spacing.md),
///     child: Text(
///       'Hello',
///       style: typography.headlineLarge.copyWith(
///         color: colors.textPrimary,
///       ),
///     ),
///   );
/// }
/// ```
/// =============================================================================
library singular;

// Primitives
export 'foundations/primitives/color_palettes.dart';

// Tokens
export 'foundations/tokens/app_colors.dart';
export 'foundations/tokens/app_elevation.dart';
export 'foundations/tokens/app_radius.dart';
export 'foundations/tokens/app_spacing.dart';
export 'foundations/tokens/app_typography.dart';

// Typography helpers
export 'foundations/typography/font_family_helper.dart';

// Brand Themes
export 'themes/brand_themes/doam_theme.dart';
export 'themes/brand_themes/walaone_theme.dart';
export 'themes/brand_themes/walaplus_theme.dart';

// Theme Factory
export 'themes/app_theme_factory.dart';

// Components
export 'components/components.dart';
