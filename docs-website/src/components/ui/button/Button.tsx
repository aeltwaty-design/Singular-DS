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
 * Button Component
 * 
 * Matches Figma design specifications using our design tokens:
 * - Types: primary, secondary, tertiary, outline
 * - Sizes: sm (30px), md (41px), lg (48px), xl (59px)
 * - States: default, hover, focused, disabled
 * - Danger mode: normal colors or destructive (error) colors
 */

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium',
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
        sm: 'h-[30px] px-3 py-1.5 text-xs rounded-lg gap-1.5',
        md: 'h-[41px] px-4 py-2 text-sm rounded-xl gap-2',
        lg: 'h-12 px-5 py-2.5 text-sm rounded-xl gap-2',
        xl: 'h-[59px] px-6 py-3 text-base rounded-2xl gap-2.5',
      },
      danger: {
        true: '',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      danger: false,
      fullWidth: false,
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

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Icon to display before the button text */
  leftIcon?: ReactNode;
  /** Icon to display after the button text */
  rightIcon?: ReactNode;
  /** Show loading spinner and disable the button */
  loading?: boolean;
  /** Use danger/destructive color scheme */
  danger?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth,
      danger = false,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const { currentBrand, brand } = useBrand();
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
    // Aligned with semantic tokens: bg-error-solid, text-error-primary, border-error
    // ==========================================================================
    const dangerColors = {
      // Light mode colors (per semantic tokens)
      light: {
        // Primary Danger: bg-error-solid (error-600), bg-error-solid_hover (error-700)
        bgSolid: statusColors.error[600],      // #D92D20
        bgSolidHover: statusColors.error[700], // #B42318
        textOnSolid: '#FFFFFF',                // text-white
        // Secondary/Tertiary/Outline: bg-error-primary (error-50), bg-error-secondary (error-100)
        bgLight: statusColors.error[50],       // #FEF3F2
        bgLightHover: statusColors.error[100], // #FEE4E2
        // text-error-primary (error-600)
        textDefault: statusColors.error[600],  // #D92D20
        textHover: statusColors.error[700],    // #B42318
        // border-error (error-500)
        border: statusColors.error[500],       // #F04438
      },
      // Dark mode colors (per semantic tokens)
      dark: {
        // Primary Danger: bg-error-solid (error-600), bg-error-solid_hover (error-500)
        bgSolid: statusColors.error[600],      // #D92D20
        bgSolidHover: statusColors.error[500], // #F04438
        textOnSolid: '#FFFFFF',
        // Secondary/Tertiary/Outline: bg-error-primary (error-950), bg-error-secondary (error-800)
        bgLight: statusColors.error[950],      // #55160C
        bgLightHover: statusColors.error[800], // #912018
        // text-error-primary dark (error-400)
        textDefault: statusColors.error[400],  // #F97066
        textHover: statusColors.error[300],    // #FDA29B
        // border-error dark (error-400)
        border: statusColors.error[400],       // #F97066
      },
    };
    
    // Select danger palette based on theme
    const danger_palette = isDark ? dangerColors.dark : dangerColors.light;

    // Token mappings using our semantic design token values
    // All tokens are theme-aware (light vs dark mode) per src/tokens/semantic/
    const tokens = {
      // Background tokens (from src/tokens/semantic/background.ts)
      bg: {
        // bg-brand-solid -> primary-500 (light) / primary-600 (dark)
        brandSolid: isDark ? brandPrimary[600] : brandPrimary[500],
        // bg-brand-solid_hover -> primary-700 (light) / primary-500 (dark)
        brandSolidHover: isDark ? brandPrimary[500] : brandPrimary[700],
        // bg-brand-primary -> primary-50 (light) / primary-950 with opacity (dark)
        // For secondary button: light tint in light mode, dark tint in dark mode
        brandPrimary: isDark ? `${brandPrimary[500]}20` : brandPrimary[50],
        // bg-brand-secondary -> primary-100 (light) / primary-500 with more opacity (dark)
        brandSecondary: isDark ? `${brandPrimary[500]}30` : brandPrimary[100],
        // bg-disabled -> gray-100 (light) / gray-800 (dark)
        disabled: isDark ? gray[800] : gray[100],
        // bg-primary_hover -> gray-50 (light) / gray-800 (dark)
        primaryHover: isDark ? gray[800] : gray[50],
        // Danger button backgrounds (from Figma)
        dangerSolid: danger_palette.bgSolid,
        dangerSolidHover: danger_palette.bgSolidHover,
        dangerLight: danger_palette.bgLight,
        dangerLightHover: danger_palette.bgLightHover,
      },
      // Text tokens (from src/tokens/semantic/text.ts)
      text: {
        // text-primary -> gray-900 (light) / gray-50 (dark)
        primary: isDark ? gray[50] : gray[900],
        // text-brand-secondary -> primary-700 (light) / gray-300 (dark) - per semantic token
        brandSecondary: isDark ? gray[300] : brandPrimary[700],
        // text-brand-tertiary -> primary-600 (light) / gray-400 (dark) - per semantic token
        brandTertiary: isDark ? gray[400] : brandPrimary[600],
        // text-disabled -> gray-500 (both modes)
        disabled: gray[500],
        // Danger text colors (from semantic tokens)
        dangerOnSolid: danger_palette.textOnSolid,
        dangerDefault: danger_palette.textDefault,
        dangerHover: danger_palette.textHover,
        // text-white -> always white
        white: '#FFFFFF',
        // text-primary_on-brand -> white (light) / gray-50 (dark) - per semantic token
        // Always use light text on solid brand backgrounds for proper contrast
        primaryOnBrand: isDark ? gray[50] : '#FFFFFF',
      },
      // Border tokens (from src/tokens/semantic/border.ts)
      border: {
        // border-primary -> gray-300 (light) / gray-700 (dark) - per semantic token
        primary: isDark ? gray[700] : gray[300],
        // border hover -> gray-400 (light) / gray-600 (dark)
        primaryHover: isDark ? gray[600] : gray[400],
        // Danger border (from semantic tokens)
        danger: danger_palette.border,
        // border-disabled -> gray-300 (light) / gray-700 (dark)
        disabled: isDark ? gray[700] : gray[300],
      },
      // Focus ring tokens (uses brand primary)
      ring: {
        brand: isDark ? brandPrimary[400] : brandPrimary[500],
        danger: danger_palette.bgSolid,
      },
    };

    // Calculate styles based on variant, danger, hover, focus, and disabled state
    const getStyles = (): React.CSSProperties => {
      const styles: React.CSSProperties = {};

      // DISABLED STATE - applies to all variants (but NOT loading)
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
        styles.opacity = 0.8; // Subtle indication of loading
      }

      // Set focus ring color
      const ringColor = danger ? tokens.ring.danger : tokens.ring.brand;
      styles['--tw-ring-color' as string] = ringColor;

      // FOCUSED STATE - add box shadow for focus ring when focused
      if (isFocused) {
        const focusBgColor = isDark ? grayDark[950] : 'white';
        styles.boxShadow = `0 0 0 2px ${focusBgColor}, 0 0 0 4px ${ringColor}`;
      }

      // DEFAULT, HOVER, & FOCUS STATES by variant
      switch (variant) {
        case 'primary':
          if (danger) {
            // Primary Danger: Solid red background, white text
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
            // Secondary Danger: Light red background, dark red text
            styles.backgroundColor = isHovered ? tokens.bg.dangerLightHover : tokens.bg.dangerLight;
            styles.color = isHovered ? tokens.text.dangerHover : tokens.text.dangerDefault;
          } else {
            styles.backgroundColor = isHovered ? tokens.bg.brandSecondary : tokens.bg.brandPrimary;
            styles.color = tokens.text.brandSecondary;
          }
          break;

        case 'tertiary':
          if (danger) {
            // Tertiary Danger: Transparent bg (light red on hover), dark red text
            styles.backgroundColor = isHovered ? tokens.bg.dangerLight : 'transparent';
            styles.color = isHovered ? tokens.text.dangerHover : tokens.text.dangerDefault;
          } else {
            styles.backgroundColor = isHovered ? tokens.bg.primaryHover : 'transparent';
            styles.color = tokens.text.primary;
          }
          break;

        case 'outline':
          if (danger) {
            // Outline Danger: Light red border, transparent bg (light red on hover), dark red text
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
        suppressHydrationWarning
        className={cn(
          buttonVariants({ variant, size, danger, fullWidth }),
          className
        )}
        style={{ ...getStyles(), ...style }}
        disabled={isDisabled || isLoading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      >
        {loading ? (
          <Loader2 className={cn(iconSize, 'animate-spin')} />
        ) : (
          leftIcon && <span className={cn(iconSize, 'inline-flex items-center justify-center')}>{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && rightIcon && (
          <span className={cn(iconSize, 'inline-flex items-center justify-center')}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
