!function(e){var n={};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/",o(o.s=5)}([function(e,n){e.exports=require("mongoose")},function(e,n){e.exports=require("express")},function(e,n){e.exports=require("body-parser")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("cors")},function(e,n,o){"use strict";o.r(n);var t=o(3),r=o.n(t),s=o(1),c=o.n(s),i=o(0),u=o.n(i),a={dbUri:"mongodb+srv://shobhitsingh29:yatra@cluster0-aq80y.mongodb.net/shobhitdb"},d=function(e){return a[e]},l=o(2),f=o.n(l),p=new(0,u.a.Schema)({id:Number,message:String},{timestamps:!0}),g=u.a.model("Data",p),b=o(4),m=o.n(b),y=c()(),v=__dirname,j=r.a.join(v,"index.html");y.use(m()({credentials:!0,origin:!0})),y.use((function(e,n,o){n.header("Access-Control-Allow-Origin","*"),n.header("Access-Control-Allow-Credentials",!0),o()})),u.a.connect(d("dbUri"));var x=u.a.connection;x.on("connected",(function(){console.log("Mongoose default connection is open to ",d("dbUri"))})),x.on("error",(function(e){console.log(error("Mongoose default connection has occured "+e+" error"))})),x.on("disconnected",(function(){console.log("Mongoose default connection is disconnected")}));var h=c.a.Router();y.use(c.a.static(v)),y.use(f.a.urlencoded({extended:!1})),y.use(f.a.json()),y.use("/api",h),h.get("/getData",(function(e,n){g.find((function(e,o){return e?n.json({success:!1,error:e}):n.json({success:!0,data:o})}))})),h.post("/updateData",(function(e,n){var o=e.body,t=o.id,r=o.update;g.findByIdAndUpdate(t,r,(function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})}))})),h.delete("/deleteData",(function(e,n){var o=e.body.id;g.findByIdAndRemove(o,(function(e){return e?n.send(e):n.json({success:!0})}))})),h.post("/putData",(function(e,n){var o=new g,t=e.body,r=t.id,s=t.message;if(!r&&0!==r||!s)return n.json({success:!1,error:"INVALID INPUTS"});o.message=s,o.id=r,o.save((function(e){return e?n.json({success:!1,error:e}):n.json({success:!0})}))})),h.get("/",(function(e,n){n.json({message:"HELLOW WORLDUUHHHH"})})),y.get("*",(function(e,n){n.sendFile(j)}));var O=process.env.PORT||8080;y.listen(O,(function(){console.log("App listening to ".concat(O,"....")),console.log("Press Ctrl+C to quit.")}))}]);