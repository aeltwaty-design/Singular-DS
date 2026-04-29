import 'package:flutter/material.dart';
import 'package:iconsax_flutter/iconsax_flutter.dart';
import '../../singular.dart';
import '../call_to_actions/singular_button.dart';

/// =============================================================================
/// SINGULAR FILE UPLOAD
/// =============================================================================
/// File upload components allow users to upload files.
///
/// ## Features
/// - Drag and drop zone
/// - File progress indicator
/// - File type icons
/// - Multiple file support
/// =============================================================================

/// File upload state
enum SingularFileUploadState {
  /// Idle/waiting for upload
  idle,

  /// Uploading in progress
  uploading,

  /// Upload complete
  complete,

  /// Upload error
  error,
}

/// Uploaded file data
class SingularUploadFile {
  const SingularUploadFile({
    required this.name,
    required this.size,
    this.type,
    this.state = SingularFileUploadState.idle,
    this.progress = 0,
    this.errorMessage,
  });

  final String name;
  final int size; // in bytes
  final String? type;
  final SingularFileUploadState state;
  final double progress; // 0.0 - 1.0
  final String? errorMessage;

  String get sizeFormatted {
    if (size < 1024) return '$size B';
    if (size < 1024 * 1024) return '${(size / 1024).toStringAsFixed(1)} KB';
    return '${(size / (1024 * 1024)).toStringAsFixed(1)} MB';
  }
}

class SingularFileDropZone extends StatelessWidget {
  const SingularFileDropZone({
    super.key,
    this.onTap,
    this.title,
    this.subtitle,
    this.acceptedTypes,
    this.maxSize,
    this.disabled = false,
  });

  /// Tap callback to open file picker
  final VoidCallback? onTap;

  /// Title text
  final String? title;

  /// Subtitle/description
  final String? subtitle;

  /// Accepted file types (for display)
  final List<String>? acceptedTypes;

  /// Max file size in bytes (for display)
  final int? maxSize;

  /// Disabled state
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return GestureDetector(
      onTap: disabled ? null : onTap,
      child: Container(
        padding: EdgeInsets.all(s.lg),
        decoration: BoxDecoration(
          color: c.bgSurfaceSoft,
          borderRadius: r.md,
          border: Border.all(
            color: c.borderDefault,
            style: BorderStyle.solid,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Icon
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: c.brandPrimary.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(
                Iconsax.document_upload,
                color: disabled ? c.textDisabled : c.brandPrimary,
                size: 24,
              ),
            ),
            SizedBox(height: s.md),

            // Title
            Text(
              title ?? 'Click to upload',
              style: t.labelMedium.copyWith(
                color: disabled ? c.textDisabled : c.brandPrimary,
                fontWeight: FontWeight.w600,
              ),
            ),

            // Subtitle
            if (subtitle != null) ...[
              SizedBox(height: s.xs),
              Text(
                subtitle!,
                style: t.bodySmall.copyWith(color: c.textSecondary),
                textAlign: TextAlign.center,
              ),
            ],

            // Accepted types
            if (acceptedTypes != null && acceptedTypes!.isNotEmpty) ...[
              SizedBox(height: s.xs),
              Text(
                acceptedTypes!.join(', '),
                style: t.labelSmall.copyWith(color: c.textDisabled),
              ),
            ],

            // Max size
            if (maxSize != null) ...[
              SizedBox(height: s.xxs),
              Text(
                'Max ${SingularUploadFile(name: '', size: maxSize!).sizeFormatted}',
                style: t.labelSmall.copyWith(color: c.textDisabled),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class SingularFileProgressItem extends StatelessWidget {
  const SingularFileProgressItem({
    super.key,
    required this.file,
    this.onRemove,
    this.onRetry,
  });

  /// File data
  final SingularUploadFile file;

  /// Remove callback
  final VoidCallback? onRemove;

  /// Retry callback
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final s = context.spacing;
    final t = context.typography;
    final r = context.radius;

    return Container(
      padding: EdgeInsets.all(s.md),
      decoration: BoxDecoration(
        color: c.bgSurface,
        borderRadius: r.sm,
        border: Border.all(
          color: file.state == SingularFileUploadState.error
              ? c.statusError
              : c.borderWeak,
        ),
      ),
      child: Row(
        children: [
          // File icon
          SingularFileTypeIcon(fileName: file.name, type: file.type),
          SizedBox(width: s.md),

          // File info
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  file.name,
                  style: t.labelMedium.copyWith(
                    color: c.textPrimary,
                    fontWeight: FontWeight.w500,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: s.xxs),

                // Progress or status
                if (file.state == SingularFileUploadState.uploading) ...[
                  Row(
                    children: [
                      Expanded(
                        child: ClipRRect(
                          borderRadius: r.full,
                          child: LinearProgressIndicator(
                            value: file.progress,
                            backgroundColor: c.bgSurfaceSoft,
                            valueColor:
                                AlwaysStoppedAnimation(c.brandPrimary),
                            minHeight: 4,
                          ),
                        ),
                      ),
                      SizedBox(width: s.sm),
                      Text(
                        '${(file.progress * 100).round()}%',
                        style: t.labelSmall.copyWith(color: c.textSecondary),
                      ),
                    ],
                  ),
                ] else if (file.state == SingularFileUploadState.error) ...[
                  Text(
                    file.errorMessage ?? 'Upload failed',
                    style: t.bodySmall.copyWith(color: c.statusError),
                  ),
                ] else ...[
                  Text(
                    file.sizeFormatted,
                    style: t.bodySmall.copyWith(color: c.textSecondary),
                  ),
                ],
              ],
            ),
          ),

          // Actions
          SizedBox(width: s.sm),
          if (file.state == SingularFileUploadState.error && onRetry != null)
            GestureDetector(
              onTap: onRetry,
              child: Icon(Iconsax.refresh, size: 20, color: c.brandPrimary),
            ),
          if (onRemove != null) ...[
            SizedBox(width: s.sm),
            GestureDetector(
              onTap: onRemove,
              child: Icon(Iconsax.trash, size: 20, color: c.textSecondary),
            ),
          ],
          if (file.state == SingularFileUploadState.complete) ...[
            Icon(Iconsax.tick_circle, size: 20, color: c.statusSuccess),
          ],
        ],
      ),
    );
  }
}

class SingularFileTypeIcon extends StatelessWidget {
  const SingularFileTypeIcon({
    super.key,
    this.fileName,
    this.type,
    this.size = 40,
  });

  final String? fileName;
  final String? type;
  final double size;

  String get _extension {
    if (type != null) return type!.split('/').last;
    if (fileName != null && fileName!.contains('.')) {
      return fileName!.split('.').last.toLowerCase();
    }
    return '';
  }

  IconData get _icon {
    switch (_extension) {
      case 'pdf':
        return Iconsax.document_text;
      case 'doc':
      case 'docx':
        return Iconsax.document;
      case 'xls':
      case 'xlsx':
        return Iconsax.document_text_1;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return Iconsax.image;
      case 'mp4':
      case 'mov':
      case 'avi':
        return Iconsax.video;
      case 'mp3':
      case 'wav':
        return Iconsax.music;
      case 'zip':
      case 'rar':
        return Iconsax.folder_open;
      default:
        return Iconsax.document_1;
    }
  }

  Color _getColor(AppColors c) {
    switch (_extension) {
      case 'pdf':
        return c.statusError;
      case 'doc':
      case 'docx':
        return c.statusInfo;
      case 'xls':
      case 'xlsx':
        return c.statusSuccess;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return c.statusWarning;
      case 'mp4':
      case 'mov':
      case 'avi':
        return c.brandPrimary;
      default:
        return c.textSecondary;
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final r = context.radius;
    final color = _getColor(c);

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: r.sm,
      ),
      child: Icon(
        _icon,
        size: size * 0.5,
        color: color,
      ),
    );
  }
}

/// Complete file upload widget combining drop zone and progress list
class SingularFileUpload extends StatelessWidget {
  const SingularFileUpload({
    super.key,
    required this.files,
    this.onTap,
    this.onRemove,
    this.onRetry,
    this.title,
    this.subtitle,
    this.acceptedTypes,
    this.maxSize,
    this.disabled = false,
  });

  final List<SingularUploadFile> files;
  final VoidCallback? onTap;
  final void Function(SingularUploadFile file)? onRemove;
  final void Function(SingularUploadFile file)? onRetry;
  final String? title;
  final String? subtitle;
  final List<String>? acceptedTypes;
  final int? maxSize;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final s = context.spacing;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Drop zone
        SingularFileDropZone(
          onTap: onTap,
          title: title,
          subtitle: subtitle,
          acceptedTypes: acceptedTypes,
          maxSize: maxSize,
          disabled: disabled,
        ),

        // File list
        if (files.isNotEmpty) ...[
          SizedBox(height: s.md),
          ...files.map((file) => Padding(
                padding: EdgeInsets.only(bottom: s.sm),
                child: SingularFileProgressItem(
                  file: file,
                  onRemove: onRemove != null ? () => onRemove!(file) : null,
                  onRetry: onRetry != null ? () => onRetry!(file) : null,
                ),
              )),
        ],
      ],
    );
  }
}
