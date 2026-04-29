import React, { forwardRef, HTMLAttributes, ReactNode, ComponentType } from 'react';
import { cn } from '../../utils/cn';
import { ArrowDown2 } from 'iconsax-react';

import { Button } from '../button/Button';
import { Separator } from '../data-display/Separator';

// ============================================================================
// DESIGN TOKENS (Figma specs)
// ============================================================================

const tokens = {
  container: {
    gap: 'gap-6',
  },

  iconSize: 20,
};

// ============================================================================
// TYPES
// ============================================================================

type IconComponent = ComponentType<{
  size?: number;
  variant?: 'Linear' | 'Bold' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken';
  className?: string;
}>;

export interface ActionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Left content slot (tabs, navigation, custom content) */
  children?: ReactNode;

  /** Label text for the dropdown button */
  dropdownLabel: string;
  /** Custom icon for dropdown (default: ArrowDown2) */
  dropdownIcon?: IconComponent;
  /** Callback when dropdown button is clicked */
  onDropdownClick?: () => void;

  /** Label text for the action button */
  actionLabel: string;
  /** Icon for the action button (displayed before label) */
  actionIcon?: IconComponent;
  /** Callback when action button is clicked */
  onActionClick?: () => void;

  /** Show bottom separator line */
  showSeparator?: boolean;
}

// ============================================================================
// ACTION HEADER COMPONENT
// ============================================================================

export const ActionHeader = forwardRef<HTMLDivElement, ActionHeaderProps>(
  (
    {
      className,
      children,
      dropdownLabel,
      dropdownIcon: DropdownIcon,
      onDropdownClick,
      actionLabel,
      actionIcon: ActionIcon,
      onActionClick,
      showSeparator = false,
      ...props
    },
    ref
  ) => {
    const DropdownIconComponent = DropdownIcon || ArrowDown2;

    return (
      <div
        ref={ref}
        className={cn('flex flex-col w-full', className)}
        {...props}
      >
        <div
          className={cn(
            'flex items-center justify-between w-full',
            tokens.container.gap
          )}
        >
          <div className="flex items-center flex-1 min-w-0">
            {children}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              onClick={onDropdownClick}
              rightIcon={
                <DropdownIconComponent
                  size={tokens.iconSize}
                  variant="Linear"
                  className="shrink-0"
                />
              }
            >
              {dropdownLabel}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={onActionClick}
              leftIcon={
                ActionIcon && (
                  <ActionIcon
                    size={tokens.iconSize}
                    variant="Linear"
                    className="shrink-0"
                  />
                )
              }
            >
              {actionLabel}
            </Button>
          </div>
        </div>

        {showSeparator && (
          <div className="mt-3">
            <Separator />
          </div>
        )}
      </div>
    );
  }
);

ActionHeader.displayName = 'ActionHeader';

export default ActionHeader;
