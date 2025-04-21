import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      colorScheme: {
        default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        primary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        secondary: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        danger: "bg-red-100 text-red-800 hover:bg-red-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        info: "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
      },
    },
    defaultVariants: {
      colorScheme: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, colorScheme, ...props }: BadgeProps) => {
  return (
    <div className={badgeVariants({ colorScheme, className })} {...props} />
  );
};

export { Badge, badgeVariants };
export default Badge;
