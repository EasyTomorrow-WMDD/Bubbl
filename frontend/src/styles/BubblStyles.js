import { StyleSheet } from 'react-native';
import BubblColors from './BubblColors';

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BubblColors.BubblWhite,
  },
  welcomeContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BubblColors.BubblWhite,
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
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
  // Form styles -- START
  label: {
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
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
    backgroundColor: '#5DADE2',
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
    color: '#1e90ff',
  },
  // Form styles -- END
  // The "or" divider styles -- START
  dividerContainer: {    
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    width: '80%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    color: '#999',
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
    backgroundColor: BubblColors.BubblWhite,
    width: '100%',
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


});
