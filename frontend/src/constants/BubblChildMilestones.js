// This file contains the list of milestones for child users in the Bubbl app.
// Each milestone has a unique ID, a summary, and details that can be used to log child activities. 
// Clan ID: See frontend/src/utils/ClanMappings.js for mappings and descriptions of clans.
// details: "####" is a placeholder for the child's name, which will be replaced dynamically when logging activities.

const MILESTONES = [
  {
    milestone_id: 1,
    summary: 'Bullying Awareness',
    details: '#### completed the Bullying Awareness module, resulting in increased confidence recognizing and responding to bullying.',
    clan_id: 'clan06',
  },
  {
    milestone_id: 2,
    summary: 'Your Body',
    details: '#### completed the Your Body module and gained knowledge about private and general body parts.',
    clan_id: 'clan04',
  },
  {
    milestone_id: 3,
    summary: 'Safe Touch',
    details: '#### completed the Safe Touch module and developed an understanding of how to set and respect boundaries.',
    clan_id: 'clan05',
  },
  {
    milestone_id: 4,
    summary: 'Saying No',
    details: '#### completed the Saying No module and learned how to confront and respond to peer pressure.',
    clan_id: 'clan02',
  },
];

export default MILESTONES;
