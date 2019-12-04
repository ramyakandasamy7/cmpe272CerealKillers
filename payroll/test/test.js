var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../payroll");
let should = chai.should();
chai.use(chaiHttp);

describe ("READ DEPARTMENT d005 payroll", function(){
    it("should get an expense", done=>{
        chai.request("http://localhost:3000")
            .get("/payrolls/d005")
            .end((err,res)=>{
                res.should.have.status(200);
                var a = JSON.parse(res.text);
                var hasError = a.code
                chai.assert.equal(hasError, undefined);
                done()
            })
    })

})

describe ("READ employee id 1  payroll", function(){
    it("should get an expense", done=>{
        chai.request("http://localhost:3000")
            .get("/payroll/10001")
            .end((err,res)=>{
                res.should.have.status(200);
                var a = JSON.parse(res.text);
                var hasError = a.code
                console.log(a);
                chai.assert.equal(hasError, undefined);
                done()
            })
    })

})