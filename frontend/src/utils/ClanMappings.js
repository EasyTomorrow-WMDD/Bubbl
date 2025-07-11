// Clan Mapping: 
// Mapping of the "clan" in the activity record vs actual file path+name in the assets folder.
// clan01: Blue (probably not used, as it is not aligned with the Bubbl color scheme)
// clan02: Cyan
// clan03: Green (probably not used, as it is not aligned with the Bubbl color scheme)
// clan04: Orange
// clan05: Pink
// clan06: Purple (Bubbl) (default clan)
// clan07: Red (probably not used, as it is not aligned with the Bubbl color scheme)

// For image rendering in UI
const clanImages = {
  'clan01' : require('../assets/icons/clans/clan_blue.png'),
  'clan02' : require('../assets/icons/clans/clan_cyan.png'),
  'clan03' : require('../assets/icons/clans/clan_green.png'),
  'clan04' : require('../assets/icons/clans/clan_orange.png'),
  'clan05' : require('../assets/icons/clans/clan_pink.png'),
  'clan06' : require('../assets/icons/clans/clan_purple.png'),
  'clan07' : require('../assets/icons/clans/clan_red.png'),
};

// For logic/validation
const validClanKeys = ['clan01', 'clan02', 'clan03', 'clan04', 'clan05', 'clan06'];

export { clanImages, validClanKeys };