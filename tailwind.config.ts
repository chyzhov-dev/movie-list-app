import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src//pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        sm: '360px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      spacing: {
        30: '7.5rem',
        100: '25rem',
      },
      colors: {
        primary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39'
      },
      borderRadius: {
        'lg2': '0.625rem'
      }
    },
  },
  plugins: [],
};

export default config;
