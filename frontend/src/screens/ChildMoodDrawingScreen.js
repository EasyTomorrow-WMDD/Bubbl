import React from 'react';
import ChildMoodDrawingContainer from '../components/containers/ChildMoodDrawingContainer';

const ChildMoodDrawingScreen = ({ navigation, route }) => {
  const { childProfileId, mood } = route.params;

return (
  <ChildMoodDrawingContainer
    navigation={navigation}
    route={{ params: { childProfileId, mood } }}
  />
  );
};

export default ChildMoodDrawingScreen;