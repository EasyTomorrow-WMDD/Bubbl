import BubblConfig from '../config/BubblConfig';

// Update: Using BubblConfig to get the BASE_URL and URI_URL so that we don't need to change 2 config files every time. 
// Make sure that the backend url and supabase url are set correctly in the BubblConfig.js file.

const BASE_URL = BubblConfig.BACKEND_URL;
const URI_URL = `${BubblConfig.SUPABASE_URL}/storage/v1/object/public/assets/Badges`;

export { BASE_URL };
export { URI_URL };

