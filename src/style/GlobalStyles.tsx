// src/styles/GlobalStyles.tsx
import { createGlobalStyle, DefaultTheme } from 'styled-components';
import tw, { GlobalStyles as BaseStyles, theme } from 'twin.macro';

interface CustomStylesProps {
  theme: DefaultTheme;
}

const CustomStyles = createGlobalStyle<CustomStylesProps>`
  body {
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`}
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
