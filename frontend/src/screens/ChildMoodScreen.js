import ChildMoodConntainer from '../components/containers/ChildMoodContainer';

const ChildMoodScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params;

  return <ChildMoodConntainer navigation={navigation} childProfileId={childProfileId} />;
};

export default ChildMoodScreen;