import { StyleSheet } from 'react-native';
import BubblColors from './BubblColors';

export const profileStyles = StyleSheet.create({
  // --------------------------------------------
  // Profile Container:
  // Main container for the profile screen
  scrollContainer: {
    padding: 20,
    backgroundColor: BubblColors.BubblPurple50,
    width: '100%',
  },
  // Main content area for the profile screen
  scrollContent: {
    flexGrow: 1,
    backgroundColor: BubblColors.BubblPurple50,
  },
  // subheading for profile sections
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'left',
  },  
  // --------------------------------------------
  // Profile Card list
  // Container for the row of profile cards
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  // --------------------------------------------
  // Profile Cards
  // Profile card
  card: {
    width: 140,
    height: 160,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  // Avatar image for the card
  avatarImage: {
    width: 133,
    height: 133,
    borderRadius: 24,
  },
  // Nickname in the card
  nickname: {
    marginTop: 8,
    textAlign: 'center',
  },
  // New card for adding a parent profile
  newParentCard: {
    width: 133,
    height: 133,
    backgroundColor: BubblColors.BubblPurple100,
    borderColor: BubblColors.BubblPurple500,
    borderWidth: 2,
    borderRadius: 24,
    justifyContent: 'center',
    marginBottom: 20,
  },
  // New card for adding a child profile
  newChildCard: {
    width: 133,
    height: 133,
    backgroundColor: BubblColors.BubblOrange50,
    borderColor: BubblColors.BubblOrange500,
    borderWidth: 2,
    borderRadius: 24,
    justifyContent: 'center',
    marginBottom: 20,
  },

  // --------------------------------------------
  // Onboarding
  OnboardingLayoutContainer: {
    padding: 0, 
    flex: 1,  // Mandatory for the FlatList used in the sub-components. 
  },
  OnboardingLayoutTopSafeArea: { 
    backgroundColor: BubblColors.BubblPurple50,
    margin: 0,
    padding: 0,
  },
  OnboardingLayoutBottomSafeArea: { 
    backgroundColor: BubblColors.BubblPurple50,
  },


});

