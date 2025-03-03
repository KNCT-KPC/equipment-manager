import * as admin from 'firebase-admin';
import { firebaseConfig } from './config';

admin.initializeApp(firebaseConfig);
const auth = admin.auth();

export { auth };