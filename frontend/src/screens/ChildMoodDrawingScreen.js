import React from 'react';
import ChildMoodDrawingContainer from '../components/containers/ChildMoodDrawingContainer';

const ChildMoodDrawingScreen = ({ navigation, route }) => {
  const { childProfileId } = route.params;

  return (
    <ChildMoodDrawingContainer
      navigation={navigation}
      route={{ params: { childProfileId } }}
    />
  );
};

export default ChildMoodDrawingScreen;