import { Firebase } from "../../../../infrastructure/firebase/firebase.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticationIDToken {
  constructor(private firebase: Firebase) {
    this.firebase = firebase;
  }
  async getUserIdFromIdToken(idToken : string) : Promise<string | null> {
    const auth = await this.firebase.getAuth()
    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      return decodedToken.uid;
    } catch (error) {
      console.log("User Not Found");
      return null;
    }
  }
}