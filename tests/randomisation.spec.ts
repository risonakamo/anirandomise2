import {describe,it} from "mocha";
import {assert} from "chai";

import {duplicateChanceTest} from "../lib/randomisation";

describe("duplicate chance",()=>{
    it("should return booleans",async ()=>{
        console.log(await duplicateChanceTest(1));
        console.log(await duplicateChanceTest(2));
        console.log(await duplicateChanceTest(4));
        console.log(await duplicateChanceTest(10));
        assert.isBoolean(await duplicateChanceTest(10));
    });
});