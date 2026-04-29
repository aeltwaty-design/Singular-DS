import 'package:flutter/material.dart';

import 'design_system/singular.dart';
import 'screens/screens.dart';

/// =============================================================================
/// SINGULAR DESIGN SYSTEM - APP EXAMPLES
/// =============================================================================
/// This example demonstrates the Singular Design System in mobile app screens:
/// - WalaOne Home Screen (default)
/// - Loyalty Home Screen
/// - Points balance hero card with tier status
/// - Quick actions grid
/// - Featured offers carousel
/// - Recent activity timeline
/// - Bottom navigation
/// - Light/Dark mode support
/// - English/Arabic (LTR/RTL) support
/// - iPhone 16 Pro Max mockup preview
/// =============================================================================

void main() {
  runApp(const SingularDemoApp());
}

/// Demo App showing Singular Design System screens
class SingularDemoApp extends StatefulWidget {
  const SingularDemoApp({super.key});

  @override
  State<SingularDemoApp> createState() => _SingularDemoAppState();
}

enum ScreenType { walaOneHome, loyaltyHome }

class _SingularDemoAppState extends State<SingularDemoApp> {
  ScreenType _currentScreen = ScreenType.walaOneHome;
  ThemeMode _themeMode = ThemeMode.light;
  Locale _locale = const Locale('en', 'US');

  SingularBrand get _currentBrand =>
      _currentScreen == ScreenType.walaOneHome
          ? SingularBrand.walaOne
          : SingularBrand.walaPlus;

  void _toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  void _toggleLocale() {
    setState(() {
      _locale = _locale.languageCode == 'en'
          ? const Locale('ar', 'SA')
          : const Locale('en', 'US');
    });
  }

  void _toggleScreen() {
    setState(() {
      _currentScreen = _currentScreen == ScreenType.walaOneHome
          ? ScreenType.loyaltyHome
          : ScreenType.walaOneHome;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Singular Design System',
      debugShowCheckedModeBanner: false,
      theme: AppThemeFactory.getTheme(
        brand: _currentBrand,
        mode: ThemeMode.light,
        locale: _locale,
      ),
      darkTheme: AppThemeFactory.getTheme(
        brand: _currentBrand,
        mode: ThemeMode.dark,
        locale: _locale,
      ),
      themeMode: _themeMode,
      locale: _locale,
      supportedLocales: SingularLocales.supportedLocales,
      home: IPhoneMockupPreview(
        themeMode: _themeMode,
        locale: _locale,
        currentScreen: _currentScreen,
        onToggleTheme: _toggleTheme,
        onToggleLocale: _toggleLocale,
        onToggleScreen: _toggleScreen,
      ),
    );
  }
}

/// Preview wrapper that shows the app in an iPhone mockup
class IPhoneMockupPreview extends StatelessWidget {
  const IPhoneMockupPreview({
    super.key,
    required this.themeMode,
    required this.locale,
    required this.currentScreen,
    required this.onToggleTheme,
    required this.onToggleLocale,
    required this.onToggleScreen,
  });

  final ThemeMode themeMode;
  final Locale locale;
  final ScreenType currentScreen;
  final VoidCallback onToggleTheme;
  final VoidCallback onToggleLocale;
  final VoidCallback onToggleScreen;

  @override
  Widget build(BuildContext context) {
    final isDark = themeMode == ThemeMode.dark;
    final isArabic = locale.languageCode == 'ar';
    final isWalaOne = currentScreen == ScreenType.walaOneHome;
    final brand = isWalaOne ? SingularBrand.walaOne : SingularBrand.walaPlus;

    return Scaffold(
      backgroundColor: isDark ? const Color(0xFF0A0A0A) : const Color(0xFFF5F5F7),
      body: SafeArea(
        child: Column(
          children: [
            // Preview controls header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              child: Row(
                children: [
                  // Title
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          isWalaOne ? 'WalaOne Home' : 'Loyalty App',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : Colors.black,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'iPhone 16 Pro Max • ${isDark ? "Dark" : "Light"} Mode • ${isArabic ? "Arabic (RTL)" : "English (LTR)"}',
                          style: TextStyle(
                            fontSize: 14,
                            color: isDark ? Colors.white60 : Colors.black54,
                          ),
                        ),
                      ],
                    ),
                  ),
                  // Screen toggle
                  _ControlButton(
                    icon: Icons.swap_horiz,
                    label: isWalaOne ? 'Loyalty' : 'WalaOne',
                    onTap: onToggleScreen,
                    isDark: isDark,
                  ),
                  const SizedBox(width: 12),
                  // Theme toggle
                  _ControlButton(
                    icon: isDark ? Icons.light_mode : Icons.dark_mode,
                    label: isDark ? 'Light' : 'Dark',
                    onTap: onToggleTheme,
                    isDark: isDark,
                  ),
                  const SizedBox(width: 12),
                  // Language toggle
                  _ControlButton(
                    icon: Icons.language,
                    label: isArabic ? 'EN' : 'AR',
                    onTap: onToggleLocale,
                    isDark: isDark,
                  ),
                ],
              ),
            ),

            // iPhone mockup
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: IPhoneMockup(
                  frameColor: isDark ? IPhoneFrameColors.spaceBlack : IPhoneFrameColors.silver,
                  child: Directionality(
                    textDirection: isArabic ? TextDirection.rtl : TextDirection.ltr,
                    child: Theme(
                      data: AppThemeFactory.getTheme(
                        brand: brand,
                        mode: themeMode,
                        locale: locale,
                      ),
                      child: isWalaOne
                          ? WalaOneHomeScreen(
                              onToggleTheme: onToggleTheme,
                              onToggleLocale: onToggleLocale,
                              themeMode: themeMode,
                              locale: locale,
                            )
                          : LoyaltyHomeScreen(
                              onToggleTheme: onToggleTheme,
                              onToggleLocale: onToggleLocale,
                              themeMode: themeMode,
                              locale: locale,
                            ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ControlButton extends StatelessWidget {
  const _ControlButton({
    required this.icon,
    required this.label,
    required this.onTap,
    required this.isDark,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: isDark ? Colors.white12 : Colors.black.withValues(alpha: 0.05),
      borderRadius: BorderRadius.circular(12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                icon,
                size: 20,
                color: isDark ? Colors.white : Colors.black87,
              ),
              const SizedBox(width: 8),
              Text(
                label,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: isDark ? Colors.white : Colors.black87,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
