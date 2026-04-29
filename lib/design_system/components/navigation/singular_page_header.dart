import 'package:flutter/material.dart';
import '../../singular.dart';
import 'singular_breadcrumbs.dart';
import '../data_display/singular_tag.dart';
import '../data_entry/singular_search.dart';

/// =============================================================================
/// SINGULAR PAGE HEADER
/// =============================================================================
/// A page header component with breadcrumbs, title, description, actions, etc.
///
/// ## Features
/// - Breadcrumbs navigation
/// - Title with optional tag
/// - Supporting text/description
/// - Leading image/avatar
/// - Actions slot
/// - Search input
/// - Tabs slot
/// - Bottom separator
/// =============================================================================

/// Page header leading type
enum SingularPageHeaderLeading {
  /// No leading element
  none,

  /// Image/avatar
  image,
}

class SingularPageHeader extends StatelessWidget {
  const SingularPageHeader({
    super.key,
    required this.title,
    this.supportingText,
    this.breadcrumbs,
    this.showBreadcrumbs = false,
    this.tag,
    this.showTag = false,
    this.leading = SingularPageHeaderLeading.none,
    this.leadingImage,
    this.leadingImageAlt,
    this.actions,
    this.showActions = false,
    this.showSearch = false,
    this.searchPlaceholder,
    this.searchValue,
    this.onSearchChange,
    this.tabs,
    this.showTabs = false,
    this.showSeparator = false,
  });

  /// Page title
  final String title;

  /// Supporting description text
  final String? supportingText;

  /// Breadcrumb items
  final List<SingularBreadcrumbItem>? breadcrumbs;

  /// Show breadcrumbs
  final bool showBreadcrumbs;

  /// Tag text
  final String? tag;

  /// Show tag
  final bool showTag;

  /// Leading element type
  final SingularPageHeaderLeading leading;

  /// Leading image URL
  final String? leadingImage;

  /// Leading image alt text
  final String? leadingImageAlt;

  /// Actions widget slot
  final Widget? actions;

  /// Show actions
  final bool showActions;

  /// Show search input
  final bool showSearch;

  /// Search placeholder
  final String? searchPlaceholder;

  /// Search value (controlled)
  final String? searchValue;

  /// Search change callback
  final ValueChanged<String>? onSearchChange;

  /// Tabs widget slot
  final Widget? tabs;

  /// Show tabs
  final bool showTabs;

  /// Show bottom separator
  final bool showSeparator;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Container(
      decoration: BoxDecoration(
        color: c.bgSurface,
        border: showSeparator
            ? Border(bottom: BorderSide(color: c.borderWeak))
            : null,
      ),
      padding: EdgeInsets.all(s.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Breadcrumbs
          if (showBreadcrumbs && breadcrumbs != null && breadcrumbs!.isNotEmpty) ...[
            SingularBreadcrumbs(items: breadcrumbs!),
            SizedBox(height: s.md),
          ],

          // Main row
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Leading image
              if (leading == SingularPageHeaderLeading.image &&
                  leadingImage != null) ...[
                ClipRRect(
                  borderRadius: r.md,
                  child: leadingImage!.startsWith('http')
                      ? Image.network(
                          leadingImage!,
                          width: 64,
                          height: 64,
                          fit: BoxFit.cover,
                          semanticLabel: leadingImageAlt,
                        )
                      : Image.asset(
                          leadingImage!,
                          width: 64,
                          height: 64,
                          fit: BoxFit.cover,
                          semanticLabel: leadingImageAlt,
                        ),
                ),
                SizedBox(width: s.md),
              ],

              // Title and description
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Title row with tag
                    Row(
                      children: [
                        Flexible(
                          child: Text(
                            title,
                            style: t.headlineMedium.copyWith(
                              color: c.textPrimary,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        if (showTag && tag != null) ...[
                          SizedBox(width: s.sm),
                          SingularTag(
                            label: tag!,
                            color: SingularTagColor.info,
                            size: SingularTagSize.sm,
                          ),
                        ],
                      ],
                    ),

                    // Supporting text
                    if (supportingText != null) ...[
                      SizedBox(height: s.xs),
                      Text(
                        supportingText!,
                        style: t.bodyMedium.copyWith(color: c.textSecondary),
                      ),
                    ],
                  ],
                ),
              ),

              // Actions
              if (showActions && actions != null) ...[
                SizedBox(width: s.md),
                actions!,
              ],
            ],
          ),

          // Search
          if (showSearch) ...[
            SizedBox(height: s.md),
            SingularSearch(
              placeholder: searchPlaceholder ?? 'Search...',
              onChanged: onSearchChange,
              size: SingularSearchSize.sm,
            ),
          ],

          // Tabs
          if (showTabs && tabs != null) ...[
            SizedBox(height: s.md),
            tabs!,
          ],
        ],
      ),
    );
  }
}
