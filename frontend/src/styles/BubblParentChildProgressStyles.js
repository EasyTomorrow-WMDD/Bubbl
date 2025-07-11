import { StyleSheet } from 'react-native';
import BubblColors from './BubblColors';

// ============================================================================
// Styles for Bubbl app child progress

export const childProgressStyles = StyleSheet.create({
  // --------------------------------------------
  // Child progress top area:
  // Safe area:
  childProgressLayoutContainer: {
    padding: 0, 
    flex: 1,  // Mandatory for the FlatList used in the sub-components. 
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
    padding: 0,
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

  // --------------------------------------------
  // Child progress main area (user stats):
  childProgressStatsContainer: {
    backgroundColor: BubblColors.BubblPurple500,
    marginBottom: 0,
  },
  childProgressStatsMainContainer: { 
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: BubblColors.BubblPurple50,
  },
  childProgressHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 12, 
  },
  childProgressAvatarWrapper: { 
    width: 135, 
    height: 135, 
    position: 'relative', 
  },
  childProgressAvatarLayer: { 
    position: 'absolute', 
    width: '100%', 
    height: '100%' 
  },
  childProgressUserInfo: { 
    marginLeft: 16, 
    marginTop: 16,
    flex: 1,
  },
  childProgressNickname: { 
    color: BubblColors.BubblPurple950,
   },
  childProgressLevelText: { 
    marginTop: 2,
    color: BubblColors.BubblPurple950, 
  },
  childProgressProgressBar: { 
    flexDirection: 'row', 
    height: 12, 
    backgroundColor: BubblColors.BubblNeutralLighter, 
    borderRadius: 6, 
    overflow: 'hidden', 
    marginTop: 6,
  },
  childProgressProgressFill: { 
    backgroundColor: BubblColors.BubblPurple800, 
  },
  childProgressStatsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 16, 
  },
  childProgressStatBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8 
  },
  childProgressStatIconContainer: {
    width: 35,
    height: 35,
    padding: 4,
    borderRadius: 6,
    backgroundColor: BubblColors.BubblPurple300,
  },
  childProgressStatIcon: { 
    width: '100%', 
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  childProgressStatValue: { 
    color: BubblColors.BubblPurple950,
  },
  childProgressStatLabel: { 
    color: BubblColors.BubblPurple950,
  },

  // --------------------------------------------
  // Child progress tab navigation area:
  childProgressContainer: { 
    padding: 0, 
  },
  childProgressTabBar: {
    backgroundColor: BubblColors.BubblPurple200,
    padding: 16,
  },
  childProgressTabBarInnerArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: BubblColors.BubblPurple50,
    borderRadius: 18,
    padding: 4,
  },
  childProgressTabItem: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: BubblColors.BubblPurple50,
  },
  childProgressActiveTabItem: {
    backgroundColor: BubblColors.BubblPurple800,
    borderColor: BubblColors.BubblPurple700,
  },
  childProgressTabText: {
    fontSize: 16,
    color: BubblColors.BubblPurple950,
  },
  childProgressActiveTabText: {
    color: BubblColors.BubblPurple50,
  },
  childProgressTabContent: {
    paddingTop: 16,
  },

  // --------------------------------------------
  // Child activity log list:
  childActivityContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: BubblColors.BubblPurple200,
  },
  childActivityHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  childActivityHeadingText: {
    color: BubblColors.BubblPurple950,
  },
  childActivityHeadingIcon: {
    width: 24,
    height: 24,
  },
  flatListContainer: {
    minHeight: 400,
    height: 400,
  },

  // --------------------------------------------
  // Child progress not found card:
  childProgressSearchNotFoundContainer: {
    width: 340,
    borderWidth: 1,
    borderColor: BubblColors.BubblPurple200,
    borderRadius: 24,
    overflow: 'hidden',
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: BubblColors.BubblPurple100,
    marginTop: 12,
    paddingBottom: 24,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  childProgressSearchNotFoundIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    alignSelf: 'center',
  },
  childProgressSearchNotFoundTitle: {
    color: BubblColors.BubblPurple950,
  },
  childProgressSearchNotFoundSummary: {
    color: BubblColors.BubblPurple950,
    marginTop: 8,
    marginBottom: 36,
  },

  // --------------------------------------------
  // Child activity log card: 
  activityLogDateDividerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  activityLogDateDividerText: {
    backgroundColor: BubblColors.BubblNeutralLight,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    color: BubblColors.BubblNeutralLightest,
  },
  activityLogCard: {
    backgroundColor: BubblColors.BubblNeutralWhite,
    padding: 12,
    paddingRight: 64,
    borderRadius: 24,
    marginBottom: 16,
  },
  activityLogCardImage: {
    width: 60,
    height: 60,
    marginRight: 12,
  },
  activityLogCardTextContainer: {
    marginRight: 20,
  },  
  activityLogCardSummary: {
    marginBottom: 4,
  },
  activityLogCardDetail: {
    marginBottom: 4,
  },


});