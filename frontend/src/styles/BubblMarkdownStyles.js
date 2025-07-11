//import { fontStyles } from "./BubblFontStyles";
import BubblColors from "./BubblColors";
import BubblFonts from './BubblFonts';

// ============================================================================
// This file contains styles for rendering markdown content 
// in 'react-native-markdown-display' for Bubbl app.
// There are two sets of styles:
// 1. markdownOtherArticleStyles: For articles in the "Other" section.
// 2. markdownEssentialsArticleStyles: For articles in the "Essentials" section
//

/*
  Sample usage: 
import Markdown from 'react-native-markdown-display';
import { markdownOtherArticleStyles, markdownEssentialsArticleStyles } from '../../styles/BubblMarkdownStyles';

...
  return (
    ...

    <Markdown style={markdownStyles}>
      markdownContent
    </Markdown>

*/

export const markdownOtherArticleStyles = {
  body: {
    color: BubblColors.BubblOrange950,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium,
    lineHeight: BubblFonts.lineHeights.bodyMedium,
  },
  heading1: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.display2,
    lineHeight: BubblFonts.lineHeights.display2,
    color: BubblColors.BubblOrange950,
    marginBottom: 8,
  },
  heading2: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.heading1,
    lineHeight: BubblFonts.lineHeights.heading1,
    color: BubblColors.BubblOrange950,
    marginTop: 16,
    marginBottom: 8,
  },
  heading3: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.heading2,
    lineHeight: BubblFonts.lineHeights.heading2,
    color: BubblColors.BubblOrange950,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    color: BubblColors.BubblOrange950,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium,
    lineHeight: BubblFonts.lineHeights.bodyMedium,
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bullet_list: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  strong: {
    fontWeight: '900',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: BubblColors.BubblOrange900,
    marginVertical: 16,
  },
  em: {
    fontStyle: 'italic',
  },
};

export const markdownEssentialsArticleStyles = {
  body: {
    color: BubblColors.BubblPurple950,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium,
    lineHeight: BubblFonts.lineHeights.bodyMedium,
  },
  heading1: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.display2,
    lineHeight: BubblFonts.lineHeights.display2,
    color: BubblColors.BubblPurple950,
    marginBottom: 8,
  },
  heading2: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.heading1,
    lineHeight: BubblFonts.lineHeights.heading1,
    color: BubblColors.BubblPurple950,
    marginTop: 16,
    marginBottom: 8,
  },
  heading3: {
    fontFamily: BubblFonts.headingTypeface,
    fontSize: BubblFonts.sizes.heading2,
    lineHeight: BubblFonts.lineHeights.heading2,
    color: BubblColors.BubblPurple950,
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    color: BubblColors.BubblPurple950,
    fontFamily: BubblFonts.bodyTypeface,
    fontSize: BubblFonts.sizes.bodyMedium,
    lineHeight: BubblFonts.lineHeights.bodyMedium,
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bullet_list: {
    marginVertical: 8,
    paddingLeft: 16,
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  strong: {
    fontWeight: '900',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: BubblColors.BubblPurple900,
    marginVertical: 16,
  },
  em: {
    fontStyle: 'italic',
  },
};
