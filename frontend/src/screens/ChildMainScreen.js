// Temporary main screen container to display.
import TemporaryMainContainer from '../components/containers/TemporaryMainContainer';

// Currently we are just rendering the temporary main screen container.
const ChildMainScreen = ({navigation}) => {
  return ( <TemporaryMainContainer navigation={navigation} /> );
};

export default ChildMainScreen;
