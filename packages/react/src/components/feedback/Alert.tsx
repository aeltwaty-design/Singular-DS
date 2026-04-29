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

export type AlertStatus = 'default' | 'danger' | 'warning' | 'success' | 'grey';
export type AlertStyle = 'sharp' | 'rounded';
export type AlertBreakpoint = 'web' | 'mobile';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: AlertStatus;
  style?: AlertStyle;
  breakpoint?: AlertBreakpoint;
  title: string;
  description?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const statusIcons: Record<AlertStatus, typeof InfoCircle> = {
  default: InfoCircle,
  danger: Danger,
  warning: Warning2,
  success: TickCircle,
  grey: InfoCircle,
};

type StatusStyleConfig = { 
  bg: string; 
  border: string; 
  icon: string;
  bgDark: string;
  borderDark: string;
  iconDark: string;
};

const statusStyles: Record<Exclude<AlertStatus, 'default'>, StatusStyleConfig> = {
  danger: {
    bg: 'bg-red-50',
    border: 'border-l-red-500',
    icon: 'text-red-500',
    bgDark: 'dark:bg-red-950/30',
    borderDark: 'dark:border-l-red-400',
    iconDark: 'dark:text-red-400',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-l-amber-500',
    icon: 'text-amber-500',
    bgDark: 'dark:bg-amber-950/30',
    borderDark: 'dark:border-l-amber-400',
    iconDark: 'dark:text-amber-400',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-l-green-500',
    icon: 'text-green-500',
    bgDark: 'dark:bg-green-950/30',
    borderDark: 'dark:border-l-green-400',
    iconDark: 'dark:text-green-400',
  },
  grey: {
    bg: 'bg-neutral-100',
    border: 'border-l-neutral-400',
    icon: 'text-neutral-500',
    bgDark: 'dark:bg-neutral-800/50',
    borderDark: 'dark:border-l-neutral-500',
    iconDark: 'dark:text-neutral-400',
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      status = 'default',
      style = 'rounded',
      breakpoint = 'web',
      title,
      description,
      showIcon = true,
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
    
    const isWeb = breakpoint === 'web';
    const iconSize = isWeb ? 24 : 18;
    const titleSize = isWeb ? 'text-base' : 'text-sm';
    const descriptionSize = isWeb ? 'text-sm' : 'text-xs';
    const buttonSize = isWeb ? 'md' : 'sm';
    const gap = isWeb ? 'gap-3' : 'gap-2';

    const isDark = mounted && resolvedTheme === 'dark';
    
    const brandBgLight = `color-mix(in srgb, ${brandColors.primary} 10%, white)`;
    const brandBgDark = `color-mix(in srgb, ${brandColors.primary} 15%, #171717)`;
    const brandBg = isDark ? brandBgDark : brandBgLight;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex items-center border-l-4 p-4',
          gap,
          !isDefaultStatus && styles?.bg,
          !isDefaultStatus && styles?.bgDark,
          !isDefaultStatus && styles?.border,
          !isDefaultStatus && styles?.borderDark,
          style === 'rounded' ? 'rounded-xl' : 'rounded-none',
          className
        )}
        style={isDefaultStatus ? {
          backgroundColor: brandBg,
          borderLeftColor: brandColors.primary,
        } : undefined}
        {...props}
      >
        {showIcon && (
          <div className="flex-shrink-0">
            {icon || (
              <StatusIcon 
                size={iconSize} 
                variant="Bold"
                className={!isDefaultStatus ? cn(styles?.icon, styles?.iconDark) : undefined}
                style={isDefaultStatus ? { color: brandColors.primary } : undefined}
              />
            )}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h5 className={cn(
            'font-medium leading-[1.5] text-neutral-900 dark:text-white',
            titleSize
          )}>
            {title}
          </h5>
          {description && (
            <p className={cn(
              'mt-1 leading-[1.5] text-neutral-600 dark:text-neutral-400',
              descriptionSize
            )}>
              {description}
            </p>
          )}
        </div>

        {actionLabel && onAction && (
          <Button
            variant="outline"
            size={buttonSize}
            onClick={onAction}
            className="flex-shrink-0"
          >
            {actionLabel}
          </Button>
        )}

        {dismissible && (
          <IconButton
            icon={<Close size={isWeb ? 20 : 16} variant="Linear" />}
            label="Dismiss"
            variant="tertiary"
            size={buttonSize}
            onClick={onDismiss}
            className="flex-shrink-0"
          />
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;
