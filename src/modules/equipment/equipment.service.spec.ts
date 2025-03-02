import { equipment } from "./equipment.service";


describe('物品登録',() => {
  it('物品登録', async () => {
    // expect(await equipment.Rental("0195527e-94c1-7a83-80c7-ca670a7cefe7","0195527e-94ec-7d13-a59b-8142a1e6090c",1,))
    expect(await equipment.Return("0195527e-94fd-7b00-94b1-9383c4b70b32","ozeki","mac-mini"));
  });
});