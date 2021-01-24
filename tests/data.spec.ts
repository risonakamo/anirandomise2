import {addShort} from "../lib/data-service";

describe("add short tests",()=>{
    it("should add a short. data.json should contain the newly added short, and should be created if it didnt exist",async ()=>{
        const shortToAdd:string="showbyrockstars";

        await addShort(shortToAdd);
    });
});