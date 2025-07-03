// This file contains the font style definitions for Bubbl as per the UI Kit.
// Usage Sample:
/*
import { Text, StyleSheet } from 'react-native';
import fontStyles from '../styles/BubblFontStyles';

export default someComponent() => {
  return (
    <Text style={[fontStyles.heading1, otherStyles.test]}>Hello, Bubbl!</Text>
  );
}
*/

import { StyleSheet } from 'react-native';
import BubblFonts from './BubblFonts';

export const fontStyles = StyleSheet.create({
  display1: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.display1,
    lineHeight: BubblFonts.lineHeights.display1,
  },
  display2: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.display2,
    lineHeight: BubblFonts.lineHeights.display2,
  },
  display3: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.display3,
    lineHeight: BubblFonts.lineHeights.display3,
  },
  heading1: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.heading1,
    lineHeight: BubblFonts.lineHeights.heading1,
  },
  heading2: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.heading2,
    lineHeight: BubblFonts.lineHeights.heading2,
  },
  heading3: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.heading3,
    lineHeight: BubblFonts.lineHeights.heading3,
  },
  tagline: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.tagline,
    lineHeight: BubblFonts.lineHeights.tagline,
  },
  bodyLarge: {
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyLarge,
    lineHeight: BubblFonts.lineHeights.bodyLarge,
  },
  bodyMedium: {
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium,
    lineHeight: BubblFonts.lineHeights.bodyMedium,
  },
  bodyDefault: {
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyDefault,
    lineHeight: BubblFonts.lineHeights.bodyDefault,
  },
  bodySmall: {
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodySmall,
    lineHeight: BubblFonts.lineHeights.bodySmall,
  },
  bodyTiny: {
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyTiny,
    lineHeight: BubblFonts.lineHeights.bodyTiny,
  },
});
