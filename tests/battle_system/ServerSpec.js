"use strict";

import Server from "../../src/server/index.js";
import chai from 'chai';
import chaiHttp from 'chai-http';

var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);

describe("Server", function() {

    it("/version should return current server version", function(done) {
        chai.request(Server)
            .get('/version')
            .end(function(err, res) {

                expect(err).to.be.null;
                res.should.have.status(200);
                expect(res).to.be.json;
                expect(res.body.message).to.have.string('version');

                done();
            });

    });

});