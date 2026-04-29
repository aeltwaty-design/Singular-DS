import React, { forwardRef, HTMLAttributes, ReactNode, ComponentType } from 'react';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { ArrowRight2, ArrowLeft2, Add } from 'iconsax-react';

// ============================================================================
// DESIGN TOKENS (Figma specs)
// ============================================================================

const tokens = {
  defaultWidth: 'w-full',
  collapsedHeight: 'h-[44px]',
  expandedHeaderHeight: 'h-[44px]',
  
  padding: {
    horizontal: 'px-4',
  },
  iconSize: 20,
  
  typography: {
    collapsedTitle: 'text-lg font-medium leading-[1.5]',
    expandedTitle: 'text-[32px] font-semibold leading-[1.3]',
    hyperlink: 'text-xs font-medium underline leading-[1.5]',
    cta: 'text-xs font-medium leading-[1.5]',
  },
  
  colors: {
    text: 'text-neutral-900 dark:text-white',
    textSecondary: 'text-neutral-600 dark:text-neutral-400',
    icon: 'text-neutral-700 dark:text-neutral-300',
    separator: 'border-neutral-100 dark:border-neutral-800',
    ctaBg: 'bg-neutral-100 dark:bg-neutral-800',
    ctaHover: 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
  },
  
  focus: {
    ring: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  },
};

// ============================================================================
// TYPES
// ============================================================================

type IconComponent = ComponentType<{ size?: number; variant?: 'Linear' | 'Bold' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken'; className?: string }>;

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
  /** Title text displayed in the app bar */
  title: string;
  /** Type variant - collapsed shows centered title, expanded shows large title below */
  type?: 'collapsed' | 'expanded';
  /** Leading action type or custom ReactNode */
  leading?: 'back' | 'close' | ReactNode;
  /** Trailing action type or custom ReactNode */
  trailing?: 'hyperlink' | 'cta' | 'icon' | 'two-icons' | ReactNode;
  /** Label text for hyperlink or CTA trailing */
  trailingLabel?: string;
  /** Icon component for single icon trailing */
  trailingIcon?: IconComponent;
  /** Two icon components for two-icons trailing */
  trailingIcons?: [IconComponent, IconComponent];
  /** Callback when leading action is pressed */
  onLeadingPress?: () => void;
  /** Callback when trailing action is pressed (hyperlink, cta, icon) */
  onTrailingPress?: () => void;
  /** Callbacks for two-icons trailing */
  onTrailingIconPress?: [() => void, () => void];
  /** Show bottom separator line */
  showSeparator?: boolean;
}

// ============================================================================
// LEADING COMPONENT
// ============================================================================

interface LeadingProps {
  leading: AppBarProps['leading'];
  onPress?: () => void;
  isRTL: boolean;
  brandPrimary: string;
}

const Leading = ({ leading, onPress, isRTL, brandPrimary }: LeadingProps) => {
  if (!leading) return null;

  if (typeof leading !== 'string') {
    return <div className="flex items-center">{leading}</div>;
  }

  if (leading === 'back') {
    const ArrowIcon = isRTL ? ArrowRight2 : ArrowLeft2;
    return (
      <button
        onClick={onPress}
        className={cn(
          'flex items-center justify-center shrink-0',
          'w-5 h-5',
          tokens.colors.icon,
          'hover:opacity-80 transition-opacity',
          tokens.focus.ring
        )}
        style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
        aria-label="Go back"
      >
        <ArrowIcon size={tokens.iconSize} variant="Linear" />
      </button>
    );
  }

  return (
    <button
      onClick={onPress}
      className={cn(
        'flex items-center justify-center shrink-0',
        'w-5 h-5',
        tokens.colors.icon,
        'hover:opacity-80 transition-opacity',
        tokens.focus.ring
      )}
      style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
      aria-label="Close"
    >
      <Add size={tokens.iconSize} variant="Linear" className="rotate-45" />
    </button>
  );
};

// ============================================================================
// TRAILING COMPONENT
// ============================================================================

interface TrailingProps {
  trailing: AppBarProps['trailing'];
  trailingLabel?: string;
  trailingIcon?: IconComponent;
  trailingIcons?: [IconComponent, IconComponent];
  onPress?: () => void;
  onIconPress?: [() => void, () => void];
  brandPrimary: string;
}

const Trailing = ({
  trailing,
  trailingLabel = 'Action',
  trailingIcon,
  trailingIcons,
  onPress,
  onIconPress,
  brandPrimary,
}: TrailingProps) => {
  if (!trailing) return null;

  if (typeof trailing !== 'string') {
    return <div className="flex items-center">{trailing}</div>;
  }

  if (trailing === 'hyperlink') {
    return (
      <button
        onClick={onPress}
        className={cn(
          tokens.typography.hyperlink,
          'underline transition-opacity hover:opacity-80',
          tokens.focus.ring
        )}
        style={{ 
          color: brandPrimary,
          ['--tw-ring-color' as string]: `${brandPrimary}33` 
        }}
      >
        {trailingLabel}
      </button>
    );
  }

  if (trailing === 'cta') {
    return (
      <button
        onClick={onPress}
        className={cn(
          tokens.typography.cta,
          'px-2 py-1.5 rounded-lg',
          tokens.colors.text,
          tokens.colors.ctaBg,
          tokens.colors.ctaHover,
          'transition-colors',
          tokens.focus.ring
        )}
        style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
      >
        {trailingLabel}
      </button>
    );
  }

  if (trailing === 'icon') {
    const Icon = trailingIcon || Add;
    return (
      <button
        onClick={onPress}
        className={cn(
          'flex items-center justify-center shrink-0',
          'w-5 h-5',
          tokens.colors.icon,
          'hover:opacity-80 transition-opacity',
          tokens.focus.ring
        )}
        style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
        aria-label="Action"
      >
        <Icon size={tokens.iconSize} variant="Linear" />
      </button>
    );
  }

  if (trailing === 'two-icons') {
    const [Icon1, Icon2] = trailingIcons || [Add, Add];
    const [onPress1, onPress2] = onIconPress || [undefined, undefined];
    
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={onPress1}
          className={cn(
            'flex items-center justify-center shrink-0',
            'w-5 h-5',
            tokens.colors.icon,
            'hover:opacity-80 transition-opacity',
            tokens.focus.ring
          )}
          style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
          aria-label="Action 1"
        >
          <Icon1 size={tokens.iconSize} variant="Linear" />
        </button>
        <button
          onClick={onPress2}
          className={cn(
            'flex items-center justify-center shrink-0',
            'w-5 h-5',
            tokens.colors.icon,
            'hover:opacity-80 transition-opacity',
            tokens.focus.ring
          )}
          style={{ ['--tw-ring-color' as string]: `${brandPrimary}33` }}
          aria-label="Action 2"
        >
          <Icon2 size={tokens.iconSize} variant="Linear" />
        </button>
      </div>
    );
  }

  return null;
};

// ============================================================================
// SEPARATOR COMPONENT
// ============================================================================

const Separator = () => (
  <div className={cn('w-full h-px', 'bg-neutral-100 dark:bg-neutral-800')} />
);

// ============================================================================
// APP BAR COMPONENT
// ============================================================================

export const AppBar = forwardRef<HTMLElement, AppBarProps>(
  (
    {
      className,
      title,
      type = 'collapsed',
      leading = 'back',
      trailing,
      trailingLabel,
      trailingIcon,
      trailingIcons,
      onLeadingPress,
      onTrailingPress,
      onTrailingIconPress,
      showSeparator = true,
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();

    const [isRTL, setIsRTL] = React.useState(false);
    React.useEffect(() => {
      setIsRTL(document.documentElement.dir === 'rtl');
    }, []);

    if (type === 'collapsed') {
      return (
        <header
          ref={ref}
          className={cn('flex flex-col', tokens.defaultWidth, className)}
          {...props}
        >
          <div
            className={cn(
              'grid grid-cols-[auto_1fr_auto] items-center',
              tokens.collapsedHeight,
              tokens.padding.horizontal
            )}
          >
            <div className="flex items-center justify-start min-w-[20px]">
              <Leading
                leading={leading}
                onPress={onLeadingPress}
                isRTL={isRTL}
                brandPrimary={brandColors.primary}
              />
            </div>

            <div className="flex items-center justify-center px-3">
              <h1
                className={cn(
                  tokens.typography.collapsedTitle,
                  tokens.colors.text,
                  'whitespace-nowrap truncate'
                )}
              >
                {title}
              </h1>
            </div>

            <div className="flex items-center justify-end min-w-[20px]">
              <Trailing
                trailing={trailing}
                trailingLabel={trailingLabel}
                trailingIcon={trailingIcon}
                trailingIcons={trailingIcons}
                onPress={onTrailingPress}
                onIconPress={onTrailingIconPress}
                brandPrimary={brandColors.primary}
              />
            </div>
          </div>

          {showSeparator && <Separator />}
        </header>
      );
    }

    return (
      <header
        ref={ref}
        className={cn('flex flex-col', tokens.defaultWidth, className)}
        {...props}
      >
        <div
          className={cn(
            'relative flex items-center justify-between',
            tokens.expandedHeaderHeight,
            tokens.padding.horizontal
          )}
        >
          <Leading
            leading={leading}
            onPress={onLeadingPress}
            isRTL={isRTL}
            brandPrimary={brandColors.primary}
          />

          <Trailing
            trailing={trailing}
            trailingLabel={trailingLabel}
            trailingIcon={trailingIcon}
            trailingIcons={trailingIcons}
            onPress={onTrailingPress}
            onIconPress={onTrailingIconPress}
            brandPrimary={brandColors.primary}
          />
        </div>

        {showSeparator && <Separator />}

        <div className={cn('pt-2 pb-4', tokens.padding.horizontal)}>
          <h1
            className={cn(
              tokens.typography.expandedTitle,
              tokens.colors.text,
              'text-start'
            )}
          >
            {title}
          </h1>
        </div>
      </header>
    );
  }
);

AppBar.displayName = 'AppBar';

export default AppBar;
