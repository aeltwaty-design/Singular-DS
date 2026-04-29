import React, { useEffect, useCallback, forwardRef, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useTheme } from '../../providers/SingularProvider';
import { 
  TickCircle, 
  InfoCircle, 
  Warning2, 
  Danger,
  Add
} from 'iconsax-react';
import { grayLight, grayDark } from '../../tokens/colors';
import { Button } from '../button/Button';
import { IconButton } from '../button/IconButton';

export type BottomSheetStatus = 'success' | 'info' | 'warning' | 'danger';
export type BottomSheetArtwork = 'icon' | 'thumbnail' | 'image';
export type BottomSheetAlignment = 'centered' | 'left' | 'right';

export interface BottomSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  status?: BottomSheetStatus;
  artwork?: BottomSheetArtwork;
  alignment?: BottomSheetAlignment;
  artworkSrc?: string;
  showArtwork?: boolean;
  showActions?: boolean;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showCloseButton?: boolean;
  isRTL?: boolean;
}

interface StatusIllustrationProps {
  status: BottomSheetStatus;
  size?: number;
}

function StatusIllustration({ status, size = 48 }: StatusIllustrationProps) {
  const iconSize = size * 0.5;
  
  const gradients: Record<BottomSheetStatus, string> = {
    success: 'linear-gradient(135deg, #00CE8B 0%, #00B87A 100%)',
    info: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    danger: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
  };

  const icons: Record<BottomSheetStatus, React.ReactNode> = {
    success: <TickCircle size={iconSize} variant="Bold" className="text-white" />,
    info: <InfoCircle size={iconSize} variant="Bold" className="text-white" />,
    warning: <Warning2 size={iconSize} variant="Bold" className="text-white" />,
    danger: <Danger size={iconSize} variant="Bold" className="text-white" />,
  };

  return (
    <div 
      className="relative rounded-full flex items-center justify-center shrink-0"
      style={{ 
        width: size, 
        height: size,
        background: gradients[status]
      }}
    >
      {icons[status]}
    </div>
  );
}

export interface InlineBottomSheetProps extends Omit<BottomSheetProps, 'open' | 'onClose'> {
  onClose?: () => void;
}

export const InlineBottomSheet = forwardRef<HTMLDivElement, InlineBottomSheetProps>(
  (
    {
      title,
      description,
      status = 'success',
      artwork = 'icon',
      alignment = 'centered',
      artworkSrc,
      showArtwork = true,
      showActions = true,
      primaryLabel,
      secondaryLabel,
      onPrimaryClick,
      onSecondaryClick,
      onClose,
      showCloseButton = true,
      isRTL: isRTLProp,
      className,
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const [documentDir, setDocumentDir] = React.useState<string>('ltr');
    React.useEffect(() => {
      if (typeof document !== 'undefined') {
        setDocumentDir(document.documentElement.dir || 'ltr');
      }
    }, []);
    const isRTL = isRTLProp ?? documentDir === 'rtl';

    const isDanger = status === 'danger';
    const defaultPrimaryLabel = isRTL 
      ? (isDanger ? 'حذف' : 'تأكيد')
      : (isDanger ? 'Delete' : 'Confirm');
    const defaultSecondaryLabel = isRTL ? 'إلغاء' : 'Cancel';

    const bgColor = isDark ? gray[900] : '#FFFFFF';
    const textPrimary = isDark ? gray[50] : gray[900];
    const textSecondary = isDark ? gray[400] : gray[600];
    const borderSubtle = isDark ? gray[800] : '#F1F3F9';

    const alignmentClasses = {
      centered: 'items-center text-center',
      left: 'items-start text-left',
      right: 'items-end text-right',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col rounded-t-3xl overflow-hidden w-[375px] max-w-full',
          className
        )}
        style={{
          backgroundColor: bgColor,
          boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
        {...props}
      >
        {showCloseButton && onClose && (
          <div className={cn('absolute top-3 z-10', isRTL ? 'left-4' : 'right-4')}>
            <IconButton
              icon={<Add size={20} className="rotate-45" />}
              label="Close"
              variant="tertiary"
              size="sm"
              onClick={onClose}
            />
          </div>
        )}

        <div className="flex flex-col gap-6 px-4 pt-5 pb-8">
          <div className={cn('flex flex-col gap-4 w-full', alignmentClasses[alignment])}>
            {showArtwork && artwork === 'icon' && (
              <StatusIllustration status={status} size={48} />
            )}

            <div className={cn('flex flex-col gap-2 w-full', alignmentClasses[alignment])}>
              <p 
                className="text-lg font-medium leading-[1.5]"
                style={{ color: textPrimary }}
              >
                {title}
              </p>
              {description && (
                <p 
                  className="text-base leading-[1.5]"
                  style={{ color: textSecondary }}
                >
                  {description}
                </p>
              )}
            </div>

            {showArtwork && artwork === 'image' && artworkSrc && (
              <div 
                className="rounded-lg overflow-hidden shrink-0"
                style={{ width: 72, height: 72 }}
              >
                <img 
                  src={artworkSrc} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {showArtwork && artwork === 'thumbnail' && artworkSrc && (
              <div 
                className="rounded-lg overflow-hidden w-full"
                style={{ 
                  height: 218,
                  border: `1px solid ${borderSubtle}`,
                }}
              >
                <img 
                  src={artworkSrc} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {showActions && (
            <div className="flex flex-col gap-3 w-full">
              <Button
                variant="primary"
                size="md"
                fullWidth
                danger={isDanger}
                onClick={onPrimaryClick}
              >
                {primaryLabel || defaultPrimaryLabel}
              </Button>

              <Button
                variant="outline"
                size="md"
                fullWidth
                onClick={onSecondaryClick || onClose}
              >
                {secondaryLabel || defaultSecondaryLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

InlineBottomSheet.displayName = 'InlineBottomSheet';

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      status = 'success',
      artwork = 'icon',
      alignment = 'centered',
      artworkSrc,
      showArtwork = true,
      showActions = true,
      primaryLabel,
      secondaryLabel,
      onPrimaryClick,
      onSecondaryClick,
      showCloseButton = true,
      isRTL: isRTLProp,
      className,
      ...props
    },
    ref
  ) => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const [documentDir, setDocumentDir] = React.useState<string>('ltr');
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      if (typeof document !== 'undefined') {
        setDocumentDir(document.documentElement.dir || 'ltr');
      }
    }, []);

    const isRTL = isRTLProp ?? documentDir === 'rtl';

    const handleEscape = useCallback((e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    }, [onClose]);

    useEffect(() => {
      if (open) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
          document.removeEventListener('keydown', handleEscape);
          document.body.style.overflow = '';
        };
      }
    }, [open, handleEscape]);

    const isDanger = status === 'danger';
    const defaultPrimaryLabel = isRTL 
      ? (isDanger ? 'حذف' : 'تأكيد')
      : (isDanger ? 'Delete' : 'Confirm');
    const defaultSecondaryLabel = isRTL ? 'إلغاء' : 'Cancel';

    const bgColor = isDark ? gray[900] : '#FFFFFF';
    const textPrimary = isDark ? gray[50] : gray[900];
    const textSecondary = isDark ? gray[400] : gray[600];
    const borderSubtle = isDark ? gray[800] : '#F1F3F9';

    const alignmentClasses = {
      centered: 'items-center text-center',
      left: 'items-start text-left',
      right: 'items-end text-right',
    };

    if (!mounted) return null;

    const content = (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              onClick={onClose}
              aria-hidden="true"
            />

            <motion.div
              ref={ref}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed bottom-0 inset-x-0 z-50 flex justify-center',
                className
              )}
              dir={isRTL ? 'rtl' : 'ltr'}
              {...props}
            >
              <div
                className="relative flex flex-col rounded-t-3xl overflow-hidden w-full max-w-[375px]"
                style={{
                  backgroundColor: bgColor,
                  boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="bottom-sheet-title"
              >
                {showCloseButton && (
                  <div className={cn('absolute top-3 z-10', isRTL ? 'left-4' : 'right-4')}>
                    <IconButton
                      icon={<Add size={20} className="rotate-45" />}
                      label="Close"
                      variant="tertiary"
                      size="sm"
                      onClick={onClose}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-6 px-4 pt-5 pb-8">
                  <div className={cn('flex flex-col gap-4 w-full', alignmentClasses[alignment])}>
                    {showArtwork && artwork === 'icon' && (
                      <StatusIllustration status={status} size={48} />
                    )}

                    <div className={cn('flex flex-col gap-2 w-full', alignmentClasses[alignment])}>
                      <p 
                        id="bottom-sheet-title"
                        className="text-lg font-medium leading-[1.5]"
                        style={{ color: textPrimary }}
                      >
                        {title}
                      </p>
                      {description && (
                        <p 
                          className="text-base leading-[1.5]"
                          style={{ color: textSecondary }}
                        >
                          {description}
                        </p>
                      )}
                    </div>

                    {showArtwork && artwork === 'image' && artworkSrc && (
                      <div 
                        className="rounded-lg overflow-hidden shrink-0"
                        style={{ width: 72, height: 72 }}
                      >
                        <img 
                          src={artworkSrc} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {showArtwork && artwork === 'thumbnail' && artworkSrc && (
                      <div 
                        className="rounded-lg overflow-hidden w-full"
                        style={{ 
                          height: 218,
                          border: `1px solid ${borderSubtle}`,
                        }}
                      >
                        <img 
                          src={artworkSrc} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {showActions && (
                    <div className="flex flex-col gap-3 w-full">
                      <Button
                        variant="primary"
                        size="md"
                        fullWidth
                        danger={isDanger}
                        onClick={onPrimaryClick}
                      >
                        {primaryLabel || defaultPrimaryLabel}
                      </Button>

                      <Button
                        variant="outline"
                        size="md"
                        fullWidth
                        onClick={onSecondaryClick || onClose}
                      >
                        {secondaryLabel || defaultSecondaryLabel}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );

    return typeof document !== 'undefined' 
      ? createPortal(content, document.body)
      : null;
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
