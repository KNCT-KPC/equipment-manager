import * as admin from 'firebase-admin';
import { firebaseConfig } from './config';

admin.initializeApp(firebaseConfig);
const auth = admin.auth();

async function getUserIdFromIdToken(idToken) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    console.log("User Not Found");
    return null;
  }
}

export { getUserIdFromIdToken };