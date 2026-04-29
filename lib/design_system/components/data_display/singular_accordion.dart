import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';

/// =============================================================================
/// SINGULAR ACCORDION
/// =============================================================================
/// Accordions are expandable/collapsible panels for showing and hiding content.
///
/// ## Features
/// - Single or multiple expansion modes
/// - Leading icon support
/// - Custom header widget
/// - Animated expand/collapse
/// =============================================================================

/// Accordion item data
class SingularAccordionItem {
  const SingularAccordionItem({
    required this.id,
    required this.title,
    required this.content,
    this.subtitle,
    this.leadingIcon,
    this.isExpanded = false,
  });

  final String id;
  final String title;
  final Widget content;
  final String? subtitle;
  final IconData? leadingIcon;
  final bool isExpanded;
}

class SingularAccordion extends StatefulWidget {
  const SingularAccordion({
    super.key,
    required this.items,
    this.allowMultiple = false,
    this.onExpansionChanged,
    this.divider = true,
  });

  /// Accordion items
  final List<SingularAccordionItem> items;

  /// Allow multiple items expanded
  final bool allowMultiple;

  /// Expansion change callback
  final void Function(String id, bool isExpanded)? onExpansionChanged;

  /// Show divider between items
  final bool divider;

  @override
  State<SingularAccordion> createState() => _SingularAccordionState();
}

class _SingularAccordionState extends State<SingularAccordion> {
  late Set<String> _expandedIds;

  @override
  void initState() {
    super.initState();
    _expandedIds = widget.items
        .where((item) => item.isExpanded)
        .map((item) => item.id)
        .toSet();
  }

  void _toggleItem(String id) {
    setState(() {
      if (_expandedIds.contains(id)) {
        _expandedIds.remove(id);
        widget.onExpansionChanged?.call(id, false);
      } else {
        if (!widget.allowMultiple) {
          _expandedIds.clear();
        }
        _expandedIds.add(id);
        widget.onExpansionChanged?.call(id, true);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;

    return Column(
      children: widget.items.asMap().entries.map((entry) {
        final index = entry.key;
        final item = entry.value;
        final isExpanded = _expandedIds.contains(item.id);
        final isLast = index == widget.items.length - 1;

        return Column(
          children: [
            _AccordionItem(
              item: item,
              isExpanded: isExpanded,
              onToggle: () => _toggleItem(item.id),
            ),
            if (widget.divider && !isLast)
              Divider(height: 1, color: c.borderWeak),
          ],
        );
      }).toList(),
    );
  }
}

class _AccordionItem extends StatelessWidget {
  const _AccordionItem({
    required this.item,
    required this.isExpanded,
    required this.onToggle,
  });

  final SingularAccordionItem item;
  final bool isExpanded;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;

    return Column(
      children: [
        // Header
        GestureDetector(
          onTap: onToggle,
          behavior: HitTestBehavior.opaque,
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: s.md),
            child: Row(
              children: [
                // Leading icon
                if (item.leadingIcon != null) ...[
                  Icon(
                    item.leadingIcon,
                    size: 24,
                    color: c.textSecondary,
                  ),
                  SizedBox(width: s.md),
                ],

                // Title and subtitle
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        item.title,
                        style: t.bodyMedium.copyWith(
                          color: c.textPrimary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      if (item.subtitle != null)
                        Text(
                          item.subtitle!,
                          style: t.bodySmall.copyWith(color: c.textSecondary),
                        ),
                    ],
                  ),
                ),

                // Chevron
                AnimatedRotation(
                  turns: isExpanded ? 0.5 : 0,
                  duration: const Duration(milliseconds: 200),
                  child: Icon(
                    Iconsax.arrow_down_1,
                    size: 20,
                    color: c.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ),

        // Content
        AnimatedCrossFade(
          firstChild: const SizedBox(width: double.infinity),
          secondChild: Padding(
            padding: EdgeInsets.only(
              left: item.leadingIcon != null ? 40 : 0,
              bottom: s.md,
            ),
            child: item.content,
          ),
          crossFadeState:
              isExpanded ? CrossFadeState.showSecond : CrossFadeState.showFirst,
          duration: const Duration(milliseconds: 200),
        ),
      ],
    );
  }
}
