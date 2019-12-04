var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../timeoff");
let should = chai.should();
chai.use(chaiHttp);

var global_id = 0;
describe ("CREATE PTO REQUEST", function(){
    it("should create a pto request", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:4000")
            .post("/createRequest/")
            .send({"end_date": '01/02/2020', "start_date": '01/01/2020', 'emp_id': 10001, 'manager_email': 'testemail@fakeemail.com', 'num_hours': 8})
            .end((err,res)=>{
                res.should.have.status(200);
                var a = JSON.parse(res.text);
                var hasError = a.code
                console.log(a);
                global_id = a.result['insertId'];
                chai.assert.equal(hasError, undefined);
                done()
            })
    })

})

describe ("DELETE ONE PTO REQUEST", function(){
    it("should delete a pto request", done=>{
        chai.request("http://localhost:4000")
            .post("/deleterequest/")
            .send({"requestid": global_id})
            .end((err,res)=>{
                var a = JSON.parse(res.text)
                var hasError = a.code
                console.log(a);
                chai.assert.equal(hasError, undefined);
                done()
            })
    });
})

describe ("GET EMPLOYEE REQUEST", function(){
    it("should get employee request", done=>{
        chai.request("http://localhost:4000")
            .get("/employee/10002")
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

describe ("GET DEPARTMENT REQUESTS", function(){
    it("should get department requests", done=>{
        chai.request("http://localhost:4000")
            .get("/department/d005")
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



describe ("CREATE PTO REQUEST", function(){
    it("should create a pto request", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:4000")
            .post("/createRequest/")
            .send({"end_date": '01/02/2020', "start_date": '01/01/2020', 'emp_id': 10001, 'manager_email': 'testemail@fakeemail.com', 'num_hours': 8})
            .end((err,res)=>{
                res.should.have.status(200);
                var a = JSON.parse(res.text);
                var hasError = a.code
                console.log(a);
                global_id = a.result['insertId'];
                chai.assert.equal(hasError, undefined);
                done()
            })
    })
})

describe ("DECLINE TIME OFF STATUS", function(){
    it("should change status to decline", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:4000")
            .post("/timeoffstatus/")
            .send({"request_id": global_id, 'status': 'Declined'})
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

describe ("CREATE PTO REQUEST", function(){
    it("should create a pto request", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:4000")
            .post("/createRequest/")
            .send({"end_date": '01/02/2020', "start_date": '01/01/2020', 'emp_id': 10001, 'manager_email': 'testemail@fakeemail.com', 'num_hours': 8})
            .end((err,res)=>{
                res.should.have.status(200);
                var a = JSON.parse(res.text);
                var hasError = a.code
                console.log(a);
                global_id = a.result['insertId'];
                chai.assert.equal(hasError, undefined);
                done()
            })
    })
})

describe ("APPROVE TIME OFF STATUS", function(){
    it("should change status to approve", done=>{
        console.log ("Creating expense first.")
        chai.request("http://localhost:4000")
            .post("/timeoffstatus/")
            .send({"request_id": global_id, 'status': 'Approved'})
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