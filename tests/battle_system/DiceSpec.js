"use strict";

import { DicesGenerator }  from "../../src/DicesGenerator.js";

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) {
            if (!this[i].compare(testArr[i])) return false;
        }
        else if (this[i] !== testArr[i]) return false;
    }
    return true;
}

describe("DicesGenerator", function() {
  
   



  it("should be able to roll multiple dices within defined range", function() {

   var one= false,two=false,three=false,four=false,five=false,six=false;
   var dice_gen = DicesGenerator.getInstance();
   var t = dice_gen.getD6roll(100);
   expect(t.length).toEqual(100);

   t.forEach(function( v ) {

      expect( v >= 1 && v <=6).toBeTruthy();
      if ( v == 1 ) { one = true; } 
      if ( v == 2 ) { two = true; }
      if ( v == 3 ) { three = true; }
      if ( v == 4 ) { four = true; }
      if ( v == 5 ) { five = true; }
      if ( v == 6 ) { six = true}

   });
   expect(one).toEqual(true,"1 wasn't generated");
   expect(two).toEqual(true,"2 wasn't generated");
   expect(three).toEqual(true,"3 wasn't generated");
   expect(four).toEqual(true,"4 wasn't generated");
   expect(five).toEqual(true,"5 wasn't generated");
   expect(six).toEqual(true,"6 wasn't generated");

  });

  it("should be a Singleton. As the RNG should be seeded only once", function() {

       var dice_gen1 = DicesGenerator.getInstance();
       var dice_gen2 = DicesGenerator.getInstance();
       expect(dice_gen1 === dice_gen2).toEqual(true);
  });



  it("should generate the same rnd when initiated with the same seed", function() {
 
    var seed= Math.random();
    var err1 = 'The DicesGenerator initiated with the same seed returns different RND values';
    var dice_gen1, dice_gen2, dice_gen3, dice_gen4, dice_gen5, dice_gen6, dice_gen7,dice_gen8, d1,d2,d3,d4,d5,d6,d7,d8;

    dice_gen1 = DicesGenerator.getInstance(seed);

    d1 = dice_gen1.getD6roll(10);
    dice_gen1.reset(seed);   

    d2 = dice_gen1.getD6roll(10);
    expect(d1.compare(d2) ).toBeTruthy(true,err1 );

    dice_gen2 = DicesGenerator.getInstance(seed);
    d3 = dice_gen2.getD6roll(10);
    expect(d1.compare(d3) ).toBeTruthy(true,err1);

    dice_gen3 = DicesGenerator.getInstance(seed);
    d4 = dice_gen3.getD6roll(10);
    expect(d3.compare(d4) ).toBeTruthy(true,err1);


   //test passing multiple seeds
   dice_gen4 = DicesGenerator.getInstance(seed,1,2,3);
   d5=  dice_gen4.getD6roll(5); 
   
   dice_gen5 = DicesGenerator.getInstance(seed,1,2,3);
   d6 = dice_gen5.getD6roll(5);
   expect(d5.compare(d6) ).toBeTruthy(true,err1);


   dice_gen6 = DicesGenerator.getInstance(seed,1,2,3,5,6);
   d7 = dice_gen6.getD20roll(30);

   dice_gen7 = DicesGenerator.getInstance(seed,1,2,3,5,6);
   d8 = dice_gen7.getD20roll(30);
   expect(d7.compare(d8) ).toBeTruthy(true,err1);


});



});


