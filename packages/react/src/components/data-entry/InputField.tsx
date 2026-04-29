import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
  useState,
  useEffect,
  useRef,
  useId,
} from 'react';
import { useTheme } from '../../providers/SingularProvider';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';
import { ArrowDown2, Copy, User } from 'iconsax-react';
import { Flag } from '../../icons/Flag';
import { Close } from '../../icons';

import { grayLight, grayDark, statusColors } from '../../tokens/primitives/colors';

/**
 * InputField Component
 *
 * Matches Figma design specifications with:
 * - Types: simple, leadingIcon, leadingDropdown, trailingDropdown, trailingAction, phoneNumber, leadingText, tags, textarea
 * - Sizes: sm (40px), lg (48px)
 * - States: default, fill, focus, disabled
 * - Danger mode: red border and error hint
 */

// =============================================================================
// TYPES
// =============================================================================

export type InputFieldType =
  | 'simple'
  | 'leadingIcon'
  | 'leadingDropdown'
  | 'trailingDropdown'
  | 'trailingAction'
  | 'phoneNumber'
  | 'leadingText'
  | 'tags'
  | 'textarea';

export type InputFieldSize = 'sm' | 'lg';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface Tag {
  id: string;
  label: string;
  avatar?: string;
}

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input field type variant */
  inputType?: InputFieldType;
  /** Size variant */
  size?: InputFieldSize;
  /** Show danger/error styling */
  danger?: boolean;
  /** Label text above the input */
  label?: string;
  /** Hint/helper text below the input */
  hint?: string;
  /** Leading icon (for leadingIcon type) */
  leadingIcon?: ReactNode;
  /** Trailing icon (for simple type) */
  trailingIcon?: ReactNode;
  /** Show trailing icon */
  showTrailingIcon?: boolean;
  /** Leading text (for leadingText type) */
  leadingText?: string;
  /** Leading dropdown options */
  leadingDropdownOptions?: DropdownOption[];
  /** Selected leading dropdown value */
  leadingDropdownValue?: string;
  /** Leading dropdown change handler */
  onLeadingDropdownChange?: (value: string) => void;
  /** Trailing dropdown options */
  trailingDropdownOptions?: DropdownOption[];
  /** Selected trailing dropdown value */
  trailingDropdownValue?: string;
  /** Trailing dropdown change handler */
  onTrailingDropdownChange?: (value: string) => void;
  /** Trailing action label */
  trailingActionLabel?: string;
  /** Trailing action icon */
  trailingActionIcon?: ReactNode;
  /** Trailing action click handler */
  onTrailingAction?: () => void;
  /** Phone country code */
  phoneCountryCode?: string;
  /** Phone country flag (emoji or image) */
  phoneCountryFlag?: ReactNode;
  /** Phone country code change handler */
  onPhoneCountryChange?: (code: string) => void;
  /** Tags for tags type */
  tags?: Tag[];
  /** Tag remove handler */
  onTagRemove?: (tag: Tag) => void;
  /** Textarea rows (for textarea type) */
  rows?: number;
  /** Full width */
  fullWidth?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(
  (
    {
      className,
      inputType = 'simple',
      size = 'lg',
      danger = false,
      disabled = false,
      label,
      hint,
      placeholder,
      leadingIcon,
      trailingIcon,
      showTrailingIcon = true,
      leadingText,
      leadingDropdownOptions = [],
      leadingDropdownValue,
      onLeadingDropdownChange,
      trailingDropdownOptions = [],
      trailingDropdownValue,
      onTrailingDropdownChange,
      trailingActionLabel,
      trailingActionIcon,
      onTrailingAction,
      phoneCountryCode = '+966',
      phoneCountryFlag,
      onPhoneCountryChange,
      tags = [],
      onTagRemove,
      rows = 4,
      fullWidth = true,
      value,
      onChange,
      onFocus,
      onBlur,
      id,
      ...props
    },
    ref
  ) => {
    const { currentBrand } = useBrand();
    const { resolvedTheme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [mounted, setMounted] = useState(false);
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;

    useEffect(() => {
      setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === 'dark';
    const gray = isDark ? grayDark : grayLight;

    const brandPrimary = currentBrand?.primary || {
      400: '#1AD997',
      500: '#00CE8B',
    };

    // ==========================================================================
    // TOKEN-BASED STYLING
    // ==========================================================================
    const tokens = {
      bg: {
        default: isDark ? gray[900] : '#FFFFFF',
        addon: isDark ? gray[800] : gray[100],
        disabled: isDark ? gray[900] : '#FFFFFF',
      },
      border: {
        default: isDark ? gray[700] : gray[300],
        focus: isDark ? brandPrimary[400] : brandPrimary[500],
        danger: isDark ? statusColors.error[400] : statusColors.error[500],
        disabled: isDark ? gray[800] : gray[200],
      },
      text: {
        label: isDark ? gray[50] : gray[900],
        value: isDark ? gray[50] : gray[900],
        placeholder: isDark ? gray[400] : gray[500],
        hint: isDark ? gray[400] : gray[600],
        disabled: isDark ? gray[500] : gray[400],
        danger: isDark ? statusColors.error[400] : statusColors.error[600],
        addon: isDark ? gray[300] : gray[700],
        icon: isDark ? gray[400] : gray[600],
        iconDisabled: isDark ? gray[600] : gray[400],
      },
      ring: {
        focus: isDark ? brandPrimary[400] : brandPrimary[500],
      },
    };

    // ==========================================================================
    // SIZE CLASSES
    // ==========================================================================
    const sizeStyles = {
      lg: {
        container: 'min-h-[48px]',
        input: 'py-3 text-sm',
        label: 'text-base font-medium',
        hint: 'text-xs',
        icon: 20,
        addon: 'px-4 py-3.5',
      },
      sm: {
        container: 'min-h-[40px]',
        input: 'py-2.5 text-xs',
        label: 'text-sm font-medium',
        hint: 'text-[10px]',
        icon: 18,
        addon: 'px-3 py-2.5',
      },
    };

    const currentSize = sizeStyles[size];

    // ==========================================================================
    // COMPUTED STYLES
    // ==========================================================================
    const getBorderColor = () => {
      if (disabled) return tokens.border.disabled;
      if (danger) return tokens.border.danger;
      if (isFocused) return tokens.border.focus;
      return tokens.border.default;
    };

    const getLabelColor = () => {
      if (disabled) return tokens.text.disabled;
      return tokens.text.label;
    };

    const getHintColor = () => {
      if (danger) return tokens.text.danger;
      if (disabled) return tokens.text.disabled;
      return tokens.text.hint;
    };

    const getInputColor = () => {
      if (disabled) return tokens.text.disabled;
      return tokens.text.value;
    };

    const getPlaceholderColor = () => {
      if (disabled) return tokens.text.disabled;
      return tokens.text.placeholder;
    };

    const getIconColor = () => {
      if (disabled) return tokens.text.iconDisabled;
      if (danger) return tokens.text.danger;
      return tokens.text.icon;
    };

    // ==========================================================================
    // EVENT HANDLERS
    // ==========================================================================
    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e as React.FocusEvent<HTMLInputElement>);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e as React.FocusEvent<HTMLInputElement>);
    };

    // ==========================================================================
    // ADDON COMPONENTS
    // ==========================================================================
    const LeadingDropdownAddon = () => (
      <div
        className={cn(
          'flex items-center gap-2 self-stretch border-e',
          currentSize.addon
        )}
        style={{
          backgroundColor: tokens.bg.addon,
          borderColor: getBorderColor(),
        }}
      >
        <span
          className="text-xs font-medium"
          style={{ color: tokens.text.addon }}
        >
          {leadingDropdownValue || leadingDropdownOptions[0]?.label || 'Select'}
        </span>
        <ArrowDown2
          size={currentSize.icon}
          color={tokens.text.icon}
          variant="Linear"
        />
      </div>
    );

    const TrailingDropdownAddon = () => (
      <div
        className={cn(
          'flex items-center gap-2 self-stretch border-s',
          currentSize.addon
        )}
        style={{
          backgroundColor: tokens.bg.addon,
          borderColor: getBorderColor(),
        }}
      >
        <span
          className="text-xs font-medium"
          style={{ color: tokens.text.addon }}
        >
          {trailingDropdownValue || trailingDropdownOptions[0]?.label || 'Select'}
        </span>
        <ArrowDown2
          size={currentSize.icon}
          color={tokens.text.icon}
          variant="Linear"
        />
      </div>
    );

    const TrailingActionAddon = () => (
      <button
        type="button"
        onClick={onTrailingAction}
        disabled={disabled}
        className={cn(
          'flex items-center gap-1 self-stretch border-s transition-colors',
          currentSize.addon,
          !disabled && 'hover:opacity-80'
        )}
        style={{
          backgroundColor: tokens.bg.addon,
          borderColor: getBorderColor(),
        }}
      >
        {trailingActionIcon || (
          <Copy
            size={currentSize.icon}
            color={tokens.text.icon}
            variant="Linear"
          />
        )}
        {trailingActionLabel && (
          <span
            className="text-xs font-medium"
            style={{ color: tokens.text.addon }}
          >
            {trailingActionLabel}
          </span>
        )}
      </button>
    );

    const LeadingTextAddon = () => (
      <div
        className={cn(
          'flex items-center self-stretch border-e',
          currentSize.addon
        )}
        style={{
          backgroundColor: tokens.bg.addon,
          borderColor: getBorderColor(),
        }}
      >
        <span
          className="text-xs font-medium"
          style={{ color: tokens.text.addon }}
        >
          {leadingText}
        </span>
      </div>
    );

    const PhoneNumberAddon = () => (
      <div
        className={cn(
          'flex items-center gap-2 self-stretch border-e',
          currentSize.addon
        )}
        style={{
          backgroundColor: tokens.bg.addon,
          borderColor: getBorderColor(),
        }}
      >
        {phoneCountryFlag || <Flag code="SA" size="sm" rounded />}
        <span
          className="text-xs font-medium"
          style={{ color: tokens.text.addon }}
        >
          {phoneCountryCode}
        </span>
        <ArrowDown2
          size={currentSize.icon}
          color={tokens.text.icon}
          variant="Linear"
        />
      </div>
    );

    // ==========================================================================
    // TAG CHIP COMPONENT (Figma order: avatar, name, x-mark)
    // ==========================================================================
    const TagChip = ({ tag }: { tag: Tag }) => (
      <div
        className="flex items-center gap-1 ps-1.5 pe-1 py-0.5 rounded-md border"
        style={{
          backgroundColor: tokens.bg.default,
          borderColor: tokens.border.default,
        }}
      >
        <div
          className="w-5 h-5 rounded flex items-center justify-center shrink-0"
          style={{ backgroundColor: tokens.bg.addon }}
        >
          {tag.avatar ? (
            <img
              src={tag.avatar}
              alt={tag.label}
              className="w-full h-full rounded object-cover"
            />
          ) : (
            <User size={12} color={tokens.text.icon} variant="Linear" />
          )}
        </div>
        <span
          className="text-sm"
          style={{ color: tokens.text.value }}
        >
          {tag.label}
        </span>
        <button
          type="button"
          onClick={() => onTagRemove?.(tag)}
          disabled={disabled}
          className="flex items-center justify-center w-3.5 h-3.5 shrink-0"
        >
          <Close
            size={14}
            color={tokens.text.value}
            variant="Linear"
          />
        </button>
      </div>
    );

    // ==========================================================================
    // RENDER INPUT CONTENT
    // ==========================================================================
    const renderInputContent = () => {
      const inputStyles: React.CSSProperties = {
        color: getInputColor(),
        backgroundColor: 'transparent',
      };

      const inputClassName = cn(
        'flex-1 min-w-0 bg-transparent outline-none',
        'placeholder:transition-colors',
        currentSize.input
      );

      if (inputType === 'textarea') {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={cn(inputClassName, 'resize-none h-full')}
            style={{
              ...inputStyles,
              '--placeholder-color': getPlaceholderColor(),
            } as React.CSSProperties}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={rows}
          />
        );
      }

      if (inputType === 'tags') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { type: _inputHtmlType, ...tagRestProps } = props;
        return (
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {tags.map((tag) => (
              <TagChip key={tag.id} tag={tag} />
            ))}
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={inputId}
              type="text"
              className={cn(inputClassName, 'flex-1 min-w-[60px]')}
              style={inputStyles}
              placeholder={tags.length === 0 ? placeholder : ''}
              disabled={disabled}
              value={value}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...tagRestProps}
            />
            {showTrailingIcon && (
              trailingIcon ? (
                <span className="shrink-0" style={{ color: getIconColor() }}>{trailingIcon}</span>
              ) : (
                <User
                  size={currentSize.icon}
                  color={getIconColor()}
                  variant="Linear"
                />
              )
            )}
          </div>
        );
      }

      const { type: inputHtmlType, ...restProps } = props;
      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={inputId}
          type={inputHtmlType || 'text'}
          className={inputClassName}
          style={inputStyles}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...restProps}
        />
      );
    };

    // ==========================================================================
    // RENDER
    // ==========================================================================
    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn('leading-relaxed', currentSize.label)}
            style={{ color: getLabelColor() }}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'flex items-center rounded-xl border overflow-hidden transition-colors',
            currentSize.container,
            inputType === 'textarea' && 'items-start',
            disabled && 'cursor-not-allowed'
          )}
          style={{
            backgroundColor: tokens.bg.default,
            borderColor: getBorderColor(),
          }}
        >
          {inputType === 'leadingDropdown' && <LeadingDropdownAddon />}
          {inputType === 'phoneNumber' && <PhoneNumberAddon />}
          {inputType === 'leadingText' && <LeadingTextAddon />}

          <div
            className={cn(
              'flex items-center gap-2 flex-1 min-w-0',
              inputType === 'textarea' && 'items-start py-3 px-4',
              inputType !== 'textarea' && inputType !== 'tags' && 'py-0 ps-4',
              inputType === 'tags' && 'px-4'
            )}
          >
            {inputType === 'leadingIcon' && (
              <span className="shrink-0" style={{ color: getIconColor() }}>
                {leadingIcon || (
                  <User
                    size={currentSize.icon}
                    color={getIconColor()}
                    variant="Linear"
                  />
                )}
              </span>
            )}

            {renderInputContent()}
          </div>

          {showTrailingIcon && 
           inputType !== 'tags' && 
           inputType !== 'textarea' && 
           inputType !== 'trailingDropdown' && 
           inputType !== 'trailingAction' && (
            <span className="shrink-0 pe-4" style={{ color: getIconColor() }}>
              {trailingIcon || (
                <User
                  size={currentSize.icon}
                  color={getIconColor()}
                  variant="Linear"
                />
              )}
            </span>
          )}

          {inputType === 'trailingDropdown' && <TrailingDropdownAddon />}
          {inputType === 'trailingAction' && <TrailingActionAddon />}
        </div>

        {hint && (
          <p
            className={cn('leading-relaxed', currentSize.hint)}
            style={{ color: getHintColor() }}
          >
            {hint}
          </p>
        )}

        <style>{`
          input::placeholder,
          textarea::placeholder {
            color: ${getPlaceholderColor()};
          }
        `}</style>
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
