import { getUserIdFromIdToken } from "./infrastructure/service/login.service";

describe('LoginService', () => {
  it('should return userId from idToken', async () => {
    expect(await getUserIdFromIdToken('idToken')).toBe(null);
  })});