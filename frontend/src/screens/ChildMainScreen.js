import { useEffect, useState } from 'react';
import LoadProfileInfo from '../utils/LoadProfileInfo';
import updateDayStreak from '../utils/UpdateDayStreak'; 

// Temporary main screen container to display.
import TemporaryMainContainer from '../components/containers/TemporaryMainContainer';

// Currently we are just rendering the temporary main screen container.
const ChildMainScreen = ({navigation}) => {

  const [userId, setUserId] = useState(null);
  
  // On component mount, load the current profile information from AsyncStorage (which should be the child profile)
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await LoadProfileInfo();
      setUserId(userProfile.user_id);
    };
    fetchUserProfile();
  }, []);

  // If userId is available, call the updateDayStreak function
  useEffect(() => {
    if (userId) {
      // Call the updateDayStreak function with the user ID
      updateDayStreak(userId);
    }
  }, [userId]);

  return ( <TemporaryMainContainer navigation={navigation} /> );
};

export default ChildMainScreen;
