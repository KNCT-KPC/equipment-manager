import { getAuth } from 'firebase-admin/auth';

const auth = getAuth();

async function getUserIdFromIdToken(idToken) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    console.error('Error verifying idToken:', error);
    throw error;
  }
}