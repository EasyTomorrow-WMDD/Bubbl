import React, { useEffect, useState } from 'react';
import { useTourGuideController } from 'react-native-tourguide';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const OnboardingTour = ({
  userId,
  user
}) => {
  const { start, eventEmitter, canStart } = useTourGuideController();
  const [hasLaunched, setHasLaunched] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!userId || hasLaunched) return;

      try {
        const res = await axios.get(`${BASE_URL}/api/onboarding/status`, {
          headers: { 'x-user-id': userId }
        });

        if (res.data.completed === false && canStart) {
          setHasLaunched(true);
          setTimeout(() => {
            start();
          }, 1500);
        }
      } catch (err) {
        console.error('Error checking onboarding status:', err);
      }
    };

    checkOnboardingStatus();
  }, [userId, canStart, start, hasLaunched]);

  useEffect(() => {
    const markOnboardingComplete = async () => {
      if (!userId) return;

      try {
        await axios.post(`${BASE_URL}/api/onboarding/complete`, {
          user_id: userId
        });
        setHasLaunched(false);
      } catch (err) {
        console.error('Error marking onboarding complete:', err);
      }
    };

    const handleStop = () => {
      markOnboardingComplete();
    };

    eventEmitter.on('stop', handleStop);

    return () => {
      eventEmitter.off('stop', handleStop);
    };
  }, [userId, eventEmitter]);

  return null;
};

export default OnboardingTour;
