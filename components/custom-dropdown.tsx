'use client'

import { useState, useRef, useEffect } from 'react'

interface CustomDropdownProps {
  id: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  label?: string
}

export function CustomDropdown({
  id,
  value,
  onChange,
  options,
  label,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        maxWidth: '200px',
      }}
    >
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.625rem 0.875rem',
          background: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)',
          border: '1.5px solid var(--color-gold)',
          borderRadius: '0.5rem',
          fontSize: '0.9rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 8px rgba(218, 165, 32, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = '#f4d03f'
            e.currentTarget.style.boxShadow =
              '0 4px 12px rgba(218, 165, 32, 0.25)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'var(--color-gold)'
            e.currentTarget.style.boxShadow =
              '0 2px 8px rgba(218, 165, 32, 0.15)'
          }
        }}
      >
        <span>{selectedOption?.label || label}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{
            transition: 'transform 0.2s',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M2 4L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            background: 'var(--color-bg-secondary)',
            border: '1.5px solid var(--color-gold)',
            borderRadius: '0.5rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            zIndex: 1000,
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              style={{
                width: '100%',
                padding: '0.75rem 0.875rem',
                background:
                  option.value === value ? 'var(--color-gold)' : 'transparent',
                color:
                  option.value === value
                    ? 'var(--color-bg-primary)'
                    : 'var(--color-text-primary)',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.background = 'rgba(218, 165, 32, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
