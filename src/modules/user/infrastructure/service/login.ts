import { auth } from "./firebase";

async function getUserIdFromIdToken(idToken : string) : Promise<string | null> {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    console.log("User Not Found");
    return null;
  }
}

export { getUserIdFromIdToken };