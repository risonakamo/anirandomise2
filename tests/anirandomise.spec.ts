import {anirandomiseTest} from "../anirandomise";
const {anirandomise}=anirandomiseTest;

describe.only("main file tests",function(){
    this.timeout(0);

    const vidsPath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/vids";
    const deletePath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/delete";
    const logfile:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/randomise.log";

    it("should perform the full randomisatoin process with output, logging, execution, and movement",async ()=>{
        await anirandomise(vidsPath,deletePath,logfile);
    });

    it.only("should perform in check mode, should not open the video, should not ask to relocate, should not perform logging.",async ()=>{
        await anirandomise(vidsPath,deletePath,logfile,true);
    });
});