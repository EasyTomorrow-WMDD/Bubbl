import { StyleSheet } from 'react-native';
import BubblColors from './BubblColors';

// ============================================================================
// Styles for Bubbl app child progress

export const childProgressStyles = StyleSheet.create({
  // --------------------------------------------
  // Child progress top area:
  // Safe area:
  childProgressLayoutContainer: {
    flex: 1, 
  },
  childProgressLayoutTopSafeArea: { 
    backgroundColor: BubblColors.BubblPurple500,
    margin: 0,
    padding: 0,
  },
  childProgressLayoutBottomSafeArea: { 
    backgroundColor: BubblColors.BubblPurple50,
  },
  childProgressLayoutMainContainer: {
    flex: 1,
  },
  childProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: BubblColors.BubblPurple500,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  childProgressTitle: {
    color: BubblColors.BubblWhite,
    textAlign: 'center',
  },
  childProgressSide: {
    width: 24, // same as icon size to balance left/right
    alignItems: 'center',
  },



});