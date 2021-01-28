import {anirandomiseTest} from "../anirandomise";
const {anirandomise}=anirandomiseTest;

describe.only("main file tests",()=>{
    const vidsPath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/vids";
    const deletePath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/delete";
    const logfile:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/randomise.log";

    it("should perform the full randomisatoin process with output, logging, execution, and movement",()=>{
        anirandomise(vidsPath,deletePath,logfile);
    });
});