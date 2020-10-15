import React, { AllHTMLAttributes, ReactNode } from 'react'
// @ts-ignore
import { Button, useTheme } from '@aragon/ui'
import { shadowDepth } from '../../style/shadow'
import { fontWeight } from '../../style/font'
import { radius } from '../../style/radius'

type NativeButtonProps = AllHTMLAttributes<HTMLButtonElement>

type BrandButtonProps = {
  mode?: 'normal' | 'strong' | 'positive' | 'negative'
  disabled?: boolean
  display?: 'auto' | 'all' | 'icon' | 'label'
  size?: 'medium' | 'small' | 'mini'
  type?: NativeButtonProps['type']
  onClick?: NativeButtonProps['onClick']
  wide?: boolean
  label?: ReactNode
  icon?: ReactNode
  children?: ReactNode
}

function BrandButton({
  mode = 'normal',
  disabled = false,
  display = 'auto',
  size = 'medium',
  icon,
  wide,
  children,
  label,
  ...props
}: BrandButtonProps): JSX.Element {
  const theme = useTheme()

  return (
    <Button
      mode={mode}
      disabled={disabled}
      display={display}
      label={label}
      icon={icon}
      size={size}
      wide={wide}
      css={`
        border: 0;
        border-radius: ${radius.medium};

        font-weight: ${fontWeight.medium};
        ${!disabled ? `box-shadow: ${shadowDepth.low};` : ''}
        ${!disabled && mode === 'strong'
          ? `background: linear-gradient(135deg, ${theme.accentEnd} 0%, ${theme.accentStart} 100%);`
          : ''};
      `}
      {...props}
    >
      {children}
    </Button>
  )
}

export default BrandButton
