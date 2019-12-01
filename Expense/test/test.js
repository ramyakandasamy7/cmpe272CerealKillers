var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../server");
let should = chai.should();
chai.use(chaiHttp);

var global_id = 0;
describe ("CREATE ONE EXPENSE", function(){
    it("should create an expense", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:3000")
            .post("/expenses/")
            .send({"employee_id": "1"})
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

describe ("READ ALL EXPENSE", function(){
    it("should get an expense", done=>{
        chai.request("http://localhost:3000")
            .post("/list_expenses/")
            .send({"employee_id": '1'})
            .end((err,res)=>{
                res.should.have.status(200);
                var a = JSON.parse(res.text);
                global_id = a[0].id
                var hasError = a.code
                console.log(a);
                chai.assert.equal(hasError, undefined);
                done()
            })
    })

})

describe ("DELETE ONE EXPENSE", function(){
    it("should delete an expense", done=>{
        chai.request("http://localhost:3000")
            .post("/delete_expenses/" + global_id)
            .end((err,res)=>{
                var a = JSON.parse(res.text)
                var hasError = a.code
                console.log(a);
                chai.assert.equal(hasError, undefined);
                done()
            })
    });
})


describe ("CREATE ONE LIMIT", function(){
    it("should create an expense", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:3000")
            .post("/createlimit/")
            .send({"employee_id": "1", 'limit': 2000})
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

describe ("READ ONE LIMIT", function(){
    it("should get an expense", done=>{
        chai.request("http://localhost:3000")
            .post("/readlimit/")
            .send({"employee_id": '1'})
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

describe ("UPDATE ONE LIMIT", function(){
    it("should create an expense", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:3000")
            .post("/updatelimit/")
            .send({"employee_id": "1", 'limit': 1000})
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

describe ("DELETE ONE LIMIT", function(){
    it("should delete an expense", done=>{
        chai.request("http://localhost:3000")
            .post("/delete_expenses/" + global_id)
            .end((err,res)=>{
                var a = JSON.parse(res.text)
                var hasError = a.code
                console.log(a);
                chai.assert.equal(hasError, undefined);
                done()
            })
    });
})



