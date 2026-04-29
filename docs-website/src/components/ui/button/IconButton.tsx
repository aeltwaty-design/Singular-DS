'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode, useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useBrand } from '@/components/providers/Providers';

// Import design tokens
import { grayLight, grayDark, statusColors } from '@/tokens/primitives/colors';

/**
 * IconButton Component
 * 
 * Matches Button component design specifications using our design tokens:
 * - Types: primary, secondary, tertiary, outline
 * - Sizes: sm (30px), md (41px), lg (48px), xl (59px)
 * - States: default, hover, focused, disabled, loading
 * - Danger mode: normal colors or destructive (error) colors
 */

const iconButtonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center',
    'transition-all duration-200',
    'select-none',
    // Focus state - visible ring
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        tertiary: 'bg-transparent',
        outline: 'bg-transparent border',
      },
      size: {
        sm: 'w-[30px] h-[30px] rounded-lg',
        md: 'w-[41px] h-[41px] rounded-xl',
        lg: 'w-12 h-12 rounded-xl',
        xl: 'w-[59px] h-[59px] rounded-2xl',
      },
      danger: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'tertiary',
      size: 'md',
      danger: false,
    },
  }
);

// Icon size mappings based on button size
const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
};

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** The icon to display */
  icon: ReactNode;
  /** Accessible label for the button */
  label: string;
  /** Show loading spinner and disable the button */
  loading?: boolean;
  /** Use danger/destructive color scheme */
  danger?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'tertiary',
      size = 'md',
      danger = false,
      icon,
      label,
      loading,
      disabled,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const isDisabled = disabled;
    const isLoading = loading;
    const isInteractive = !disabled && !loading;
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Handle hydration mismatch - useTheme returns undefined on server
    useEffect(() => {
      setMounted(true);
    }, []);

    // Determine if dark mode is active (default to light mode on server)
    const isDark = mounted && resolvedTheme === 'dark';

    // Select gray palette based on theme
    const gray = isDark ? grayDark : grayLight;

    // Get brand primary colors from token system
    const brandPrimary = currentBrand?.primary || {
      25: '#E6FBF4',
      50: '#CCF7E9',
      100: '#99EFCC',
      200: '#66E7B8',
      300: '#33DEA3',
      400: '#1AD997',
      500: '#00CE8B',
      600: '#00B87D',
      700: '#009B69',
      800: '#007D55',
      900: '#005F41',
      950: '#003D2A',
    };

    // ==========================================================================
    // DANGER BUTTON COLORS - Using statusColors.error from design tokens
    // ==========================================================================
    const dangerColors = {
      light: {
        bgSolid: statusColors.error[600],
        bgSolidHover: statusColors.error[700],
        textOnSolid: '#FFFFFF',
        bgLight: statusColors.error[50],
        bgLightHover: statusColors.error[100],
        textDefault: statusColors.error[600],
        textHover: statusColors.error[700],
        border: statusColors.error[500],
      },
      dark: {
        bgSolid: statusColors.error[600],
        bgSolidHover: statusColors.error[500],
        textOnSolid: '#FFFFFF',
        bgLight: statusColors.error[950],
        bgLightHover: statusColors.error[800],
        textDefault: statusColors.error[400],
        textHover: statusColors.error[300],
        border: statusColors.error[400],
      },
    };
    
    const danger_palette = isDark ? dangerColors.dark : dangerColors.light;

    // Token mappings using our semantic design token values
    const tokens = {
      bg: {
        brandSolid: isDark ? brandPrimary[600] : brandPrimary[500],
        brandSolidHover: isDark ? brandPrimary[500] : brandPrimary[700],
        brandPrimary: isDark ? `${brandPrimary[500]}20` : brandPrimary[50],
        brandSecondary: isDark ? `${brandPrimary[500]}30` : brandPrimary[100],
        disabled: isDark ? gray[800] : gray[100],
        primaryHover: isDark ? gray[800] : gray[50],
        dangerSolid: danger_palette.bgSolid,
        dangerSolidHover: danger_palette.bgSolidHover,
        dangerLight: danger_palette.bgLight,
        dangerLightHover: danger_palette.bgLightHover,
      },
      text: {
        primary: isDark ? gray[50] : gray[900],
        brandSecondary: isDark ? gray[300] : brandPrimary[700],
        brandTertiary: isDark ? gray[400] : brandPrimary[600],
        disabled: gray[500],
        dangerOnSolid: danger_palette.textOnSolid,
        dangerDefault: danger_palette.textDefault,
        dangerHover: danger_palette.textHover,
        white: '#FFFFFF',
        primaryOnBrand: isDark ? gray[50] : '#FFFFFF',
      },
      border: {
        primary: isDark ? gray[700] : gray[300],
        primaryHover: isDark ? gray[600] : gray[400],
        danger: danger_palette.border,
        disabled: isDark ? gray[700] : gray[300],
      },
      ring: {
        brand: isDark ? brandPrimary[400] : brandPrimary[500],
        danger: danger_palette.bgSolid,
      },
    };

    // Calculate styles based on variant, danger, hover, focus, and disabled state
    const getStyles = (): React.CSSProperties => {
      const styles: React.CSSProperties = {};

      // DISABLED STATE
      if (isDisabled) {
        styles.backgroundColor = tokens.bg.disabled;
        styles.color = tokens.text.disabled;
        styles.cursor = 'not-allowed';
        if (variant === 'outline') {
          styles.borderColor = tokens.border.disabled;
        }
        return styles;
      }

      // LOADING STATE - preserve variant colors but disable interaction
      if (isLoading) {
        styles.cursor = 'wait';
        styles.opacity = 0.8;
      }

      // Set focus ring color
      const ringColor = danger ? tokens.ring.danger : tokens.ring.brand;
      styles['--tw-ring-color' as string] = ringColor;

      // FOCUSED STATE
      if (isFocused) {
        const focusBgColor = isDark ? grayDark[950] : 'white';
        styles.boxShadow = `0 0 0 2px ${focusBgColor}, 0 0 0 4px ${ringColor}`;
      }

      // DEFAULT, HOVER, & FOCUS STATES by variant
      switch (variant) {
        case 'primary':
          if (danger) {
            styles.backgroundColor = isHovered ? tokens.bg.dangerSolidHover : tokens.bg.dangerSolid;
            styles.color = tokens.text.dangerOnSolid;
          } else {
            styles.backgroundColor = isHovered ? tokens.bg.brandSolidHover : tokens.bg.brandSolid;
            // Use text-primary for all brands in both light and dark mode
            styles.color = tokens.text.primary;
          }
          break;

        case 'secondary':
          if (danger) {
            styles.backgroundColor = isHovered ? tokens.bg.dangerLightHover : tokens.bg.dangerLight;
            styles.color = isHovered ? tokens.text.dangerHover : tokens.text.dangerDefault;
          } else {
            styles.backgroundColor = isHovered ? tokens.bg.brandSecondary : tokens.bg.brandPrimary;
            styles.color = tokens.text.brandSecondary;
          }
          break;

        case 'tertiary':
          if (danger) {
            styles.backgroundColor = isHovered ? tokens.bg.dangerLight : 'transparent';
            styles.color = isHovered ? tokens.text.dangerHover : tokens.text.dangerDefault;
          } else {
            styles.backgroundColor = isHovered ? tokens.bg.primaryHover : 'transparent';
            styles.color = tokens.text.primary;
          }
          break;

        case 'outline':
          if (danger) {
            styles.backgroundColor = isHovered ? tokens.bg.dangerLight : 'transparent';
            styles.borderColor = tokens.border.danger;
            styles.color = isHovered ? tokens.text.dangerHover : tokens.text.dangerDefault;
          } else {
            styles.backgroundColor = isHovered ? tokens.bg.primaryHover : 'transparent';
            styles.borderColor = isHovered ? tokens.border.primaryHover : tokens.border.primary;
            styles.color = tokens.text.primary;
          }
          break;
      }

      return styles;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isInteractive) setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    const handleFocus = () => {
      if (isInteractive) setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const iconSize = iconSizes[size || 'md'];

    return (
      <button
        ref={ref}
        className={cn(
          iconButtonVariants({ variant, size, danger }),
          className
        )}
        style={{ ...getStyles(), ...style }}
        disabled={isDisabled || isLoading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={label}
        title={label}
        {...props}
      >
        {loading ? (
          <Loader2 className={cn(iconSize, 'animate-spin')} />
        ) : (
          <span className={cn(iconSize, 'inline-flex items-center justify-center')}>{icon}</span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
