"use strict";
import Actor from "../../src/Actor.js";
import config from "../../src/config.js";

describe("Actor", function() {

 it("should have all attributes by default set to 0 even if not provided in constructor",function(){
     var d = new Actor({'abilities':{},'crafts':{},'m_amount':100, 'side':'D'});
      config.abilities.forEach(function(ability){
     expect(d[ability]).toEqual(0);
     });
 });

 it("should have all crafts by default set to 0 even if not provided in constructor",function(){
     var d = new Actor({'abilities':{},'crafts':{},'m_amount':100, 'side':'D'});
      config.crafts.forEach(function(craft){
     expect(d[craft]).toEqual(0);
     });
 });


 it("should allow setting all abilities from config file",function(){

     var d = new Actor( {'abilities':{},'crafts':{},'m_amount':100, 'side':'D'}  );

     config.abilities.forEach(function(ability){

     d[ability]=10;
     expect(d[ability]).toEqual(10);
     var t = { }; t[ability]=1;
     
     var d1 = new Actor( {'abilities':t,'crafts':{},'m_amount':100, 'side':'D'} );
     
     expect(d1[ability]).toEqual(1);

     },this);
 });



 it("should allow setting all crafts from config file",function(){
     var d = new Actor({'abilities':{},'crafts':{},'m_amount':100, 'side':'D'});

     config.crafts.forEach(function(craft){
        d[craft]=10;
        expect(d[craft]).toEqual(10);
     },this);
 });



  it("should allow setting crafts bonus roll on Actor creation",function(){
     var d = new Actor({'abilities':{},'crafts':{},'m_amount':100, 'side':'D'});
     d['swim']=1;
     expect(d['swim']).toEqual(1);
   
    var d = new Actor( {'abilities':{},'crafts':{'swim':+2},'m_amount':100, 'side':'D'} );
    expect(d['swim']).toEqual(2);
 });
 

   it("shouldn't allow setting properties with random names",function(){
    expect(function(){
        var d = new Actor({ 'abilities':{'some_random_ability_name':10}, 'crafts':{},'m_amount':100,'side':'D' });
    }).toThrowError('trying to set not allowed property some_random_ability_name');
 });


 it("should have object_id",function(){
     var d = new Actor({'abilities':{},'crafts':{},'m_amount':100, 'side':'D'});
     expect( d.object_id.length).toEqual(36);
 });

});