import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { TickCircle } from 'iconsax-react';
import { Close } from '../../icons';

// ============================================================================
// DESIGN TOKENS (Based on plan specs)
// ============================================================================

const tokens = {
  // Indicator sizes
  indicator: {
    lg: {
      size: 'w-10 h-10', // 40px
      text: 'text-base font-semibold', // 16px
      iconSize: 20,
    },
    sm: {
      size: 'w-8 h-8', // 32px
      text: 'text-sm font-semibold', // 14px
      iconSize: 16,
    },
  },

  // Connector
  connector: {
    horizontal: {
      lg: 'h-0.5 flex-1 mx-3', // 2px height
      sm: 'h-0.5 flex-1 mx-2', // 2px height
    },
    vertical: {
      lg: 'w-0.5 min-h-[24px] flex-1', // 2px width
      sm: 'w-0.5 min-h-[20px] flex-1', // 2px width
    },
  },

  // Typography
  typography: {
    title: {
      active: 'text-sm font-medium text-neutral-900 dark:text-white',
      pending: 'text-sm font-medium text-neutral-500 dark:text-neutral-400',
      completed: 'text-sm font-medium text-neutral-900 dark:text-white',
      error: 'text-sm font-medium text-red-600 dark:text-red-400',
    },
    description: 'text-xs font-normal text-neutral-400 dark:text-neutral-500',
  },

  // Colors
  colors: {
    indicator: {
      active: 'text-white',
      pending: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400',
      completed: 'text-white',
      error: 'bg-red-500 text-white',
    },
    connector: {
      completed: '',
      pending: 'bg-neutral-200 dark:bg-neutral-700',
    },
  },

  // Spacing
  spacing: {
    horizontal: {
      content: 'mt-2',
      contentGap: 'gap-0.5',
    },
    vertical: {
      content: 'ms-3',
      contentGap: 'gap-0.5',
      step: 'gap-3',
    },
  },

  // Border radius
  radius: 'rounded-full',

  // Transitions
  transition: 'transition-all duration-200',
};

// ============================================================================
// TYPES
// ============================================================================

export interface StepItem {
  /** Step title text */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Mark step as having an error */
  error?: boolean;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /** Array of step items */
  steps: StepItem[];
  /** Current active step index (0-based) */
  activeStep: number;
  /** Stepper orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Indicator size */
  size?: 'sm' | 'lg';
  /** Show step descriptions */
  showDescription?: boolean;
  /** Allow clicking on steps to navigate */
  clickableSteps?: boolean;
  /** Callback when a step is clicked */
  onStepClick?: (index: number) => void;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

type StepState = 'pending' | 'active' | 'completed' | 'error';

const getStepState = (
  index: number,
  activeStep: number,
  error?: boolean
): StepState => {
  if (error) return 'error';
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'pending';
};

// ============================================================================
// STEP INDICATOR COMPONENT
// ============================================================================

interface StepIndicatorProps {
  index: number;
  state: StepState;
  size: 'sm' | 'lg';
  brandPrimary: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  index,
  state,
  size,
  brandPrimary,
}) => {
  const sizeTokens = tokens.indicator[size];

  const renderContent = () => {
    if (state === 'completed') {
      return (
        <TickCircle
          size={sizeTokens.iconSize}
          variant="Bold"
          className="text-white"
        />
      );
    }
    if (state === 'error') {
      return (
        <Close
          size={sizeTokens.iconSize}
          variant="Bold"
          className="text-white"
        />
      );
    }
    return <span className={sizeTokens.text}>{index + 1}</span>;
  };

  const bgStyle =
    state === 'active' || state === 'completed'
      ? { backgroundColor: brandPrimary }
      : {};

  return (
    <div
      className={cn(
        'flex items-center justify-center shrink-0',
        sizeTokens.size,
        tokens.radius,
        tokens.transition,
        tokens.colors.indicator[state]
      )}
      style={bgStyle}
    >
      {renderContent()}
    </div>
  );
};

// ============================================================================
// STEP CONNECTOR COMPONENT
// ============================================================================

interface StepConnectorProps {
  state: StepState;
  orientation: 'horizontal' | 'vertical';
  size: 'sm' | 'lg';
  brandPrimary: string;
}

const StepConnector: React.FC<StepConnectorProps> = ({
  state,
  orientation,
  size,
  brandPrimary,
}) => {
  const isCompleted = state === 'completed';
  const connectorClasses = tokens.connector[orientation][size];

  return (
    <div
      className={cn(
        connectorClasses,
        tokens.transition,
        !isCompleted && tokens.colors.connector.pending
      )}
      style={isCompleted ? { backgroundColor: brandPrimary } : {}}
    />
  );
};

// ============================================================================
// STEP CONTENT COMPONENT
// ============================================================================

interface StepContentProps {
  title: string;
  description?: string;
  state: StepState;
  showDescription: boolean;
  orientation: 'horizontal' | 'vertical';
}

const StepContent: React.FC<StepContentProps> = ({
  title,
  description,
  state,
  showDescription,
  orientation,
}) => {
  const spacingTokens = tokens.spacing[orientation];

  return (
    <div
      className={cn(
        'flex flex-col',
        spacingTokens.contentGap,
        orientation === 'horizontal'
          ? cn(spacingTokens.content, 'text-center')
          : cn(spacingTokens.content, 'text-start')
      )}
    >
      <span className={tokens.typography.title[state]}>{title}</span>
      {showDescription && description && (
        <span className={tokens.typography.description}>{description}</span>
      )}
    </div>
  );
};

// ============================================================================
// HORIZONTAL STEP COMPONENT
// ============================================================================

interface HorizontalStepProps {
  step: StepItem;
  index: number;
  state: StepState;
  size: 'sm' | 'lg';
  showDescription: boolean;
  isLast: boolean;
  brandPrimary: string;
  clickable: boolean;
  onClick?: () => void;
}

const HorizontalStep: React.FC<HorizontalStepProps> = ({
  step,
  index,
  state,
  size,
  showDescription,
  isLast,
  brandPrimary,
  clickable,
  onClick,
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="flex items-center w-full">
        <div
          className={cn(
            'flex items-center justify-center shrink-0',
            clickable && 'cursor-pointer'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role={clickable ? 'button' : undefined}
          tabIndex={clickable ? 0 : undefined}
          aria-current={state === 'active' ? 'step' : undefined}
        >
          <StepIndicator
            index={index}
            state={state}
            size={size}
            brandPrimary={brandPrimary}
          />
        </div>
        {!isLast && (
          <StepConnector
            state={state}
            orientation="horizontal"
            size={size}
            brandPrimary={brandPrimary}
          />
        )}
      </div>
      <div
        className={cn(clickable && 'cursor-pointer')}
        onClick={handleClick}
      >
        <StepContent
          title={step.title}
          description={step.description}
          state={state}
          showDescription={showDescription}
          orientation="horizontal"
        />
      </div>
    </div>
  );
};

// ============================================================================
// VERTICAL STEP COMPONENT
// ============================================================================

interface VerticalStepProps {
  step: StepItem;
  index: number;
  state: StepState;
  size: 'sm' | 'lg';
  showDescription: boolean;
  isLast: boolean;
  brandPrimary: string;
  clickable: boolean;
  onClick?: () => void;
}

const VerticalStep: React.FC<VerticalStepProps> = ({
  step,
  index,
  state,
  size,
  showDescription,
  isLast,
  brandPrimary,
  clickable,
  onClick,
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <div
          className={cn(clickable && 'cursor-pointer')}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role={clickable ? 'button' : undefined}
          tabIndex={clickable ? 0 : undefined}
          aria-current={state === 'active' ? 'step' : undefined}
        >
          <StepIndicator
            index={index}
            state={state}
            size={size}
            brandPrimary={brandPrimary}
          />
        </div>
        {!isLast && (
          <div
            className={cn(
              'w-0.5 flex-1 my-2',
              tokens.transition,
              state === 'completed' ? '' : tokens.colors.connector.pending
            )}
            style={state === 'completed' ? { backgroundColor: brandPrimary } : {}}
          />
        )}
      </div>
      <div
        className={cn(
          'flex-1 pb-6',
          isLast && 'pb-0',
          clickable && 'cursor-pointer'
        )}
        onClick={handleClick}
      >
        <StepContent
          title={step.title}
          description={step.description}
          state={state}
          showDescription={showDescription}
          orientation="vertical"
        />
      </div>
    </div>
  );
};

// ============================================================================
// MAIN STEPPER COMPONENT
// ============================================================================

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      steps,
      activeStep,
      orientation = 'horizontal',
      size = 'lg',
      showDescription = true,
      clickableSteps = false,
      onStepClick,
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();

    const handleStepClick = (index: number) => {
      if (clickableSteps && onStepClick) {
        onStepClick(index);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          orientation === 'horizontal'
            ? 'flex items-start'
            : 'flex flex-col',
          className
        )}
        role="group"
        aria-label="Progress steps"
        {...props}
      >
        {steps.map((step, index) => {
          const state = getStepState(index, activeStep, step.error);
          const isLast = index === steps.length - 1;

          if (orientation === 'horizontal') {
            return (
              <HorizontalStep
                key={index}
                step={step}
                index={index}
                state={state}
                size={size}
                showDescription={showDescription}
                isLast={isLast}
                brandPrimary={brandColors.primary}
                clickable={clickableSteps}
                onClick={() => handleStepClick(index)}
              />
            );
          }

          return (
            <VerticalStep
              key={index}
              step={step}
              index={index}
              state={state}
              size={size}
              showDescription={showDescription}
              isLast={isLast}
              brandPrimary={brandColors.primary}
              clickable={clickableSteps}
              onClick={() => handleStepClick(index)}
            />
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';
