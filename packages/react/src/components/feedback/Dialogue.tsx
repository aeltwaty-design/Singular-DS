import { useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { 
  TickCircle, 
  InfoCircle, 
  Warning2, 
  Danger
} from 'iconsax-react';
import { Close } from '../../icons';
import { Button } from '../button/Button';
import { IconButton } from '../button/IconButton';

export type DialogueType = 'icon' | 'media';
export type DialogueStatus = 'basic' | 'success' | 'info' | 'warning' | 'danger';
export type DialogueAlignment = 'centered' | 'stacked';
export type DialogueBreakpoint = 'desktop' | 'mobile';

export interface DialogueProps {
  type?: DialogueType;
  status?: DialogueStatus;
  alignment?: DialogueAlignment;
  breakpoint?: DialogueBreakpoint;
  open?: boolean;
  title: string;
  description?: string;
  mediaSrc?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  showOverlay?: boolean;
  showCloseButton?: boolean;
  hideCancel?: boolean;
  className?: string;
}

interface StatusIllustrationProps {
  status: DialogueStatus;
  size?: number;
}

function StatusIllustration({ status, size = 48 }: StatusIllustrationProps) {
  const iconSize = size * 0.5;
  
  switch (status) {
    case 'success':
      return (
        <div 
          className="relative rounded-full flex items-center justify-center"
          style={{ 
            width: size, 
            height: size,
            background: 'linear-gradient(135deg, #00CE8B 0%, #00B87A 100%)'
          }}
        >
          <TickCircle size={iconSize} variant="Bold" className="text-white" />
        </div>
      );
    case 'info':
      return (
        <div 
          className="relative rounded-full flex items-center justify-center"
          style={{ 
            width: size, 
            height: size,
            background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
          }}
        >
          <InfoCircle size={iconSize} variant="Bold" className="text-white" />
        </div>
      );
    case 'warning':
      return (
        <div 
          className="relative rounded-full flex items-center justify-center"
          style={{ 
            width: size, 
            height: size,
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
          }}
        >
          <Warning2 size={iconSize} variant="Bold" className="text-white" />
        </div>
      );
    case 'danger':
      return (
        <div 
          className="relative rounded-full flex items-center justify-center"
          style={{ 
            width: size, 
            height: size,
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
          }}
        >
          <Danger size={iconSize} variant="Bold" className="text-white" />
        </div>
      );
    default:
      return null;
  }
}

interface DialogueOverlayProps {
  onClick?: () => void;
  className?: string;
}

export function DialogueOverlay({ onClick, className }: DialogueOverlayProps) {
  return (
    <div 
      className={cn(
        'fixed inset-0 bg-black/50 backdrop-blur-sm z-40',
        'animate-in fade-in duration-200',
        className
      )}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

interface DialogueContentProps {
  children: React.ReactNode;
  breakpoint?: DialogueBreakpoint;
  className?: string;
}

export function DialogueContent({ children, breakpoint = 'desktop', className }: DialogueContentProps) {
  return (
    <div 
      className={cn(
        'bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden',
        'shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]',
        breakpoint === 'desktop' ? 'w-[400px]' : 'w-[343px]',
        'max-w-[calc(100vw-32px)]',
        'animate-in zoom-in-95 fade-in duration-200',
        className
      )}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}

export function Dialogue({
  type = 'icon',
  status = 'basic',
  alignment = 'centered',
  breakpoint = 'desktop',
  open = true,
  title,
  description,
  mediaSrc,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  onClose,
  showOverlay = true,
  showCloseButton = false,
  hideCancel = false,
  className,
}: DialogueProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  }, [onClose]);
  
  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, handleEscape]);
  
  if (!open) return null;
  
  const isCentered = alignment === 'centered';
  const isDanger = status === 'danger';
  const showIllustration = type === 'icon' && status !== 'basic';
  const showMedia = type === 'media' && mediaSrc;
  
  const mediaWidth = breakpoint === 'desktop' ? 351 : 295;
  const mediaHeight = 218;
  
  return (
    <>
      {showOverlay && <DialogueOverlay onClick={onClose} />}
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <DialogueContent breakpoint={breakpoint} className={cn('pointer-events-auto', className)}>
          <div className="p-6 flex flex-col gap-8">
            {showCloseButton && onClose && (
              <div className="absolute top-4 right-4">
                <IconButton
                  icon={<Close size={20} variant="Linear" />}
                  label="Close"
                  variant="tertiary"
                  size="sm"
                  onClick={onClose}
                />
              </div>
            )}
            
            <div className={cn(
              'flex flex-col gap-4',
              isCentered ? 'items-center text-center' : 'items-start text-start'
            )}>
              {showIllustration && <StatusIllustration status={status} />}
              
              {showMedia && (
                <div 
                  className="rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800"
                  style={{ width: mediaWidth, height: mediaHeight }}
                >
                  <img 
                    src={mediaSrc} 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className={cn(
                'flex flex-col gap-2 w-full',
                isCentered ? 'items-center' : 'items-start'
              )}>
                <h3 className="text-lg font-medium leading-[1.5] text-neutral-900 dark:text-white">
                  {title}
                </h3>
                {description && (
                  <p className="text-base leading-[1.5] text-neutral-500 dark:text-neutral-400">
                    {description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 w-full">
              {!hideCancel && (
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={onCancel || onClose}
                  className="flex-1"
                >
                  {cancelLabel}
                </Button>
              )}
              <Button
                variant="primary"
                size="md"
                fullWidth
                danger={isDanger}
                onClick={onConfirm}
                className="flex-1"
              >
                {isDanger ? 'Delete' : confirmLabel}
              </Button>
            </div>
          </div>
        </DialogueContent>
      </div>
    </>
  );
}

export interface InlineDialogueProps extends Omit<DialogueProps, 'open' | 'showOverlay' | 'onClose'> {}

export function InlineDialogue(props: InlineDialogueProps) {
  const {
    type = 'icon',
    status = 'basic',
    alignment = 'centered',
    breakpoint = 'desktop',
    title,
    description,
    mediaSrc,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    hideCancel = false,
    className,
  } = props;
  
  const isCentered = alignment === 'centered';
  const isDanger = status === 'danger';
  const showIllustration = type === 'icon' && status !== 'basic';
  const showMedia = type === 'media' && mediaSrc;
  
  const mediaWidth = breakpoint === 'desktop' ? 351 : 295;
  const mediaHeight = 218;
  
  return (
    <div 
      className={cn(
        'bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden',
        'shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]',
        breakpoint === 'desktop' ? 'w-[400px]' : 'w-[343px]',
        'max-w-full',
        className
      )}
    >
      <div className="p-6 flex flex-col gap-8">
        <div className={cn(
          'flex flex-col gap-4',
          isCentered ? 'items-center text-center' : 'items-start text-start'
        )}>
          {showIllustration && <StatusIllustration status={status} />}
          
          {showMedia && (
            <div 
              className="rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-800"
              style={{ width: mediaWidth, height: mediaHeight }}
            >
              <img 
                src={mediaSrc} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className={cn(
            'flex flex-col gap-2 w-full',
            isCentered ? 'items-center' : 'items-start'
          )}>
            <h3 className="text-lg font-medium leading-[1.5] text-neutral-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="text-base leading-[1.5] text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3 w-full">
          {!hideCancel && (
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={onCancel}
              className="flex-1"
            >
              {cancelLabel}
            </Button>
          )}
          <Button
            variant="primary"
            size="md"
            fullWidth
            danger={isDanger}
            onClick={onConfirm}
            className="flex-1"
          >
            {isDanger ? 'Delete' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dialogue;
