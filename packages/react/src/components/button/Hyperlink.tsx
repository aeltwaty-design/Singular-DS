import { forwardRef, AnchorHTMLAttributes, ElementType } from 'react';
import { ExternalLink } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { useBrand } from '../../providers/SingularProvider';

const hyperlinkVariants = cva(
  'inline-flex items-center gap-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded',
  {
    variants: {
      underline: {
        always: 'underline',
        hover: 'hover:underline',
        none: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      underline: 'hover',
      size: 'md',
    },
  }
);

export interface HyperlinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof hyperlinkVariants> {
  href: string;
  external?: boolean;
  showExternalIcon?: boolean;
  /** Polymorphic element or component to render as (defaults to 'a') */
  as?: ElementType;
}

export const Hyperlink = forwardRef<HTMLAnchorElement, HyperlinkProps>(
  (
    {
      className,
      href,
      external = false,
      showExternalIcon = true,
      underline,
      size,
      children,
      style,
      as: Component = 'a',
      ...props
    },
    ref
  ) => {
    const { brandColors } = useBrand();

    const dynamicStyles: React.CSSProperties = {
      color: brandColors.primary,
      '--tw-ring-color': brandColors.primary,
      ...style,
    };

    const linkProps = {
      ref,
      className: cn(hyperlinkVariants({ underline, size }), className),
      style: dynamicStyles,
      ...props,
    };

    if (external) {
      return (
        <a
          {...linkProps}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          {showExternalIcon && <ExternalLink className="w-3.5 h-3.5" />}
        </a>
      );
    }

    return (
      <Component {...linkProps} href={href}>
        {children}
      </Component>
    );
  }
);

Hyperlink.displayName = 'Hyperlink';

export default Hyperlink;
