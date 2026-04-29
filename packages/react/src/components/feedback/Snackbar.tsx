import { forwardRef, HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { 
  InfoCircle, 
  Danger, 
  Warning2, 
  TickCircle
} from 'iconsax-react';
import { cn } from '../../utils/cn';
import { useBrand, useTheme } from '../../providers/SingularProvider';
import { Close } from '../../icons';
import { Button } from '../button/Button';
import { IconButton } from '../button/IconButton';

const tokens = {
  container: {
    padding: 'p-4',
    gap: 'gap-4',
    radius: 'rounded-lg',
  },
  typography: {
    message: 'text-base font-medium leading-[1.5]',
    action: 'text-base font-normal leading-[1.5]',
  },
  icon: {
    size: 24,
  },
  shadow: 'shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]',
  colors: {
    message: 'text-neutral-900 dark:text-neutral-100',
    action: 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200',
    closeButton: 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200',
  },
  transition: 'transition-colors duration-200',
};

export type SnackbarStatus = 'default' | 'gray' | 'success' | 'warning' | 'danger';

export interface SnackbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  message: string;
  status?: SnackbarStatus;
  showLeadingIcon?: boolean;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const statusIcons: Record<SnackbarStatus, typeof InfoCircle> = {
  default: InfoCircle,
  gray: InfoCircle,
  success: TickCircle,
  warning: Warning2,
  danger: Danger,
};

type StatusStyleConfig = {
  bg: string;
  bgDark: string;
  icon: string;
  iconDark: string;
};

const statusStyles: Record<Exclude<SnackbarStatus, 'default'>, StatusStyleConfig> = {
  gray: {
    bg: 'bg-neutral-50',
    bgDark: 'dark:bg-neutral-800',
    icon: 'text-neutral-500',
    iconDark: 'dark:text-neutral-400',
  },
  success: {
    bg: 'bg-green-50',
    bgDark: 'dark:bg-green-950/30',
    icon: 'text-green-500',
    iconDark: 'dark:text-green-400',
  },
  warning: {
    bg: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/30',
    icon: 'text-amber-500',
    iconDark: 'dark:text-amber-400',
  },
  danger: {
    bg: 'bg-red-50',
    bgDark: 'dark:bg-red-950/30',
    icon: 'text-red-500',
    iconDark: 'dark:text-red-400',
  },
};

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      className,
      message,
      status = 'default',
      showLeadingIcon = true,
      icon,
      actionLabel,
      onAction,
      dismissible = false,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const StatusIcon = statusIcons[status];
    const isDefaultStatus = status === 'default';
    const styles = isDefaultStatus ? null : statusStyles[status];

    const isDark = mounted && resolvedTheme === 'dark';

    const brandBgLight = `color-mix(in srgb, ${brandColors.primary} 10%, white)`;
    const brandBgDark = `color-mix(in srgb, ${brandColors.primary} 15%, #262626)`;
    const brandBg = isDark ? brandBgDark : brandBgLight;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex items-center w-full max-w-[382px]',
          tokens.container.padding,
          tokens.container.gap,
          tokens.container.radius,
          tokens.shadow,
          !isDefaultStatus && styles?.bg,
          !isDefaultStatus && styles?.bgDark,
          isDefaultStatus && !mounted && 'bg-white dark:bg-neutral-800',
          className
        )}
        style={isDefaultStatus && mounted ? {
          backgroundColor: brandBg,
        } : isDefaultStatus ? {
          backgroundColor: isDark ? '#262626' : 'white',
        } : undefined}
        {...props}
      >
        {showLeadingIcon && (
          <div className="flex-shrink-0">
            {icon || (
              <StatusIcon
                size={tokens.icon.size}
                variant="Bold"
                className={!isDefaultStatus ? cn(styles?.icon, styles?.iconDark) : undefined}
                style={isDefaultStatus ? { color: brandColors.primary } : undefined}
              />
            )}
          </div>
        )}

        <p
          className={cn(
            'flex-1 min-w-0',
            tokens.typography.message,
            tokens.colors.message
          )}
        >
          {message}
        </p>

        {actionLabel && onAction && (
          <Button
            variant="tertiary"
            size="sm"
            onClick={onAction}
            className="flex-shrink-0"
          >
            {actionLabel}
          </Button>
        )}

        {dismissible && onDismiss && (
          <IconButton
            icon={<Close size={20} variant="Linear" />}
            label="Dismiss"
            variant="tertiary"
            size="sm"
            onClick={onDismiss}
            className="flex-shrink-0"
          />
        )}
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';

export default Snackbar;
