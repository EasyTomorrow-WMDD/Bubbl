import { StyleSheet } from 'react-native';
import BubblColors from './BubblColors';

// ============================================================================
// Styles for Bubbl app parent main layout & parent stories

export const parentStyles = StyleSheet.create({
  // --------------------------------------------
  // Loading container:
    loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --------------------------------------------
  // Parent Layout:
  // Safe area:
  parentLayoutTopSafeArea: { backgroundColor: BubblColors.BubblPurple500 },
  parentLayoutBottomSafeArea: { backgroundColor: BubblColors.BubblWhite },
  // Main container:
  parentLayoutContainer: { 
    flex: 1, 
    backgroundColor: BubblColors.BubblPurple500,
    margin: 0,
    padding: 0,
  },
  // Scrollable main content:
  parentLayoutMainContent: { 
    flex: 1, 
    padding: 0, 
  },
  parentLayoutPageText: { fontSize: 18 },

  // --------------------------------------------
  // Parent Header:
  parentHeaderContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: BubblColors.BubblPurple500,
  },
  parentHeaderTitle: {
    color: BubblColors.BubblWhite,
  },
  parentHeaderIcons: {
    flexDirection: 'row',
  },
  parentHeaderIcon: {
    width: 30,
    height: 30,
  },

  // --------------------------------------------
  // Parent Bottom Navigation:
  parentNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  parentNavItem: {
    alignItems: 'center',
  },
  parentNavIcon: {
    width: 40,
    height: 40,
  },
  parentNavIconActive: {
    borderWidth: 2,
    borderColor: BubblColors.BubblPurple500,
    borderRadius: 6,
  },
  parentNavIconInactive: {
    opacity: 0.7,
  },
  parentNavLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  parentNavLabelActive: {
    color: BubblColors.BubblPurple500,
  },
  parentNavLabelInactive: {
    color: BubblColors.BubblNeutralDarkest60,
  },

  // --------------------------------------------
  // Parent Stories main page:
  parentStoriesContainer: {
    backgroundColor: BubblColors.BubblPurple50,
    padding: 0,
    margin: 0,
    marginBottom: -150,
  },
  parentStoriesHeaderContainer: {
    backgroundColor: BubblColors.BubblPurple500,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 0,
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 42,
  },
  parentStoriesAvatarWrapper: {
    width: 84,
    height: 80,
    overflow: 'hidden',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  parentStoriesAvatarImage: {
    transform: [{ scale: 0.47 }],
  },
  parentStoriesHeading: {
    marginBottom: 4,
    color: BubblColors.BubblWhite,
  },
  parentStoriesSubheading: {
    marginBottom: 32,
    color: BubblColors.BubblWhite,
  },

  // --------------------------------------------
  // Essential stories list
  parentEssentialListSectionContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  parentEssentialListSectionHeading: {
    marginLeft: 20,
    marginBottom: 8,
    color: BubblColors.BubblPurple950,
  },
  parentEssentialListSectionSubHeading: {
    marginLeft: 20,
    marginBottom: 12,
    color: BubblColors.BubblPurple950,
  },

  // --------------------------------------------
  // Essential stories card
  // Card container
  parentEssentialCard: {
    overflow: 'hidden',
    marginLeft: 6,
    marginRight: 6,
    marginTop: 12,
  },
  // Image wrapper
  parentEssentialCardWrapper: {
    width: 300,
    height: 400,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: BubblColors.BubblPurple500,
    overflow: 'hidden',
  },
  // Image background
  parentEssentialCardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  // Image style
  parentEssentialCardImageStyle: {
    resizeMode: 'cover',
  },
  // Read tag
  parentStoryReadTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: BubblColors.BubblCyan400,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  // Read tag text
  parentStoryReadTagText: {
    color: BubblColors.BubblBlack,
  },
  // Story card text container
  parentStoryCardTextContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: BubblColors.BubblPurple500,
    borderWidth: 1,
    borderColor: BubblColors.BubblPurple400,
    borderRadius: 20,
  },
  // Story card title and summary
  parentStoryCardTitle: {
    color: BubblColors.BubblWhite,
  },
  parentStoryCardSummary: {
    color: BubblColors.BubblWhite,
    marginTop: 4,
  },
  // --------------------------------------------
  // Parent Other stories container
  parentOtherStoriesContainer: {
    backgroundColor: BubblColors.BubblOrange50,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  // --------------------------------------------
  // Parent Stories Search Form
  parentOtherStoriesSectionHeading: {
    marginTop: 30,
    marginBottom: 12,
    letterSpacing: -0.5, // I need this to make the text fit in one line on iPhone 16.. 
    color: BubblColors.BubblOrange950,
  },
  bubblSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: BubblColors.BubblNeutralDarkest60,
    backgroundColor: BubblColors.BubblWhite,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  bubblSearchIcon: {
    marginRight: 8,
  },
  bubblFormInput: {
    flex: 1,
    marginBottom: 4,
    color: BubblColors.BubblNeutralDarkest60,
  },
  searchNotFoundContainer: {
    width: 340,
    borderWidth: 1,
    borderColor: BubblColors.BubblOrange200,
    borderRadius: 24,
    overflow: 'hidden',
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: BubblColors.BubblOrange100,
    marginTop: 12,
    paddingBottom: 24,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  searchNotFoundIcon: {
    width: 80,
    height: 80,
    marginBottom: 16,
    marginTop: 16,
    alignSelf: 'center',
  },

  // ---------------------------------------------
  // Tag styles for search form
  tagScroll: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 2,
  },
  tagSelected: {
    backgroundColor: BubblColors.BubblOrange300,
    borderWidth: 1,
    borderColor: BubblColors.BubblOrange400,
  },
  tagUnselected: {
    backgroundColor: BubblColors.BubblOrange50,
  },
  tagText: {
    color: BubblColors.BubblOrange950,
  },
  tagTextSelected: {
    color: BubblColors.BubblOrange950,
  },
  tagTextUnselected: {
    color: BubblColors.BubblOrange950,
  },

  // --------------------------------------------
  // Parent Stories Articles List
  parentStoriesListContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 50,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    color: '#555',
  },
  listContent: {
    paddingBottom: 24,
  },

  // --------------------------------------------
  // Parent Story Card
  parentStoryOtherCardContainer: {
    width: 340,
    minHeight: 340,
    borderWidth: 1,
    borderColor: BubblColors.BubblOrange200,
    borderRadius: 24,
    overflow: 'hidden',
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: BubblColors.BubblOrange100,
    marginTop: 12,
    paddingBottom: 12,
  },
  parentStoryOtherCardImageContainer: {
    position: 'relative',
    borderRadius: 24,
    padding: 4,
    margin: 4,
  },
  parentStoryOtherCardImage: {
    width: '100%',
    height: 200,
    borderRadius: 24,
  },
  parentStoryOtherCardReadTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: BubblColors.BubblOrange950,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  parentStoryOtherCardReadTagText: {
    color: BubblColors.BubblWhite,
    fontSize: 12,
    fontWeight: 'bold',
  },
  parentStoryOtherCardTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  parentStoryOtherCardTitle: {
    color: BubblColors.BubblOrange950,
  },
  parentStoryOtherCardSummary: {
    color: BubblColors.BubblOrange950,
    marginTop: 8,
  },

  // --------------------------------------------
  // Parent Child Selection
  parentChildSelectionContainer: { 
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32, 
    backgroundColor: BubblColors.BubblPurple50,
  },
  parentChildSelectionHeader: { 
    textAlign: 'center', 
    marginTop: 24,
    marginBottom: 16,
  },
  parentChildSelectionSubHeading: { 
    textAlign: 'center',
    marginBottom: 80, 
  },


});



// ============================================================================
// Styles for Bubbl app parent other stories
export const parentOtherStoryStyles = StyleSheet.create({
  // --------------------------------------------
  // Parent Story Other Articles 
  parentOtherStoryLayoutContainer: {
    padding: 0, 
    flex: 1,  // Mandatory for the FlatList used in the sub-components. 
    backgroundColor: BubblColors.BubblOrange50,
  },
  parentOtherStoryLayoutTopSafeArea: { 
    backgroundColor: BubblColors.BubblOrange500,
    margin: 0,
    padding: 0,
  },
  parentOtherStoryLayoutBottomSafeArea: { 
    backgroundColor: BubblColors.BubblOrange50,
  },
  parentOtherStoryLayoutMainContainer: {
    padding: 0,
  },
  parentOtherStoryLayoutBackground: {
    position: 'absolute',
    width: '100%',
    height: 500,
    backgroundColor: BubblColors.BubblOrange500,
  },
  parentOtherStoryHeader: {
    backgroundColor: BubblColors.BubblOrange500,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
  },
  parentOtherStoryHeaderText: {
    color: BubblColors.BubblWhite,
  },
  parentOtherStoryCloseButton: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  articleContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: BubblColors.BubblOrange50,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: BubblColors.BubblOrange950,
    marginTop: 24,
  },
  // Related articles section
  relatedContainer: {
    padding: 16,
    backgroundColor: BubblColors.BubblOrange50,
    alignItems: 'center',
    paddingBottom: 200,
  },
  relatedHeading: {
    marginBottom: 12,
    color: BubblColors.BubblOrange950,
  },
  // Essentials navigation - not used for "other stories"
  essentialsNavContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  essentialsNavHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  essentialsNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

// ============================================================================
// Styles for Bubbl app parent other stories
export const parentEssentialStoryStyles = StyleSheet.create({
  // --------------------------------------------
  // Parent Story Other Articles 
  parentOtherStoryLayoutContainer: {
    padding: 0, 
    flex: 1,  // Mandatory for the FlatList used in the sub-components. 
    backgroundColor: BubblColors.BubblPurple50,
  },
  parentOtherStoryLayoutTopSafeArea: { 
    backgroundColor: BubblColors.BubblPurple500,
    margin: 0,
    padding: 0,
  },
  parentOtherStoryLayoutBottomSafeArea: { 
    backgroundColor: BubblColors.BubblPurple50,
  },
  parentOtherStoryLayoutMainContainer: {
    padding: 0,
  },
  parentOtherStoryLayoutBackground: {
    position: 'absolute',
    width: '100%',
    height: 500,
    backgroundColor: BubblColors.BubblPurple500,
  },
  parentOtherStoryHeader: {
    backgroundColor: BubblColors.BubblPurple500,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
  },
  parentOtherStoryHeaderText: {
    color: BubblColors.BubblWhite,
  },
  parentOtherStoryCloseButton: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
  articleContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: BubblColors.BubblPurple50,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: BubblColors.BubblPurple950,
    marginTop: 24,
  },
  // Related articles section
  relatedContainer: {
    padding: 16,
    backgroundColor: BubblColors.BubblPurple50,
    alignItems: 'center',
    paddingBottom: 200,
  },
  relatedHeading: {
    marginBottom: 12,
    color: BubblColors.BubblPurple950,
  },
  // Essentials navigation - not used for "other stories"
  essentialsNavContainer: {
    padding: 16,
    backgroundColor: BubblColors.BubblPurple50,
    paddingBottom: 150,
  },
  essentialsNavHeading: {
    color: BubblColors.BubblPurple950,
    marginBottom: 32,
    textAlign: 'center',
  },
  essentialsNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    width: 124,
    backgroundColor: BubblColors.BubblPurple300,
    paddingVertical: 16,
    marginHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: BubblColors.BubblPurple400,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: BubblColors.BubblPurple50,
  },
  navButtonText: {
    color: BubblColors.BubblPurple900,
  },
});
