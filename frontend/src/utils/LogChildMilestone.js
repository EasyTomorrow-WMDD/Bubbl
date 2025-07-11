import LogChildUserActivity from './LogChildUserActivity';
import MILESTONES from '../constants/BubblChildMilestones';

// ============================================================================
// Helper function to log child user milestones
const LogChildMilestone = (user_id, user_nickname, milestone_id) => {

  const milestone = MILESTONES.find(m => m.milestone_id === milestone_id);

  if (!milestone) {
    console.warn(`[WARNING][LogChildMilestone]Unknown milestone_id: ${milestone_id}`);
    return;
  }

  const { summary, details, clan_id } = milestone;
  const personalizedDetails = details.replace(/####/g, user_nickname); // Replace placeholder with child's nickname

  LogChildUserActivity(user_id, summary, personalizedDetails, clan_id)
    .catch(err => console.error('[ERROR][LogChildMilestone] Failed to log activity:', err));


}

export default LogChildMilestone;
