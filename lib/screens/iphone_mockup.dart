import 'package:flutter/material.dart';

/// =============================================================================
/// IPHONE MOCKUP PREVIEW
/// =============================================================================
/// A realistic iPhone device frame for previewing mobile screens.
/// Supports iPhone 16 Pro Max dimensions (430 x 932) with Dynamic Island.
/// =============================================================================

class IPhoneMockup extends StatelessWidget {
  const IPhoneMockup({
    super.key,
    required this.child,
    this.showStatusBar = true,
    this.showHomeIndicator = true,
    this.frameColor,
    this.screenBackground,
  });

  /// The screen content to display inside the mockup
  final Widget child;

  /// Whether to show the iOS status bar
  final bool showStatusBar;

  /// Whether to show the home indicator bar
  final bool showHomeIndicator;

  /// Custom frame color (defaults to space black)
  final Color? frameColor;

  /// Background color for screen area
  final Color? screenBackground;

  // iPhone 16 Pro Max dimensions
  static const double _deviceWidth = 430;
  static const double _deviceHeight = 932;
  static const double _frameThickness = 12;
  static const double _cornerRadius = 58;
  static const double _screenCornerRadius = 50;
  static const double _dynamicIslandWidth = 120;
  static const double _dynamicIslandHeight = 36;

  @override
  Widget build(BuildContext context) {
    final frame = frameColor ?? const Color(0xFF1C1C1E);
    final screenBg = screenBackground ?? Colors.black;

    return Center(
      child: Container(
        width: _deviceWidth + (_frameThickness * 2),
        height: _deviceHeight + (_frameThickness * 2),
        decoration: BoxDecoration(
          color: frame,
          borderRadius: BorderRadius.circular(_cornerRadius),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.3),
              blurRadius: 30,
              offset: const Offset(0, 15),
            ),
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.15),
              blurRadius: 60,
              offset: const Offset(0, 30),
            ),
          ],
        ),
        child: Stack(
          children: [
            // Side buttons
            _buildSideButtons(frame),

            // Screen area
            Positioned.fill(
              child: Padding(
                padding: const EdgeInsets.all(_frameThickness),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(_screenCornerRadius),
                  child: Container(
                    color: screenBg,
                    child: Stack(
                      children: [
                        // Main content
                        Positioned.fill(child: child),

                        // Dynamic Island
                        _buildDynamicIsland(),

                        // Status bar content (time, icons)
                        if (showStatusBar) _buildStatusBar(),

                        // Home indicator
                        if (showHomeIndicator) _buildHomeIndicator(),
                      ],
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

  Widget _buildSideButtons(Color frameColor) {
    final buttonColor = frameColor.withValues(alpha: 0.8);

    return Stack(
      children: [
        // Left side - Silent switch & Volume buttons
        Positioned(
          left: -3,
          top: 120,
          child: Container(
            width: 4,
            height: 30,
            decoration: BoxDecoration(
              color: buttonColor,
              borderRadius: const BorderRadius.horizontal(left: Radius.circular(2)),
            ),
          ),
        ),
        Positioned(
          left: -3,
          top: 180,
          child: Container(
            width: 4,
            height: 60,
            decoration: BoxDecoration(
              color: buttonColor,
              borderRadius: const BorderRadius.horizontal(left: Radius.circular(2)),
            ),
          ),
        ),
        Positioned(
          left: -3,
          top: 255,
          child: Container(
            width: 4,
            height: 60,
            decoration: BoxDecoration(
              color: buttonColor,
              borderRadius: const BorderRadius.horizontal(left: Radius.circular(2)),
            ),
          ),
        ),
        // Right side - Power button
        Positioned(
          right: -3,
          top: 200,
          child: Container(
            width: 4,
            height: 90,
            decoration: BoxDecoration(
              color: buttonColor,
              borderRadius: const BorderRadius.horizontal(right: Radius.circular(2)),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDynamicIsland() {
    return Positioned(
      top: 11,
      left: 0,
      right: 0,
      child: Center(
        child: Container(
          width: _dynamicIslandWidth,
          height: _dynamicIslandHeight,
          decoration: BoxDecoration(
            color: Colors.black,
            borderRadius: BorderRadius.circular(_dynamicIslandHeight / 2),
          ),
        ),
      ),
    );
  }

  Widget _buildStatusBar() {
    return Positioned(
      top: 15,
      left: 24,
      right: 24,
      child: DefaultTextStyle(
        style: const TextStyle(
          color: Colors.white,
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Time
            const Text('9:41'),
            // Spacer for Dynamic Island
            const SizedBox(width: _dynamicIslandWidth + 20),
            // Status icons
            Row(
              children: [
                // Cellular
                _buildCellularIcon(),
                const SizedBox(width: 5),
                // WiFi
                _buildWifiIcon(),
                const SizedBox(width: 5),
                // Battery
                _buildBatteryIcon(),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCellularIcon() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: List.generate(4, (index) {
        return Container(
          width: 3,
          height: 4 + (index * 2.5),
          margin: const EdgeInsets.only(right: 1),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(1),
          ),
        );
      }),
    );
  }

  Widget _buildWifiIcon() {
    return const Icon(
      Icons.wifi,
      color: Colors.white,
      size: 16,
    );
  }

  Widget _buildBatteryIcon() {
    return Container(
      width: 25,
      height: 12,
      decoration: BoxDecoration(
        border: Border.all(color: Colors.white, width: 1),
        borderRadius: BorderRadius.circular(3),
      ),
      child: Stack(
        children: [
          Positioned(
            left: 2,
            top: 2,
            bottom: 2,
            child: Container(
              width: 18,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(1),
              ),
            ),
          ),
          Positioned(
            right: -3,
            top: 3,
            child: Container(
              width: 2,
              height: 5,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: const BorderRadius.horizontal(right: Radius.circular(1)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHomeIndicator() {
    return Positioned(
      bottom: 8,
      left: 0,
      right: 0,
      child: Center(
        child: Container(
          width: 134,
          height: 5,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(3),
          ),
        ),
      ),
    );
  }
}

/// Device frame color options
class IPhoneFrameColors {
  static const Color spaceBlack = Color(0xFF1C1C1E);
  static const Color silver = Color(0xFFE3E3E8);
  static const Color gold = Color(0xFFF4E8CE);
  static const Color deepPurple = Color(0xFF3E3450);
}

