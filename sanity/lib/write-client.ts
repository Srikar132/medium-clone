import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, token } from '../env';

if (!token) {
  console.warn("⚠️ SANITY_WRITE_TOKEN is missing. Write operations will fail.");
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'published',
});

// Validate client configuration
if (!writeClient.config().token) {
  console.error("❌ Write client token is missing - check your SANITY_WRITE_TOKEN environment variable");
} else {
  console.log("✅ Write client initialized with token");
}
