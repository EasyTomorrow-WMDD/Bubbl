
const BASE_URL = 'http://192.168.1.72:3000/api';

// Langara 10.128.230.106
// home 192.168.1.72

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
  const res = await fetch(`${BASE_URL}/topics/${topicId}`);
  if (!res.ok) throw new Error('Error getting topic by ID');
  return await res.json();
};
