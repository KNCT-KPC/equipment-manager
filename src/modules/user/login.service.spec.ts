import { getUserIdFromIdToken } from "./infrastructure/sevice/login";

describe('LoginService', () => {
  it('should return userId from idToken', async () => {
    expect(await getUserIdFromIdToken('idToken')).toBe(null);
  })});