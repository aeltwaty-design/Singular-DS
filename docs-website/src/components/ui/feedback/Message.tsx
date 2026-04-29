'use client';

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { InfoCircle } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';
import { useLocale } from 'next-intl';

// ============================================================================
// DESIGN TOKENS (Based on Figma specs)
// ============================================================================

const tokens = {
  // Container
  container: {
    padding: 'p-4', // 16px
    gap: 'gap-4', // 16px between artwork and body
    textGap: 'gap-1', // 4px between title and supporting text
  },

  // Border radius by size for secondary type
  radius: {
    lg: 'rounded-3xl', // 24px
    md: 'rounded-2xl', // 16px
    sm: 'rounded-2xl', // 16px
  },

  // Artwork sizes
  artwork: {
    lg: {
      illustration: 'w-[118px] h-[118px]',
      icon: 'w-[72px] h-[72px]',
      image: 'w-[53.334px] h-[53.334px]',
      iconContainer: 'p-4', // 16px
      iconContainerRadius: 'rounded-2xl', // 16px
      iconSize: 40,
    },
    md: {
      illustration: 'w-[80px] h-[80px]',
      icon: 'w-[48px] h-[48px]',
      image: 'w-[80px] h-[80px]',
      iconContainer: 'p-3', // 12px
      iconContainerRadius: 'rounded-lg', // 8px
      iconSize: 24,
    },
    sm: {
      illustration: 'w-[56px] h-[56px]',
      icon: 'w-[40px] h-[40px]',
      image: 'w-[56px] h-[56px]',
      iconContainer: 'p-2.5', // 10px
      iconContainerRadius: 'rounded-lg', // 8px
      iconSize: 20,
    },
  },

  // Typography
  typography: {
    title: {
      lg: 'text-2xl font-semibold leading-[1.4]', // 24px H5
      md: 'text-xl font-semibold leading-[1.4]', // 20px H6
      sm: 'text-xl font-semibold leading-[1.4]', // 20px H6
    },
    supporting: {
      lg: 'text-base font-normal leading-[1.5]', // 16px
      md: 'text-base font-normal leading-[1.5]', // 16px
      sm: 'text-sm font-normal leading-[1.5]', // 14px
    },
  },

  // Colors
  colors: {
    title: 'text-neutral-900 dark:text-neutral-100',
    supporting: 'text-neutral-600 dark:text-neutral-400',
    iconText: 'text-neutral-900 dark:text-neutral-900', // Icon inside container
    secondary: {
      bg: 'bg-neutral-50 dark:bg-neutral-800/50',
    },
  },

  // Body width (constrained text area)
  body: {
    width: 'w-[300px] max-w-full',
  },
};

// ============================================================================
// TYPES
// ============================================================================

export type MessageSize = 'sm' | 'md' | 'lg';
export type MessageType = 'primary' | 'secondary';
export type MessageArtwork = 'illustration' | 'icon' | 'image';
export type MessageAlignment = 'centered' | 'stacked';

export interface MessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Main heading text */
  title?: string;
  /** Description/body text */
  supportingText?: string;
  /** Show/hide title */
  showTitle?: boolean;
  /** Show/hide description */
  showSupportingText?: boolean;
  /** Show/hide artwork area */
  showArtwork?: boolean;
  /** Type of artwork to display */
  artwork?: MessageArtwork;
  /** Image URL for illustration/image artwork types */
  artworkSrc?: string;
  /** Custom icon for icon artwork type */
  icon?: ReactNode;
  /** Size variant */
  size?: MessageSize;
  /** Primary (transparent) or Secondary (with background) */
  type?: MessageType;
  /** Content alignment */
  alignment?: MessageAlignment;
}

// ============================================================================
// ICON CONTAINER SUB-COMPONENT
// ============================================================================

interface IconContainerProps {
  size: MessageSize;
  brandPrimary: string;
  children: ReactNode;
}

const IconContainer = ({ size, brandPrimary, children }: IconContainerProps) => {
  const sizeTokens = tokens.artwork[size];

  return (
    <div
      className={cn(
        'flex items-center justify-center shrink-0',
        sizeTokens.iconContainer,
        sizeTokens.iconContainerRadius
      )}
      style={{ backgroundColor: brandPrimary }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// MESSAGE COMPONENT
// ============================================================================

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      className,
      title,
      supportingText,
      showTitle = true,
      showSupportingText = true,
      showArtwork = true,
      artwork = 'illustration',
      artworkSrc,
      icon,
      size = 'lg',
      type = 'primary',
      alignment = 'centered',
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();
    const locale = useLocale();
    const isArabic = locale === 'ar';

    // Determine alignment classes
    const isCentered = alignment === 'centered';
    const containerAlignmentClass = isCentered
      ? 'items-center'
      : isArabic
      ? 'items-end'
      : 'items-start';

    const textAlignmentClass = isCentered
      ? 'items-center text-center'
      : isArabic
      ? 'items-end text-right'
      : 'items-start text-left';

    // Size-based tokens
    const artworkTokens = tokens.artwork[size];
    const titleTypography = tokens.typography.title[size];
    const supportingTypography = tokens.typography.supporting[size];
    const radiusClass = tokens.radius[size];

    // Default placeholder images for demo
    const defaultIllustration = 'https://www.figma.com/api/mcp/asset/db6c1987-b49f-4a82-84a3-ea8fcb99879a';
    const defaultImage = 'https://www.figma.com/api/mcp/asset/43171a7b-c969-47d7-b2d4-deefb5a480f0';

    // Render artwork based on type
    const renderArtwork = () => {
      if (!showArtwork) return null;

      switch (artwork) {
        case 'illustration':
          return (
            <div className={cn('overflow-hidden shrink-0', artworkTokens.illustration)}>
              <img
                src={artworkSrc || defaultIllustration}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          );

        case 'icon':
          return (
            <IconContainer size={size} brandPrimary={brandColors.primary}>
              {icon || (
                <InfoCircle
                  size={artworkTokens.iconSize}
                  variant="Outline"
                  className={tokens.colors.iconText}
                />
              )}
            </IconContainer>
          );

        case 'image':
          return (
            <div className={cn('overflow-hidden shrink-0 rounded-2xl', artworkTokens.image)}>
              <img
                src={artworkSrc || defaultImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col justify-center',
          tokens.container.padding,
          tokens.container.gap,
          containerAlignmentClass,
          // Secondary type has background and radius
          type === 'secondary' && tokens.colors.secondary.bg,
          type === 'secondary' && radiusClass,
          type === 'secondary' && 'overflow-hidden',
          className
        )}
        {...props}
      >
        {/* Artwork */}
        {renderArtwork()}

        {/* Body (Title + Supporting Text) */}
        <div
          className={cn(
            'flex flex-col justify-center shrink-0 leading-[0]',
            tokens.container.textGap,
            tokens.body.width,
            textAlignmentClass
          )}
        >
          {/* Title */}
          {showTitle && title && (
            <h3
              className={cn(
                'w-full whitespace-pre-wrap',
                titleTypography,
                tokens.colors.title
              )}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {title}
            </h3>
          )}

          {/* Supporting Text */}
          {showSupportingText && supportingText && (
            <p
              className={cn(
                'w-full whitespace-pre-wrap',
                supportingTypography,
                tokens.colors.supporting
              )}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              {supportingText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Message.displayName = 'Message';

export default Message;
