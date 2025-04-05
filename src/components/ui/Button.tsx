'use client'
import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  text: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({ className, text, onClick, disabled, type }: Props) {
  return (
  <button type={type} disabled={disabled} onClick={onClick} className={clsx('rounded-[3rem] font-medium', className)}>
    {text}
  </button>
  )
}
