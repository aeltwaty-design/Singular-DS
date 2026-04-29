import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { InfoCircle } from 'iconsax-react';
import { cn } from '../../utils/cn';
import { useBrand, useDir } from '../../providers/SingularProvider';

const tokens = {
  container: {
    padding: 'p-4',
    gap: 'gap-4',
    textGap: 'gap-1',
  },
  radius: {
    lg: 'rounded-3xl',
    md: 'rounded-2xl',
    sm: 'rounded-2xl',
  },
  artwork: {
    lg: {
      illustration: 'w-[118px] h-[118px]',
      icon: 'w-[72px] h-[72px]',
      image: 'w-[53.334px] h-[53.334px]',
      iconContainer: 'p-4',
      iconContainerRadius: 'rounded-2xl',
      iconSize: 40,
    },
    md: {
      illustration: 'w-[80px] h-[80px]',
      icon: 'w-[48px] h-[48px]',
      image: 'w-[80px] h-[80px]',
      iconContainer: 'p-3',
      iconContainerRadius: 'rounded-lg',
      iconSize: 24,
    },
    sm: {
      illustration: 'w-[56px] h-[56px]',
      icon: 'w-[40px] h-[40px]',
      image: 'w-[56px] h-[56px]',
      iconContainer: 'p-2.5',
      iconContainerRadius: 'rounded-lg',
      iconSize: 20,
    },
  },
  typography: {
    title: {
      lg: 'text-2xl font-semibold leading-[1.4]',
      md: 'text-xl font-semibold leading-[1.4]',
      sm: 'text-xl font-semibold leading-[1.4]',
    },
    supporting: {
      lg: 'text-base font-normal leading-[1.5]',
      md: 'text-base font-normal leading-[1.5]',
      sm: 'text-sm font-normal leading-[1.5]',
    },
  },
  colors: {
    title: 'text-neutral-900 dark:text-neutral-100',
    supporting: 'text-neutral-600 dark:text-neutral-400',
    iconText: 'text-neutral-900 dark:text-neutral-900',
    secondary: {
      bg: 'bg-neutral-50 dark:bg-neutral-800/50',
    },
  },
  body: {
    width: 'w-[300px] max-w-full',
  },
};

export type MessageSize = 'sm' | 'md' | 'lg';
export type MessageType = 'primary' | 'secondary';
export type MessageArtwork = 'illustration' | 'icon' | 'image';
export type MessageAlignment = 'centered' | 'stacked';

export interface MessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string;
  supportingText?: string;
  showTitle?: boolean;
  showSupportingText?: boolean;
  showArtwork?: boolean;
  artwork?: MessageArtwork;
  artworkSrc?: string;
  icon?: ReactNode;
  size?: MessageSize;
  type?: MessageType;
  alignment?: MessageAlignment;
}

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
    const { isRTL } = useDir();

    const isCentered = alignment === 'centered';
    const containerAlignmentClass = isCentered
      ? 'items-center'
      : isRTL
      ? 'items-end'
      : 'items-start';

    const textAlignmentClass = isCentered
      ? 'items-center text-center'
      : isRTL
      ? 'items-end text-right'
      : 'items-start text-left';

    const artworkTokens = tokens.artwork[size];
    const titleTypography = tokens.typography.title[size];
    const supportingTypography = tokens.typography.supporting[size];
    const radiusClass = tokens.radius[size];

    const defaultIllustration = 'https://www.figma.com/api/mcp/asset/db6c1987-b49f-4a82-84a3-ea8fcb99879a';
    const defaultImage = 'https://www.figma.com/api/mcp/asset/43171a7b-c969-47d7-b2d4-deefb5a480f0';

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
          type === 'secondary' && tokens.colors.secondary.bg,
          type === 'secondary' && radiusClass,
          type === 'secondary' && 'overflow-hidden',
          className
        )}
        {...props}
      >
        {renderArtwork()}

        <div
          className={cn(
            'flex flex-col justify-center shrink-0 leading-[0]',
            tokens.container.textGap,
            tokens.body.width,
            textAlignmentClass
          )}
        >
          {showTitle && title && (
            <h3
              className={cn(
                'w-full whitespace-pre-wrap',
                titleTypography,
                tokens.colors.title
              )}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {title}
            </h3>
          )}

          {showSupportingText && supportingText && (
            <p
              className={cn(
                'w-full whitespace-pre-wrap',
                supportingTypography,
                tokens.colors.supporting
              )}
              dir={isRTL ? 'rtl' : 'ltr'}
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
