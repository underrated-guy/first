/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // soft-academic-blue
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // deep-charcoal
        primary: {
          DEFAULT: 'var(--color-primary)', // soft-academic-blue
          foreground: 'var(--color-primary-foreground)' // deep-charcoal
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // muted-blue-gray
          foreground: 'var(--color-secondary-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // restrained-red
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // warm-gray-50
          foreground: 'var(--color-muted-foreground)' // neutral-gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // warm-gray-50
          foreground: 'var(--color-accent-foreground)' // deep-charcoal
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // deep-charcoal
        },
        card: {
          DEFAULT: 'var(--color-card)', // warm-gray-50
          foreground: 'var(--color-card-foreground)' // deep-charcoal
        },
        success: {
          DEFAULT: 'var(--color-success)', // academic-green
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber
          foreground: 'var(--color-warning-foreground)' // deep-charcoal
        },
        error: {
          DEFAULT: 'var(--color-error)', // restrained-red
          foreground: 'var(--color-error-foreground)' // white
        },
        'text-primary': 'var(--color-text-primary)', // deep-charcoal
        'text-secondary': 'var(--color-text-secondary)', // neutral-gray
        surface: 'var(--color-surface)' // warm-gray-50
      },
      fontFamily: {
        'heading': ['Newsreader', 'serif'],
        'body': ['Noto Sans', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.1)'
      },
      borderRadius: {
        'lg': '0.5rem',
        'md': '0.375rem',
        'sm': '0.25rem',
        'academic': '6px'
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'slide-down': 'slideDown 200ms ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms'
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}