module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1025px',
      xl: '1280px',
      xl2: '1360px',
    },
    colors: {
      white: '#fff',
      black: '#000',
      darkNavy: '#192735',
      midNavy: '#233340',
      lightNavy: '#2F4658',
      sky: '#3D6374',
      lightIvory: '#F1EDDA',
      midIvory: '#E8E1C1',
      darkIvory: '#392F31',
      greyBeige: '#C4BEA3',
      lightText: '#392F31',
      pointGreen: '#327559',
    },
    extend: {
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
