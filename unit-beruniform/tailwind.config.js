/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Espresso Elegant Formal Tokens
        primary: {
          DEFAULT: "#004d34",
          dark: "#0d4a36",
          hover: "#003b28",
        },
        secondary: {
          DEFAULT: "#f5f6f8",
          dark: "#1a1d21",
        },
        background: {
          DEFAULT: "#f5f6f8",
          dark: "#0f1214",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#1a1d21",
        },
        foreground: {
          DEFAULT: "#333333",
          dark: "#e0ded9",
          muted: "#666666",
        },
        accent: {
          DEFAULT: "#f59e0b",
          dark: "#c9940f",
        },
        border: {
          DEFAULT: "rgba(0,0,0,0.08)",
          dark: "rgba(255,255,255,0.06)",
        },
        // FQC Custom Brand Mapping
        fqc: {
          emerald: {
            900: "#003b28",
            800: "#004d34",
            700: "#006243",
            600: "#059669",
            500: "#22c55e",
            100: "#e6f4ef",
            50: "#f0f9f5",
          },
          gold: {
            600: "#d97706",
            500: "#f59e0b",
            400: "#fbbf24",
            100: "#fef3c7",
          },
          navy: {
            950: "#0a1f18",
            900: "#004d34",
            800: "#063828",
            700: "#0b4231",
            600: "#135440",
          },
          cream: {
            50: "#faf8f5",
            100: "#f5f6f8",
            200: "#ebeceLink",
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['2.25rem', { lineHeight: '1.2', fontWeight: '800' }],
        'heading-md': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
        'title-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-md': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-md': ['0.875rem', { lineHeight: '1.4', fontWeight: '500' }],
        'caption-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'level0': 'none',
        'level1': '0 4px 20px -5px rgba(0,0,0,0.05)',
        'level2': '0 4px 20px -5px rgba(0,0,0,0.05)',
        'level3': '0 8px 25px -8px rgba(0,0,0,0.1)',
        'level4': '0 4px 14px -3px rgba(0,77,52,0.3)',
        'level5': '0 8px 25px -5px rgba(0,77,52,0.4)',
        'card': '0 4px 20px -5px rgba(0,0,0,0.05)',
        'elevated': '0 8px 25px -8px rgba(0,0,0,0.1)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      }
    },
  },
  plugins: [],
}
