import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:singular_design_system/design_system/singular.dart';

/// =============================================================================
/// WALAONE HOME SCREEN
/// =============================================================================
/// A feature-rich home screen for the WalaOne app with:
/// - Dark gradient header with user greeting
/// - Points balance hero section
/// - Glassmorphic quick action buttons
/// - White content card with multiple sections
/// - Custom curved bottom navigation with scan FAB
/// =============================================================================

class WalaOneHomeScreen extends StatefulWidget {
  const WalaOneHomeScreen({
    super.key,
    required this.onToggleTheme,
    required this.onToggleLocale,
    required this.themeMode,
    required this.locale,
  });

  final VoidCallback onToggleTheme;
  final VoidCallback onToggleLocale;
  final ThemeMode themeMode;
  final Locale locale;

  @override
  State<WalaOneHomeScreen> createState() => _WalaOneHomeScreenState();
}

class _WalaOneHomeScreenState extends State<WalaOneHomeScreen> {
  int _selectedNavIndex = 0;
  int _currentBannerIndex = 0;
  final PageController _bannerController = PageController();

  bool get isArabic => widget.locale.languageCode == 'ar';

  @override
  void dispose() {
    _bannerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background gradient
          _buildGradientBackground(),

          // Main content
          CustomScrollView(
            slivers: [
              // Top padding for status bar
              const SliverToBoxAdapter(child: SizedBox(height: 44)),

              // Header with user greeting
              SliverToBoxAdapter(child: _buildHeader()),

              // Points balance hero
              SliverToBoxAdapter(child: _buildPointsHero()),

              // Quick action buttons (glassmorphic)
              SliverToBoxAdapter(child: _buildQuickActions()),

              // White content card
              SliverToBoxAdapter(child: _buildWhiteContentCard()),
            ],
          ),

          // Curved bottom navigation
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: _CurvedBottomNav(
              selectedIndex: _selectedNavIndex,
              onTabChange: (index) => setState(() => _selectedNavIndex = index),
              isArabic: isArabic,
            ),
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // GRADIENT BACKGROUND
  // ===========================================================================

  Widget _buildGradientBackground() {
    return Positioned(
      top: 0,
      left: 0,
      right: 0,
      height: 320,
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF1B1532),
              Color(0xFF380AAA),
            ],
            stops: [0.0, 0.37],
          ),
        ),
        child: Stack(
          children: [
            // Decorative blur circles
            Positioned(
              left: -101,
              top: 142,
              child: Container(
                width: 296,
                height: 203,
                decoration: BoxDecoration(
                  color: const Color(0xFF8A6B1C).withValues(alpha: 0.5),
                  borderRadius: BorderRadius.circular(500),
                ),
              ),
            ),
            Positioned(
              left: 157,
              top: 142,
              child: Container(
                width: 275,
                height: 203,
                decoration: BoxDecoration(
                  color: const Color(0xFF534199).withValues(alpha: 0.5),
                  borderRadius: BorderRadius.circular(500),
                ),
              ),
            ),
            // Apply blur to decorative circles
            Positioned.fill(
              child: BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 57, sigmaY: 57),
                child: Container(color: Colors.transparent),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ===========================================================================
  // HEADER
  // ===========================================================================

  Widget _buildHeader() {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
      child: Row(
        children: [
          // Avatar
          SingularAvatar(
            imageUrl: 'https://i.pravatar.cc/150?img=8',
            size: SingularAvatarSize.lg,
          ),
          const HGap.md(),

          // Greeting
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isArabic ? 'صباح الخير' : 'Good Morning',
                  style: t.bodySmall.copyWith(
                    color: const Color(0xFFCCD2E0),
                  ),
                ),
                Text(
                  isArabic ? 'محمد' : 'Mohamed',
                  style: t.titleMedium.copyWith(
                    color: const Color(0xFFF8F9FC),
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),

          // Notification button
          Container(
            padding: EdgeInsets.all(s.sm),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.3),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Iconsax.notification,
              color: Colors.white,
              size: 20,
            ),
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // POINTS HERO
  // ===========================================================================

  Widget _buildPointsHero() {
    final s = context.spacing;
    final t = context.typography;

    return Padding(
      padding: EdgeInsets.only(top: s.xl),
      child: Column(
        children: [
          // Points display
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Coin icon
              Container(
                width: 32,
                height: 30,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF534199), Color(0xFFA391E5)],
                  ),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Center(
                  child: Icon(
                    Iconsax.coin_1,
                    color: Colors.white,
                    size: 18,
                  ),
                ),
              ),
              const HGap.md(),
              Text(
                isArabic ? '٥٠٠،٠٠٠' : '500,000',
                style: t.displaySmall.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // QUICK ACTIONS (GLASSMORPHIC)
  // ===========================================================================

  Widget _buildQuickActions() {
    final s = context.spacing;

    final actions = [
      _GlassAction(
        icon: Icons.add,
        label: isArabic ? 'شحن' : 'Top Up',
      ),
      _GlassAction(
        icon: Iconsax.coin_1,
        label: isArabic ? 'اكسب واستبدل' : 'Earn & Redeem',
      ),
      _GlassAction(
        icon: Iconsax.arrow_swap_horizontal,
        label: isArabic ? 'تحويل' : 'Transfer',
      ),
    ];

    return Padding(
      padding: EdgeInsets.only(top: s.xl, bottom: s.xl),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: actions
            .map((action) => Padding(
                  padding: EdgeInsets.symmetric(horizontal: s.md),
                  child: _GlassButton(
                    icon: action.icon,
                    label: action.label,
                    onTap: () {},
                  ),
                ))
            .toList(),
      ),
    );
  }

  // ===========================================================================
  // WHITE CONTENT CARD
  // ===========================================================================

  Widget _buildWhiteContentCard() {
    final c = context.colors;
    final s = context.spacing;
    final r = context.radius;

    return Container(
      decoration: BoxDecoration(
        color: c.bgPrimary,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(25),
          topRight: Radius.circular(25),
        ),
      ),
      child: Column(
        children: [
          const VGap.xl(),

          // Section: Things you can do
          _buildThingsYouCanDoSection(),

          const VGap.xl(),

          // Promotional banners carousel
          _buildBannersCarousel(),

          const VGap.xl(),

          // Section: Partners you follow
          _buildPartnersSection(),

          const VGap.xl(),

          // Section: Special Vouchers
          _buildVouchersSection(),

          const VGap.xl(),

          // Section: Exclusive Offers
          _buildOffersSection(),

          // Bottom padding for nav bar
          SizedBox(height: 120),
        ],
      ),
    );
  }

  // ===========================================================================
  // THINGS YOU CAN DO SECTION
  // ===========================================================================

  Widget _buildThingsYouCanDoSection() {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    final quickActions = [
      _QuickActionItem(
        icon: Iconsax.reserve,
        label: 'Order Food',
        labelAr: 'اطلب طعام',
      ),
      _QuickActionItem(
        icon: Iconsax.heart,
        label: 'Donate',
        labelAr: 'تبرع',
      ),
      _QuickActionItem(
        icon: Iconsax.game,
        label: 'Games',
        labelAr: 'ألعاب',
      ),
      _QuickActionItem(
        icon: Iconsax.ticket,
        label: 'Vouchers',
        labelAr: 'قسائم',
      ),
      _QuickActionItem(
        icon: Iconsax.discount_shape,
        label: 'Offers',
        labelAr: 'عروض',
      ),
    ];

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Section header with highlight
          _SectionHeaderWithHighlight(
            title: isArabic ? 'أشياء يمكنك فعلها' : 'Things you can do',
          ),
          const VGap.md(),

          // Search bar
          SingularSearch(
            placeholder: isArabic ? 'ابحث عما تحتاجه..' : 'Find what you need..',
            onChanged: (_) {},
          ),
          const VGap.md(),

          // Quick actions horizontal scroll
          SizedBox(
            height: 85,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: quickActions.length,
              separatorBuilder: (_, __) => const HGap.md(),
              itemBuilder: (context, index) {
                final action = quickActions[index];
                return _QuickActionCircle(
                  icon: action.icon,
                  label: isArabic ? action.labelAr : action.label,
                  onTap: () {},
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // BANNERS CAROUSEL
  // ===========================================================================

  Widget _buildBannersCarousel() {
    final s = context.spacing;

    return Column(
      children: [
        SizedBox(
          height: 120,
          child: PageView.builder(
            controller: _bannerController,
            onPageChanged: (index) =>
                setState(() => _currentBannerIndex = index),
            itemCount: _mockBanners.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
                child: _BannerCard(banner: _mockBanners[index]),
              );
            },
          ),
        ),
        const VGap.sm(),

        // Page indicators
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            _mockBanners.length,
            (index) => Container(
              width: 8,
              height: 8,
              margin: const EdgeInsets.symmetric(horizontal: 2),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: index == _currentBannerIndex
                    ? const Color(0xFF24272E)
                    : const Color(0xFFCCD2E0),
              ),
            ),
          ),
        ),
      ],
    );
  }

  // ===========================================================================
  // PARTNERS SECTION
  // ===========================================================================

  Widget _buildPartnersSection() {
    final s = context.spacing;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
      child: Column(
        children: [
          // Section header
          SingularSectionHeader(
            title: isArabic ? 'الشركاء الذين تتابعهم' : 'Partners you follow',
            trailingAction: isArabic ? '+ إضافة المزيد' : '+ Add more',
            onTrailingActionTap: () {},
          ),
          const VGap.md(),

          // Partner cards horizontal scroll
          SizedBox(
            height: 115,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _mockPartners.length,
              separatorBuilder: (_, __) => const HGap.md(),
              itemBuilder: (context, index) {
                final partner = _mockPartners[index];
                return _PartnerCard(
                  partner: partner,
                  isArabic: isArabic,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // VOUCHERS SECTION
  // ===========================================================================

  Widget _buildVouchersSection() {
    final s = context.spacing;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _SectionHeaderWithHighlight(
            title: isArabic ? 'قسائم مميزة' : 'Special Vouchers',
          ),
          const VGap.md(),

          // Voucher cards horizontal scroll
          SizedBox(
            height: 169,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _mockVouchers.length,
              separatorBuilder: (_, __) => const HGap.md(),
              itemBuilder: (context, index) {
                final voucher = _mockVouchers[index];
                return _ImageCard(
                  title: voucher.title,
                  gradientColors: voucher.gradientColors,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  // ===========================================================================
  // OFFERS SECTION
  // ===========================================================================

  Widget _buildOffersSection() {
    final s = context.spacing;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _SectionHeaderWithHighlight(
            title: isArabic ? 'عروض حصرية' : 'Exclusive Offers',
          ),
          const VGap.md(),

          // Offer cards horizontal scroll
          SizedBox(
            height: 169,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _mockOffers.length,
              separatorBuilder: (_, __) => const HGap.md(),
              itemBuilder: (context, index) {
                final offer = _mockOffers[index];
                return _ImageCard(
                  title: offer.title,
                  gradientColors: offer.gradientColors,
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// GLASSMORPHIC BUTTON
// =============================================================================

class _GlassAction {
  const _GlassAction({required this.icon, required this.label});
  final IconData icon;
  final String label;
}

class _GlassButton extends StatelessWidget {
  const _GlassButton({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final t = context.typography;

    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          // Glass button
          ClipRRect(
            borderRadius: BorderRadius.circular(9999),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.1),
                      blurRadius: 8,
                      spreadRadius: 2,
                    ),
                  ],
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.2),
                    width: 1,
                  ),
                ),
                child: Center(
                  child: Icon(
                    icon,
                    color: Colors.white,
                    size: 20,
                  ),
                ),
              ),
            ),
          ),
          const VGap.xs(),
          Text(
            label,
            style: t.labelSmall.copyWith(
              color: Colors.white,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// SECTION HEADER WITH HIGHLIGHT
// =============================================================================

class _SectionHeaderWithHighlight extends StatelessWidget {
  const _SectionHeaderWithHighlight({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    final t = context.typography;

    return Stack(
      children: [
        // Highlight bar
        Positioned(
          left: 0,
          bottom: 2,
          child: Container(
            width: title.length * 5.5,
            height: 9,
            color: const Color(0xFFC0B4ED).withValues(alpha: 0.5),
          ),
        ),
        // Title text
        Text(
          title,
          style: t.titleMedium.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}

// =============================================================================
// QUICK ACTION CIRCLE
// =============================================================================

class _QuickActionItem {
  const _QuickActionItem({
    required this.icon,
    required this.label,
    required this.labelAr,
  });

  final IconData icon;
  final String label;
  final String labelAr;
}

class _QuickActionCircle extends StatelessWidget {
  const _QuickActionCircle({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;

    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: 66,
        child: Column(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                color: c.brandPrimaryLight,
                shape: BoxShape.circle,
              ),
              child: Center(
                child: Icon(
                  icon,
                  color: c.brandPrimary,
                  size: 28,
                ),
              ),
            ),
            const VGap.xs(),
            Text(
              label,
              style: t.labelSmall.copyWith(
                color: c.textPrimary,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

// =============================================================================
// BANNER CARD
// =============================================================================

class _MockBanner {
  const _MockBanner({
    required this.title,
    required this.gradientColors,
  });

  final String title;
  final List<Color> gradientColors;
}

final _mockBanners = [
  const _MockBanner(
    title: 'Gaming Promo',
    gradientColors: [Color(0xFF1A1A2E), Color(0xFF534199)],
  ),
  const _MockBanner(
    title: 'Summer Sale',
    gradientColors: [Color(0xFF534199), Color(0xFF755BD8)],
  ),
  const _MockBanner(
    title: 'New Arrivals',
    gradientColors: [Color(0xFF380AAA), Color(0xFF534199)],
  ),
];

class _BannerCard extends StatelessWidget {
  const _BannerCard({required this.banner});

  final _MockBanner banner;

  @override
  Widget build(BuildContext context) {
    final t = context.typography;
    final r = context.radius;

    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: banner.gradientColors,
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
        ),
        borderRadius: r.lg,
      ),
      child: Stack(
        children: [
          // Decorative elements
          Positioned(
            right: -20,
            top: -20,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
            ),
          ),
          Positioned(
            left: -10,
            bottom: -30,
            child: Container(
              width: 60,
              height: 60,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.08),
                shape: BoxShape.circle,
              ),
            ),
          ),
          // Content
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  banner.title,
                  style: t.titleLarge.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const VGap.xs(),
                Text(
                  'Special promotion',
                  style: t.bodySmall.copyWith(
                    color: Colors.white.withValues(alpha: 0.8),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// PARTNER CARD
// =============================================================================

class _MockPartner {
  const _MockPartner({
    required this.name,
    required this.category,
    required this.categoryAr,
    required this.categoryIcon,
    required this.logoColor,
    required this.initial,
  });

  final String name;
  final String category;
  final String categoryAr;
  final IconData categoryIcon;
  final Color logoColor;
  final String initial;
}

final _mockPartners = [
  const _MockPartner(
    name: 'Amazon',
    category: 'Partner',
    categoryAr: 'شريك',
    categoryIcon: Iconsax.shop,
    logoColor: Color(0xFFFF9900),
    initial: 'a',
  ),
  const _MockPartner(
    name: 'Fortnite',
    category: 'Vouchers',
    categoryAr: 'قسائم',
    categoryIcon: Iconsax.ticket,
    logoColor: Color(0xFF9D4DFF),
    initial: 'F',
  ),
  const _MockPartner(
    name: 'Noon',
    category: 'Offers',
    categoryAr: 'عروض',
    categoryIcon: Iconsax.discount_shape,
    logoColor: Color(0xFFFFD100),
    initial: 'N',
  ),
];

class _PartnerCard extends StatelessWidget {
  const _PartnerCard({
    required this.partner,
    required this.isArabic,
  });

  final _MockPartner partner;
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Container(
      width: 110,
      padding: EdgeInsets.symmetric(horizontal: s.sm, vertical: s.sm),
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.lg,
        border: Border.all(color: c.borderDefault),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          // Logo placeholder
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: partner.logoColor.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                partner.initial,
                style: t.titleMedium.copyWith(
                  color: partner.logoColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
          const VGap.xs(),
          Text(
            partner.name,
            style: t.bodySmall.copyWith(
              color: c.textPrimary,
            ),
            textAlign: TextAlign.center,
          ),
          const VGap.xs(),
          // Category tag
          Container(
            padding: EdgeInsets.symmetric(horizontal: s.xs, vertical: 2),
            decoration: BoxDecoration(
              color: c.bgSurfaceSoft,
              borderRadius: r.lg,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  partner.categoryIcon,
                  size: 10,
                  color: c.textSecondary,
                ),
                const HGap.xxs(),
                Text(
                  isArabic ? partner.categoryAr : partner.category,
                  style: t.labelSmall.copyWith(
                    color: c.textSecondary,
                    fontSize: 10,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// IMAGE CARD (VOUCHERS / OFFERS)
// =============================================================================

class _ImageCardData {
  const _ImageCardData({
    required this.title,
    required this.gradientColors,
  });

  final String title;
  final List<Color> gradientColors;
}

final _mockVouchers = [
  const _ImageCardData(
    title: 'Gaming Time 🕹️',
    gradientColors: [Color(0xFF1A1A2E), Color(0xFF534199)],
  ),
  const _ImageCardData(
    title: 'Hello Summer 🍉🏝️',
    gradientColors: [Color(0xFF4ECDC4), Color(0xFF44A08D)],
  ),
  const _ImageCardData(
    title: 'Catch up or not',
    gradientColors: [Color(0xFFE74C3C), Color(0xFFC0392B)],
  ),
];

final _mockOffers = [
  const _ImageCardData(
    title: 'Morning Coffee ☕',
    gradientColors: [Color(0xFF8B4513), Color(0xFF5D3A1A)],
  ),
  const _ImageCardData(
    title: 'Your needs on us 🍅',
    gradientColors: [Color(0xFF2ECC71), Color(0xFF27AE60)],
  ),
  const _ImageCardData(
    title: 'Text for Card',
    gradientColors: [Color(0xFF3498DB), Color(0xFF2980B9)],
  ),
];

class _ImageCard extends StatelessWidget {
  const _ImageCard({
    required this.title,
    required this.gradientColors,
  });

  final String title;
  final List<Color> gradientColors;

  @override
  Widget build(BuildContext context) {
    final t = context.typography;
    final r = context.radius;

    return Container(
      width: 127,
      height: 169,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: gradientColors,
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
        ),
        borderRadius: r.md,
      ),
      child: Stack(
        children: [
          // Gradient overlay at bottom
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            height: 60,
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.transparent,
                    const Color(0xFF403277).withValues(alpha: 0.9),
                  ],
                ),
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(12),
                  bottomRight: Radius.circular(12),
                ),
              ),
            ),
          ),
          // Title at bottom
          Positioned(
            left: 16,
            right: 16,
            bottom: 8,
            child: Text(
              title,
              style: t.labelMedium.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// CURVED BOTTOM NAVIGATION
// =============================================================================

class _CurvedBottomNav extends StatelessWidget {
  const _CurvedBottomNav({
    required this.selectedIndex,
    required this.onTabChange,
    required this.isArabic,
  });

  final int selectedIndex;
  final ValueChanged<int> onTabChange;
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final t = context.typography;

    final items = [
      _NavItem(
        icon: Iconsax.home_2,
        activeIcon: Iconsax.home_2,
        label: isArabic ? 'الرئيسية' : 'Home',
      ),
      _NavItem(
        icon: Iconsax.ticket,
        activeIcon: Iconsax.ticket,
        label: isArabic ? 'السوق' : 'Market',
      ),
      _NavItem(
        icon: Iconsax.scan,
        activeIcon: Iconsax.scan,
        label: '',
        isCenterFab: true,
      ),
      _NavItem(
        icon: Iconsax.coin,
        activeIcon: Iconsax.coin_1,
        label: isArabic ? 'المحفظة' : 'Wallet',
      ),
      _NavItem(
        icon: Iconsax.profile_circle,
        activeIcon: Iconsax.profile_circle,
        label: isArabic ? 'حسابي' : 'Account',
      ),
    ];

    return Container(
      height: 95,
      child: Stack(
        children: [
          // White curved background
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: CustomPaint(
              size: const Size(double.infinity, 70),
              painter: _CurvedNavPainter(color: c.bgSurface),
            ),
          ),

          // Nav items
          Positioned(
            bottom: 9,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(items.length, (index) {
                final item = items[index];

                // Center FAB
                if (item.isCenterFab) {
                  return _buildScanFab();
                }

                final isSelected = index == selectedIndex;
                return GestureDetector(
                  onTap: () => onTabChange(index),
                  behavior: HitTestBehavior.opaque,
                  child: SizedBox(
                    width: 75,
                    height: 56,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          isSelected ? item.activeIcon : item.icon,
                          size: 24,
                          color: isSelected
                              ? const Color(0xFF755BD8)
                              : c.textPrimary,
                        ),
                        const VGap.xxs(),
                        Text(
                          item.label,
                          style: t.labelSmall.copyWith(
                            color: isSelected
                                ? const Color(0xFF755BD8)
                                : c.textPrimary,
                            fontWeight:
                                isSelected ? FontWeight.w600 : FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildScanFab() {
    return GestureDetector(
      onTap: () {},
      child: Container(
        width: 62,
        height: 62,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
            colors: [
              Color(0xE634227B),
              Color(0xE66248C3),
            ],
          ),
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 8,
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(31),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
            child: Center(
              child: Icon(
                Iconsax.scan,
                color: Colors.white,
                size: 24,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _NavItem {
  const _NavItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
    this.isCenterFab = false,
  });

  final IconData icon;
  final IconData activeIcon;
  final String label;
  final bool isCenterFab;
}

// =============================================================================
// CURVED NAV PAINTER
// =============================================================================

class _CurvedNavPainter extends CustomPainter {
  _CurvedNavPainter({required this.color});

  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    final path = Path();
    final curveHeight = 25.0;
    final curveWidth = 70.0;
    final centerX = size.width / 2;

    path.moveTo(0, curveHeight);
    path.lineTo(centerX - curveWidth, curveHeight);

    // Curved notch for FAB
    path.quadraticBezierTo(
      centerX - curveWidth / 2,
      curveHeight,
      centerX - curveWidth / 2.5,
      0,
    );
    path.quadraticBezierTo(
      centerX,
      -curveHeight * 0.5,
      centerX + curveWidth / 2.5,
      0,
    );
    path.quadraticBezierTo(
      centerX + curveWidth / 2,
      curveHeight,
      centerX + curveWidth,
      curveHeight,
    );

    path.lineTo(size.width, curveHeight);
    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
