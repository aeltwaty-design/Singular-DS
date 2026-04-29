import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import 'package:singular_design_system/design_system/singular.dart';

/// =============================================================================
/// LOYALTY HOME SCREEN - WalaPlus Loyalty App Home
/// =============================================================================
/// Features:
/// - Points balance hero card with tier status
/// - Quick actions grid (Earn, Redeem, History, Offers)
/// - Featured offers carousel
/// - Recent activity/transactions list
/// - Full RTL/LTR support
/// - Light/Dark mode support
/// - Uses Singular Design System components
/// =============================================================================

class LoyaltyHomeScreen extends StatefulWidget {
  const LoyaltyHomeScreen({
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
  State<LoyaltyHomeScreen> createState() => _LoyaltyHomeScreenState();
}

class _LoyaltyHomeScreenState extends State<LoyaltyHomeScreen> {
  int _selectedNavIndex = 0;
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;

    final isArabic = widget.locale.languageCode == 'ar';

    if (_isLoading) {
      return Scaffold(
        backgroundColor: c.bgPrimary,
        body: _LoadingState(isArabic: isArabic),
      );
    }

    return Scaffold(
      backgroundColor: c.bgPrimary,
      body: CustomScrollView(
        slivers: [
          // Status bar / Dynamic Island padding
          const SliverToBoxAdapter(
            child: SizedBox(height: 54),
          ),

          // Header
          SliverToBoxAdapter(
            child: _Header(
              onToggleTheme: widget.onToggleTheme,
              onToggleLocale: widget.onToggleLocale,
              themeMode: widget.themeMode,
              isArabic: isArabic,
            ),
          ),

          // Points Hero Card
          SliverToBoxAdapter(
            child: _PointsHeroCard(isArabic: isArabic),
          ),

          // Quick Actions Grid
          SliverToBoxAdapter(
            child: _QuickActionsGrid(isArabic: isArabic),
          ),

          // Featured Offers Section Header
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.only(
                left: s.pageMargin,
                right: s.pageMargin,
                top: s.xl,
                bottom: s.md,
              ),
              child: SingularSectionHeader(
                title: isArabic ? 'العروض المميزة' : 'Featured Offers',
                trailingAction: isArabic ? 'عرض الكل' : 'View all',
                onTrailingActionTap: () {},
              ),
            ),
          ),

          // Featured Offers Carousel
          SliverToBoxAdapter(
            child: _OffersCarousel(isArabic: isArabic),
          ),

          // Recent Activity Section Header
          SliverToBoxAdapter(
            child: Padding(
              padding: EdgeInsets.only(
                left: s.pageMargin,
                right: s.pageMargin,
                top: s.xl,
                bottom: s.md,
              ),
              child: SingularSectionHeader(
                title: isArabic ? 'النشاط الأخير' : 'Recent Activity',
                trailingAction: isArabic ? 'عرض الكل' : 'View all',
                onTrailingActionTap: () {},
              ),
            ),
          ),

          // Recent Transactions List
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) => _TransactionItem(
                  transaction: _mockTransactions[index],
                  isArabic: isArabic,
                  isLast: index == _mockTransactions.length - 1,
                ),
                childCount: _mockTransactions.length,
              ),
            ),
          ),

          // Bottom padding for nav bar
          SliverToBoxAdapter(
            child: SizedBox(height: s.sectionLg),
          ),
        ],
      ),
      bottomNavigationBar: SingularTabBar(
        items: [
          SingularTabBarItem(
            icon: Iconsax.home_2,
            label: isArabic ? 'الرئيسية' : 'Home',
          ),
          SingularTabBarItem(
            icon: Iconsax.discover_1,
            label: isArabic ? 'اكتشف' : 'Explore',
          ),
          SingularTabBarItem(
            icon: Iconsax.gift,
            label: isArabic ? 'المكافآت' : 'Rewards',
          ),
          SingularTabBarItem(
            icon: Iconsax.user,
            label: isArabic ? 'حسابي' : 'Profile',
          ),
        ],
        selectedIndex: _selectedNavIndex,
        onTabChange: (index) => setState(() => _selectedNavIndex = index),
      ),
    );
  }
}

// =============================================================================
// HEADER WIDGET
// =============================================================================

class _Header extends StatelessWidget {
  const _Header({
    required this.onToggleTheme,
    required this.onToggleLocale,
    required this.themeMode,
    required this.isArabic,
  });

  final VoidCallback onToggleTheme;
  final VoidCallback onToggleLocale;
  final ThemeMode themeMode;
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin, vertical: s.md),
      child: Row(
        children: [
          // Greeting
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isArabic ? 'أهلاً بعودتك' : 'Welcome back',
                  style: t.labelMedium.copyWith(color: c.textSecondary),
                ),
                const VGap.xxs(),
                Text(
                  isArabic ? 'أحمد محمد' : 'Ahmed Mohamed',
                  style: t.titleLarge.copyWith(
                    color: c.textPrimary,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),

          // Theme toggle using SingularIconButton
          SingularIconButton(
            icon: themeMode == ThemeMode.dark ? Iconsax.sun_1 : Iconsax.moon,
            label: 'Toggle theme',
            onPressed: onToggleTheme,
            variant: SingularIconButtonVariant.tertiary,
            size: SingularIconButtonSize.md,
          ),

          const HGap.xs(),

          // Language toggle - custom styled button for text
          GestureDetector(
            onTap: onToggleLocale,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: s.sm, vertical: s.xs),
              decoration: BoxDecoration(
                border: Border.all(color: c.borderDefault),
                borderRadius: context.radius.sm,
              ),
              child: Text(
                isArabic ? 'EN' : 'ع',
                style: t.labelMedium.copyWith(
                  color: c.textPrimary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),

          const HGap.sm(),

          // Notification with SingularBadge
          Stack(
            clipBehavior: Clip.none,
            children: [
              SingularIconButton(
                icon: Iconsax.notification,
                label: 'Notifications',
                onPressed: () {},
                variant: SingularIconButtonVariant.tertiary,
                size: SingularIconButtonSize.md,
              ),
              Positioned(
                top: 0,
                right: 0,
                child: SingularBadge(
                  value: 3,
                  color: SingularBadgeColor.red,
                  size: SingularBadgeSize.sm,
                ),
              ),
            ],
          ),

          const HGap.sm(),

          // Avatar using SingularAvatar
          SingularAvatar(
            fallback: isArabic ? 'أ' : 'A',
            size: SingularAvatarSize.lg,
          ),
        ],
      ),
    );
  }
}

// =============================================================================
// POINTS HERO CARD
// =============================================================================

class _PointsHeroCard extends StatelessWidget {
  const _PointsHeroCard({required this.isArabic});

  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;
    final e = context.elevation;

    // Mock data
    const currentPoints = 12450;
    const tierName = 'Gold';
    const tierNameAr = 'ذهبي';
    const pointsToNextTier = 2550;
    const nextTierName = 'Platinum';
    const nextTierNameAr = 'بلاتيني';
    const progressPercent = 0.83;

    return Padding(
      padding: EdgeInsets.all(s.pageMargin),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [c.brandPrimary, c.brandPrimaryDark],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: r.xl,
          boxShadow: e.brandShadow(c.brandPrimary, 2),
        ),
        child: Stack(
          children: [
            // Decorative circles
            Positioned(
              right: isArabic ? null : -40,
              left: isArabic ? -40 : null,
              top: -40,
              child: Container(
                width: 160,
                height: 160,
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.08),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            Positioned(
              left: isArabic ? null : 60,
              right: isArabic ? 60 : null,
              bottom: -60,
              child: Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.06),
                  shape: BoxShape.circle,
                ),
              ),
            ),

            // Content
            Padding(
              padding: EdgeInsets.all(s.xl),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Tier badge using SingularTag
                  Row(
                    children: [
                      Container(
                        padding: EdgeInsets.symmetric(
                          horizontal: s.md,
                          vertical: s.xs,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.2),
                          borderRadius: r.full,
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              Iconsax.star_1,
                              size: 16,
                              color: c.textOnColor,
                            ),
                            const HGap.xs(),
                            Text(
                              isArabic ? tierNameAr : tierName,
                              style: t.labelMedium.copyWith(
                                color: c.textOnColor,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Spacer(),
                      Icon(
                        Iconsax.wallet_2,
                        size: 28,
                        color: Colors.white.withValues(alpha: 0.6),
                      ),
                    ],
                  ),

                  const VGap.lg(),

                  // Points label
                  Text(
                    isArabic ? 'نقاطك الحالية' : 'Your Points',
                    style: t.bodyMedium.copyWith(
                      color: Colors.white.withValues(alpha: 0.8),
                    ),
                  ),
                  const VGap.xs(),

                  // Points value
                  Text(
                    isArabic
                        ? _toArabicNumerals(currentPoints)
                        : _formatNumber(currentPoints),
                    style: t.displaySmall.copyWith(
                      color: c.textOnColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const VGap.xl(),

                  // Progress to next tier
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        isArabic
                            ? '${_toArabicNumerals(pointsToNextTier)} نقطة للوصول إلى $nextTierNameAr'
                            : '$pointsToNextTier points to $nextTierName',
                        style: t.labelSmall.copyWith(
                          color: Colors.white.withValues(alpha: 0.8),
                        ),
                      ),
                      Text(
                        isArabic
                            ? '${_toArabicNumerals((progressPercent * 100).toInt())}٪'
                            : '${(progressPercent * 100).toInt()}%',
                        style: t.labelSmall.copyWith(
                          color: c.textOnColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  const VGap.sm(),

                  // Progress bar - custom styled for hero card
                  Container(
                    height: 8,
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      borderRadius: r.full,
                    ),
                    child: FractionallySizedBox(
                      alignment:
                          isArabic ? Alignment.centerRight : Alignment.centerLeft,
                      widthFactor: progressPercent,
                      child: Container(
                        decoration: BoxDecoration(
                          color: c.textOnColor,
                          borderRadius: r.full,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatNumber(int number) {
    return number.toString().replaceAllMapped(
          RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'),
          (Match m) => '${m[1]},',
        );
  }

  String _toArabicNumerals(int number) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map((char) {
      if (char == '-') return '-';
      if (char == ',') return '،';
      final digit = int.tryParse(char);
      if (digit != null) return arabicNumerals[digit];
      return char;
    }).join();
  }
}

// =============================================================================
// QUICK ACTIONS GRID
// =============================================================================

class _QuickActionsGrid extends StatelessWidget {
  const _QuickActionsGrid({required this.isArabic});

  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;

    final actions = [
      _QuickAction(
        icon: Iconsax.add_circle,
        label: 'Earn',
        labelAr: 'اكسب',
      ),
      _QuickAction(
        icon: Iconsax.gift,
        label: 'Redeem',
        labelAr: 'استبدل',
      ),
      _QuickAction(
        icon: Iconsax.receipt_1,
        label: 'History',
        labelAr: 'السجل',
      ),
      _QuickAction(
        icon: Iconsax.ticket,
        label: 'Offers',
        labelAr: 'العروض',
      ),
    ];

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
      child: Row(
        children: actions
            .map((action) => Expanded(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: s.xs),
                    child: _QuickActionCard(
                      icon: action.icon,
                      label: isArabic ? action.labelAr : action.label,
                      onTap: () {},
                    ),
                  ),
                ))
            .toList(),
      ),
    );
  }
}

class _QuickAction {
  const _QuickAction({
    required this.icon,
    required this.label,
    required this.labelAr,
  });

  final IconData icon;
  final String label;
  final String labelAr;
}

class _QuickActionCard extends StatelessWidget {
  const _QuickActionCard({
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
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: s.lg),
        decoration: BoxDecoration(
          color: c.bgSurface,
          borderRadius: r.lg,
          border: Border.all(color: c.borderWeak),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Using SingularIconContainer for consistent icon styling
            SingularIconContainer(
              icon: icon,
              size: SingularIconContainerSize.lg,
              color: SingularIconContainerColor.primary,
              shape: SingularIconContainerShape.circle,
            ),
            const VGap.sm(),
            Text(
              label,
              style: t.labelMedium.copyWith(
                color: c.textPrimary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// =============================================================================
// OFFERS CAROUSEL
// =============================================================================

class _OffersCarousel extends StatelessWidget {
  const _OffersCarousel({required this.isArabic});

  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;

    return SizedBox(
      height: 160,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
        itemCount: _mockOffers.length,
        separatorBuilder: (_, __) => const HGap.md(),
        itemBuilder: (context, index) => _OfferCardWidget(
          offer: _mockOffers[index],
          isArabic: isArabic,
        ),
      ),
    );
  }
}

class _OfferCardWidget extends StatelessWidget {
  const _OfferCardWidget({
    required this.offer,
    required this.isArabic,
  });

  final _MockOffer offer;
  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;
    final e = context.elevation;

    return Container(
      width: 200,
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.lg,
        boxShadow: e.level1,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Image placeholder with SingularIconContainer
          Container(
            height: 80,
            decoration: BoxDecoration(
              color: c.brandPrimaryLight,
              borderRadius: r.topOnly(r.lg),
            ),
            child: Center(
              child: SingularIconContainer(
                icon: offer.icon,
                size: SingularIconContainerSize.lg,
                color: SingularIconContainerColor.primary,
                shape: SingularIconContainerShape.circle,
                filled: false,
              ),
            ),
          ),

          // Content
          Padding(
            padding: EdgeInsets.all(s.md),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isArabic ? offer.titleAr : offer.title,
                  style: t.labelMedium.copyWith(
                    color: c.textPrimary,
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const VGap.xs(),
                // Points display using SingularTag
                SingularTag(
                  label: isArabic
                      ? '${_toArabicNumerals(offer.points)} نقطة'
                      : '${offer.points} points',
                  color: SingularTagColor.primary,
                  size: SingularTagSize.sm,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _toArabicNumerals(int number) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map((char) {
      final digit = int.tryParse(char);
      if (digit != null) return arabicNumerals[digit];
      return char;
    }).join();
  }
}

// =============================================================================
// TRANSACTION ITEM
// =============================================================================

class _TransactionItem extends StatelessWidget {
  const _TransactionItem({
    required this.transaction,
    required this.isArabic,
    this.isLast = false,
  });

  final _MockTransaction transaction;
  final bool isArabic;
  final bool isLast;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    final isEarned = transaction.type == _TransactionType.earned;
    final pointsText = isEarned
        ? '+${isArabic ? _toArabicNumerals(transaction.points) : transaction.points}'
        : '-${isArabic ? _toArabicNumerals(transaction.points) : transaction.points}';

    // Custom implementation using design tokens for better control
    return Padding(
      padding: EdgeInsets.symmetric(vertical: s.sm),
      child: Row(
        children: [
          // Leading icon using SingularIconContainer
          SingularIconContainer(
            icon: transaction.icon,
            size: SingularIconContainerSize.md,
            color: isEarned
                ? SingularIconContainerColor.success
                : SingularIconContainerColor.warning,
            shape: SingularIconContainerShape.rounded,
          ),
          const HGap.md(),

          // Content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isArabic ? transaction.titleAr : transaction.title,
                  style: t.bodyMedium.copyWith(
                    color: c.textPrimary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const VGap.xxs(),
                Text(
                  isArabic ? transaction.dateAr : transaction.date,
                  style: t.bodySmall.copyWith(color: c.textSecondary),
                ),
              ],
            ),
          ),

          // Trailing points
          Text(
            pointsText,
            style: t.titleMedium.copyWith(
              color: isEarned ? c.statusSuccess : c.statusWarning,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  String _toArabicNumerals(int number) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map((char) {
      final digit = int.tryParse(char);
      if (digit != null) return arabicNumerals[digit];
      return char;
    }).join();
  }
}

// =============================================================================
// LOADING STATE
// =============================================================================

class _LoadingState extends StatelessWidget {
  const _LoadingState({required this.isArabic});

  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;

    return SafeArea(
      child: SingleChildScrollView(
        padding: EdgeInsets.all(s.pageMargin),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 54),

            // Header skeleton using SingularSkeleton
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SingularSkeleton.text(width: 100, height: 14),
                      const VGap.sm(),
                      SingularSkeleton.text(width: 150, height: 20),
                    ],
                  ),
                ),
                SingularSkeleton.circular(size: 44),
              ],
            ),
            const VGap.xl(),

            // Hero skeleton
            SingularSkeleton.rectangular(height: 200),
            const VGap.xl(),

            // Quick actions skeleton
            Row(
              children: List.generate(
                4,
                (index) => Expanded(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: s.xs),
                    child: SingularSkeleton.rectangular(height: 90),
                  ),
                ),
              ),
            ),
            const VGap.xl(),

            // Section header skeleton
            SingularSkeleton.text(width: 150, height: 24),
            const VGap.md(),

            // Carousel skeleton
            SizedBox(
              height: 160,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: 3,
                separatorBuilder: (_, __) => const HGap.md(),
                itemBuilder: (_, __) =>
                    SingularSkeleton.rectangular(width: 200, height: 160),
              ),
            ),
            const VGap.xl(),

            // Section header skeleton
            SingularSkeleton.text(width: 150, height: 24),
            const VGap.md(),

            // List skeleton using SingularSkeletonGroup
            SingularSkeletonGroup(count: 5, spacing: s.md),
          ],
        ),
      ),
    );
  }
}

// =============================================================================
// EMPTY STATE (unused but kept for reference)
// =============================================================================

class _EmptyStateWidget extends StatelessWidget {
  const _EmptyStateWidget({required this.isArabic});

  final bool isArabic;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: s.pageMargin),
      child: SingularEmptyState(
        title: isArabic ? 'لا توجد نقاط بعد' : 'No points yet',
        description: isArabic
            ? 'ابدأ بكسب النقاط من خلال التسوق لدى شركائنا'
            : 'Start earning points by shopping with our partners',
        icon: Iconsax.wallet_2,
        actionLabel: isArabic ? 'استكشف الشركاء' : 'Explore Partners',
        onAction: () {},
      ),
    );
  }
}

// =============================================================================
// MOCK DATA
// =============================================================================

class _MockOffer {
  const _MockOffer({
    required this.title,
    required this.titleAr,
    required this.points,
    required this.icon,
  });

  final String title;
  final String titleAr;
  final int points;
  final IconData icon;
}

final _mockOffers = [
  const _MockOffer(
    title: 'Free Coffee',
    titleAr: 'قهوة مجانية',
    points: 500,
    icon: Iconsax.coffee,
  ),
  const _MockOffer(
    title: '20% Off Electronics',
    titleAr: '٢٠٪ خصم إلكترونيات',
    points: 2000,
    icon: Iconsax.mobile,
  ),
  const _MockOffer(
    title: 'Free Delivery',
    titleAr: 'توصيل مجاني',
    points: 300,
    icon: Iconsax.truck,
  ),
  const _MockOffer(
    title: 'Cinema Ticket',
    titleAr: 'تذكرة سينما',
    points: 1500,
    icon: Iconsax.video_play,
  ),
];

enum _TransactionType { earned, redeemed }

class _MockTransaction {
  const _MockTransaction({
    required this.title,
    required this.titleAr,
    required this.date,
    required this.dateAr,
    required this.points,
    required this.type,
    required this.icon,
  });

  final String title;
  final String titleAr;
  final String date;
  final String dateAr;
  final int points;
  final _TransactionType type;
  final IconData icon;
}

final _mockTransactions = [
  const _MockTransaction(
    title: 'Shopping at Carrefour',
    titleAr: 'تسوق في كارفور',
    date: 'Today, 2:30 PM',
    dateAr: 'اليوم، ٢:٣٠ م',
    points: 250,
    type: _TransactionType.earned,
    icon: Iconsax.shopping_cart,
  ),
  const _MockTransaction(
    title: 'Redeemed Coffee',
    titleAr: 'استبدال قهوة',
    date: 'Yesterday, 9:15 AM',
    dateAr: 'أمس، ٩:١٥ ص',
    points: 500,
    type: _TransactionType.redeemed,
    icon: Iconsax.coffee,
  ),
  const _MockTransaction(
    title: 'Restaurant Bill',
    titleAr: 'فاتورة مطعم',
    date: 'Jan 18, 7:45 PM',
    dateAr: '١٨ يناير، ٧:٤٥ م',
    points: 180,
    type: _TransactionType.earned,
    icon: Iconsax.reserve,
  ),
  const _MockTransaction(
    title: 'Fuel Station',
    titleAr: 'محطة وقود',
    date: 'Jan 17, 11:20 AM',
    dateAr: '١٧ يناير، ١١:٢٠ ص',
    points: 320,
    type: _TransactionType.earned,
    icon: Iconsax.gas_station,
  ),
  const _MockTransaction(
    title: 'Movie Ticket',
    titleAr: 'تذكرة سينما',
    date: 'Jan 15, 6:00 PM',
    dateAr: '١٥ يناير، ٦:٠٠ م',
    points: 1500,
    type: _TransactionType.redeemed,
    icon: Iconsax.video_play,
  ),
];
