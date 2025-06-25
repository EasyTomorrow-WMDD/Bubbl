import { BASE_URL } from '../config/BubblConfig';


export const getModules = async () => {
  const res = await fetch(`${BASE_URL}/modules`);
  if (!res.ok) throw new Error('Error getting modules');
  return await res.json();
};

export const getTopicsByModule = async (moduleId) => {
  const res = await fetch(`${BASE_URL}/topics/module/${moduleId}`);
  if (!res.ok) throw new Error('Error getting topics by module');
  return await res.json();
};


export const getTopicById = async (topicId) => {
  console.log('🌐 URL usada en fetch topics:', `${BASE_URL}/topics/${topicId}`);
  const res = await fetch(`${BASE_URL}/topics/${topicId}`);
  if (!res.ok) throw new Error('Error getting topic by ID');
  return await res.json();
};

export const getBadgesByUser = async (userId) => {
  console.log('🌐 URL usada en fetch:', `${BASE_URL}/api/users/${userId}/badges`);

  const response = await fetch(`${BASE_URL}/users/${userId}/badges`);
  if (!response.ok) throw new Error('Failed to fetch badges');
  return await response.json();
  
};

