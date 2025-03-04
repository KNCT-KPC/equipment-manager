import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Firebase{
  constructor(){
  const firebaseconfig = {
    apikey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  }
  admin.initializeApp(firebaseconfig);
}
  async getAuth(){
    return admin.auth();
  }
}