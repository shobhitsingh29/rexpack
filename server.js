!function(e){var n={};function o(r){if(n[r])return n[r].exports;var t=n[r]={i:r,l:!1,exports:{}};return e[r].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=e,o.c=n,o.d=function(e,n,r){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)o.d(r,t,function(n){return e[n]}.bind(null,t));return r},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/rexpack",o(o.s=5)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("cors")},function(e,n,o){"use strict";o.r(n);var r=o(3),t=o.n(r),s=o(1),u=o.n(s),i=o(0),c=o.n(i),a={dbUri:"mongodb+srv://shobhitsingh29:yatra@clusterbackend-nypki.mongodb.net/shobhitdb"},d=function(e){return a[e]},l=o(2),f=o.n(l),p=new(0,c.a.Schema)({id:Number,message:String},{timestamps:!0}),b=c.a.model("Data",p),g=o(4),m=o.n(g),y=u()(),j=__dirname,v=t.a.join(j,"index.html");y.use(m()({credentials:!0,origin:!0})),y.use((function(e,n,o){n.header("Access-Control-Allow-Origin","*"),n.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE"),n.header("Access-Control-Allow-Headers","Content-Type"),o()})),c.a.connect(d("dbUri")),c.a.connection.on("error",console.error.bind(console,"MongoDB connection error:"));var x=u.a.Router();y.use(u.a.static(j)),y.use(f.a.urlencoded({extended:!1})),y.use(f.a.json()),y.use("/api",x),x.get("/getData",(function(e,n){b.find((function(e,o){return e?n.json({success:!1,error:e}):n.json({success:!0,data:o})}))})),x.post("/updateData",(function(e,n){var o=e.body,r=o.id,t=o.update;b.findByIdAndUpdate(r,t,(function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})}))})),x.delete("/deleteData",(function(e,n){var o=e.body.id;b.findByIdAndRemove(o,(function(e){return e?n.send(e):n.json({success:!0})}))})),x.post("/putData",(function(e,n){var o=new b,r=e.body,t=r.id,s=r.message;if(!t&&0!==t||!s)return n.json({success:!1,error:"INVALID INPUTS"});o.message=s,o.id=t,o.save((function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})}))})),x.get("/",(function(e,n){n.json({message:"HELLOW WORLDUUHHHH"})})),y.get("*",(function(e,n){n.sendFile(v)}));var h=process.env.PORT||8080;y.listen(h,(function(){console.log("App listening to ".concat(h,"....")),console.log("Press Ctrl+C to quit.")}))}]);