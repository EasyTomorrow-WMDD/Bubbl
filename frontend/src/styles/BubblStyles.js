import { StyleSheet, Dimensions } from 'react-native';
import BubblColors from './BubblColors';

const { height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: BubblColors.BubblePurple,
  },
  welcomeContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: BubblColors.BubblWhite,
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: BubblColors.BubblWhite,
    width: '100%',
  },
  formContainer: {
    width: '80%',
    maxWidth: 350,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#1e90ff',
    paddingHorizontal: 8,
    marginTop: 40,
  },
  // Header title styles
  headerTitle: {
    color: BubblColors.BubblPurple800,
    textAlign: 'center',
    flex: 1,
    marginTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  divider: {
    marginVertical: 20,
    textAlign: 'center',
    color: '#999',
  },

  // ------------------------------------------------------
  // Form styles 
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 12,
    marginTop: 5,
    width: '100%',
    maxWidth: 300,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    width: '100%',
    maxWidth: 300,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  button: {
    backgroundColor: BubblColors.BubblPurple800,
    width: '100%',
    maxWidth: 300,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: BubblColors.BubblWhite,
    fontSize: 16,
    textAlign: 'center',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: BubblColors.BubblNeutralDark,
  },

  // ------------------------------------------------------
  // Avatar picker styles
  avatarPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 12,
  },
  avatarPickerAvatarWrapper: {
    margin: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarPickerSelectedAvatar: {
    borderColor: BubblColors.BubblPurple800,
  },
  avatarPickerAvatarImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },

  // ------------------------------------------------------
  // The "or" divider styles -- START
  dividerContainer: {    
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '80%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: BubblColors.BubblNeutralDark,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: BubblColors.BubblNeutralDark,
  },
  // The "or" divider styles -- END
  // Login page specific styles -- START
  passwordNote: {
    marginTop: 10,
    fontSize: 12,
    color: '#333',
    fontStyle: 'italic'
  },
  disclaimer: {
    marginTop: 20,
    fontSize: 12,
    color: '#555',
    textAlign: 'center'
  },
  // Login page specific styles -- END

  // Profile page specific styles -- START
  scrollContainer: {
    padding: 20,
    backgroundColor: BubblColors.BubblPurple50,
    width: '100%',
    alignItems: 'center',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    width: 100,
    height: 130,
    margin: 8,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  nickname: {
    marginTop: 8,
    textAlign: 'center',
  },  
  // Profile page specific styles -- END

  //Loging 
    backgroundLogin: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
    animationContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    zIndex: 0,
  },
loginWrapper: {
    position: 'absolute',
    //  bottom: '1%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginCard:{
    width: '112%',
    // maxWidth: 360,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 57,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
 buttonLogin: {
  backgroundColor: BubblColors.BubblePurple,
  width: '100%',
  maxWidth: 300,
  paddingVertical: 12,
  paddingHorizontal: 40,
  borderRadius: 10,
  marginVertical: 6,  
},
buttonLoginOutline: {
  backgroundColor: BubblColors.BubblWhite,
  borderWidth: 2,
  borderColor: BubblColors.BubblePurple,
  width: '100%',
  maxWidth: 300,
  paddingVertical: 12,
  paddingHorizontal: 40,
  borderRadius: 10,
  marginVertical: 6, 
},
  buttonLoginText: {
    color: BubblColors.BubblWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLoginTextOutline: {
    color: BubblColors.BubblePurple,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
