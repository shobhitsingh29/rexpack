!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/rexpack",t(t.s=4)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("path")},function(e,n,t){"use strict";t.r(n);var r=t(3),o=t.n(r),s=t(1),u=t.n(s),i=t(0),c=t.n(i),a={dbUri:"mongodb+srv://shobhitsingh29:yatra@clusterbackend-nypki.mongodb.net/shobhitdb"},d=function(e){return a[e]},f=t(2),l=t.n(f),p=new(0,c.a.Schema)({id:Number,message:String},{timestamps:!0}),b=c.a.model("Data",p),g=u()(),m=__dirname,y=o.a.join(m,"index.html");c.a.connect(d("dbUri")),c.a.connection.on("error",console.error.bind(console,"MongoDB connection error:"));var j=u.a.Router();g.use(u.a.static(m)),g.use(l.a.urlencoded({extended:!1})),g.use(l.a.json()),g.use("/api",j),j.get("/getData",(function(e,n){b.find((function(e,t){return e?n.json({success:!1,error:e}):n.json({success:!0,data:t})}))})),j.post("/updateData",(function(e,n){var t=e.body,r=t.id,o=t.update;b.findByIdAndUpdate(r,o,(function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})}))})),j.delete("/deleteData",(function(e,n){var t=e.body.id;b.findByIdAndRemove(t,(function(e){return e?n.send(e):n.json({success:!0})}))})),j.post("/putData",(function(e,n){var t=new b,r=e.body,o=r.id,s=r.message;if(!o&&0!==o||!s)return n.json({success:!1,error:"INVALID INPUTS"});t.message=s,t.id=o,t.save((function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})}))})),j.get("/",(function(e,n){n.json({message:"HELLOW WORLDUUHHHH"})})),g.get("*",(function(e,n){n.sendFile(y)}));var v=process.env.PORT||8080;g.listen(v,(function(){console.log("App listening to ".concat(v,"....")),console.log("Press Ctrl+C to quit.")}))}]);