// import {assert,use} from "chai";
// import chaiPromise from "chai-as-promised";

// import {anirandomiseTest} from "../anirandomise";
// const {anirandomise}=anirandomiseTest;

// use(chaiPromise);

// describe("main file tests",function(){
//     this.timeout(0);

//     const vidsPath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/vids";
//     const deletePath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/delete";
//     const logfile:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/randomise.log";

//     const badvidsPath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/randomise.log";
//     const baddeletePath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/delete2";
//     const badlogfile:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/";

//     describe("run tests",()=>{
//         it("should perform the full randomisatoin process with output, logging, execution, and movement",async ()=>{
//             await anirandomise(vidsPath,deletePath,logfile);
//         });

//         it("should perform in check mode, should not open the video, should not ask to relocate, should not perform logging.",async ()=>{
//             await anirandomise(vidsPath,deletePath,logfile,true);
//         });
//     });

//     describe("error tests",()=>{
//         it("should fail because vid path was bad",async ()=>{
//             await assert.isRejected(anirandomise(badvidsPath,deletePath,logfile));
//         });

//         it("should fail because delete path was bad",async ()=>{
//             await assert.isRejected(anirandomise(vidsPath,baddeletePath,logfile));
//         });

//         it("should fail because log file path was bad",async ()=>{
//             await assert.isRejected(anirandomise(vidsPath,deletePath,badlogfile));
//         });
//     });
// });