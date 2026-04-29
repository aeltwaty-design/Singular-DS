'use client';

import { forwardRef, HTMLAttributes, ReactNode, createContext, useContext } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useTheme } from '../../providers/SingularProvider';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { Gallery } from 'iconsax-react';

import { grayLight, grayDark } from '../../tokens/primitives/colors';
import { walaplus, walaone, doam } from '../../tokens/brands';

const CardContext = createContext<{ type: CardType }>({ type: 'stacked' });

const cardVariants = cva(
  'relative border transition-all',
  {
    variants: {
      type: {
        stacked: 'flex flex-col rounded-xl overflow-clip',
        horizontal: 'flex gap-4 items-start p-4 rounded-xl',
      },
    },
    defaultVariants: {
      type: 'stacked',
    },
  }
);

export type CardType = 'stacked' | 'horizontal';

export interface CardProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  type?: CardType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, type = 'stacked', children, style, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const tokens = {
      bg: isDark ? gray[900] : '#FFFFFF',
      border: isDark ? gray[800] : '#E2E6EE',
    };

    return (
      <CardContext.Provider value={{ type }}>
        <div
          ref={ref}
          className={cn(cardVariants({ type }), className)}
          style={{
            backgroundColor: tokens.bg,
            borderColor: tokens.border,
            ...style,
          }}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
);

Card.displayName = 'Card';

// ============================================================================
// Card Header
// ============================================================================

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  leading?: ReactNode;
  title?: string;
  description?: string;
  trailing?: ReactNode;
  showLeading?: boolean;
  showTrailing?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, leading, title, description, trailing, showLeading = true, showTrailing = true, children, style, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    if (children) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-4 px-4 py-3 h-[72px]', className)}
          style={style}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-4 px-4 py-3 h-[72px]', className)}
        style={style}
        {...props}
      >
        {showLeading && leading && (
          <div className="shrink-0 flex items-center justify-center">{leading}</div>
        )}
        <div className="flex-1 min-w-0 flex flex-col gap-1 justify-center">
          {title && (
            <p 
              className="text-base font-medium leading-normal truncate m-0"
              style={{ color: isDark ? gray[50] : gray[900] }}
            >
              {title}
            </p>
          )}
          {description && (
            <p 
              className="text-sm leading-normal truncate m-0"
              style={{ color: isDark ? gray[400] : gray[500] }}
            >
              {description}
            </p>
          )}
        </div>
        {showTrailing && trailing && (
          <div className="shrink-0 flex items-center justify-center">{trailing}</div>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================================================
// Card Media
// ============================================================================

export interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  ratio?: '1:1' | '2:1';
  placeholder?: ReactNode;
  tag?: ReactNode;
}

export const CardMedia = forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, src, alt = '', ratio = '2:1', placeholder, tag, style, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;
    const { type } = useContext(CardContext);

    const isHorizontal = type === 'horizontal';
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative shrink-0 flex items-center justify-center overflow-hidden',
          isHorizontal ? 'w-20 h-20 rounded-2xl' : 'w-full',
          !isHorizontal && ratio === '2:1' && 'aspect-[2/1]',
          !isHorizontal && ratio === '1:1' && 'aspect-square',
          className
        )}
        style={{
          backgroundColor: isDark ? gray[800] : gray[100],
          ...style,
        }}
        {...props}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : placeholder ? (
          placeholder
        ) : (
          <Gallery 
            variant="Bulk" 
            size={isHorizontal ? 32 : 48} 
            className="text-neutral-400 dark:text-neutral-500" 
          />
        )}
        {tag}
      </div>
    );
  }
);

CardMedia.displayName = 'CardMedia';

// ============================================================================
// Card Tag
// ============================================================================

export interface CardTagProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon?: ReactNode;
  position?: 'top-left' | 'top-right';
}

export const CardTag = forwardRef<HTMLDivElement, CardTagProps>(
  ({ className, children, icon, position = 'top-right', style, ...props }, ref) => {
    const { brand } = useBrand();
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const brandConfig = brand === 'walaone' ? walaone : brand === 'doam' ? doam : walaplus;
    const primaryColor = brandConfig.colors.primary;

    const bgColor = isDark ? `${primaryColor}20` : `${primaryColor}15`;
    const textColor = primaryColor;

    return (
      <div
        ref={ref}
        className={cn(
          'absolute flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium z-10 top-4',
          position === 'top-left' ? 'left-4' : 'right-4',
          className
        )}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          ...style,
        }}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </div>
    );
  }
);

CardTag.displayName = 'CardTag';

// ============================================================================
// Card Headline
// ============================================================================

export interface CardHeadlineProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const CardHeadline = forwardRef<HTMLDivElement, CardHeadlineProps>(
  ({ className, title, subtitle, children, style, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;
    const { type } = useContext(CardContext);

    if (children) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex flex-col gap-1',
            type === 'stacked' ? 'p-4' : 'flex-1 min-w-0 justify-center',
            className
          )}
          style={style}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-1',
          type === 'stacked' ? 'p-4' : 'flex-1 min-w-0 justify-center',
          className
        )}
        style={style}
        {...props}
      >
        {title && (
          <p 
            className={cn(
              'font-medium leading-normal',
              type === 'stacked' ? 'text-base' : 'text-sm'
            )}
            style={{ color: isDark ? gray[50] : gray[900] }}
          >
            {title}
          </p>
        )}
        {subtitle && (
          <p 
            className={cn(
              'leading-normal',
              type === 'stacked' ? 'text-sm' : 'text-xs'
            )}
            style={{ color: isDark ? gray[400] : gray[500] }}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

CardHeadline.displayName = 'CardHeadline';

// ============================================================================
// Card Title
// ============================================================================

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, style, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    return (
      <h3
        ref={ref}
        className={cn('text-base font-medium leading-normal', className)}
        style={{
          color: isDark ? gray[50] : gray[900],
          ...style,
        }}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ============================================================================
// Card Description
// ============================================================================

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, style, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    return (
      <p
        ref={ref}
        className={cn('text-sm leading-normal', className)}
        style={{
          color: isDark ? gray[400] : gray[500],
          ...style,
        }}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

// ============================================================================
// Card Supporting Text
// ============================================================================

export interface CardSupportingTextProps extends HTMLAttributes<HTMLDivElement> {}

export const CardSupportingText = forwardRef<HTMLDivElement, CardSupportingTextProps>(
  ({ className, children, style, ...props }, ref) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    return (
      <div
        ref={ref}
        className={cn('px-4 pb-4', className)}
        style={style}
        {...props}
      >
        <p 
          className="text-sm leading-relaxed"
          style={{ color: isDark ? gray[400] : gray[500] }}
        >
          {children}
        </p>
      </div>
    );
  }
);

CardSupportingText.displayName = 'CardSupportingText';

// ============================================================================
// Card Content
// ============================================================================

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn('px-4 pb-4', className)} 
        {...props} 
      />
    );
  }
);

CardContent.displayName = 'CardContent';

// ============================================================================
// Card Actions
// ============================================================================

export interface CardActionsProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end' | 'center' | 'between';
}

export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ className, align = 'start', ...props }, ref) => {
    const alignClasses = {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 px-4 py-4',
          alignClasses[align],
          className
        )}
        {...props}
      />
    );
  }
);

CardActions.displayName = 'CardActions';

// ============================================================================
// Card Footer
// ============================================================================

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 px-4 py-4', className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

// ============================================================================
// Card Link
// ============================================================================

export interface CardLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(
  ({ className, href, children, style, ...props }, ref) => {
    const { brand } = useBrand();

    const brandConfig = brand === 'walaone' ? walaone : brand === 'doam' ? doam : walaplus;
    const primaryColor = brandConfig.colors.primary;

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'text-xs font-semibold underline shrink-0 hover:opacity-80 transition-opacity',
          className
        )}
        style={{
          color: primaryColor,
          ...style,
        }}
        {...props}
      >
        {children}
      </a>
    );
  }
);

CardLink.displayName = 'CardLink';

export default Card;
