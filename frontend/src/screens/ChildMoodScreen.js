import ChildMoodConntainer from '../components/containers/ChildMoodContainer';
import { useTab } from '../utils/TabContext';
import { useEffect } from 'react';

const ChildMoodScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params;
  const { setActiveTab } = useTab();

  useEffect(() => {
  setActiveTab('mood draw');
}, []);


  return <ChildMoodConntainer navigation={navigation} childProfileId={childProfileId} />;
};

export default ChildMoodScreen;