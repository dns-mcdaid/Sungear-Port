/**
  * This test file demonstrates the way a standard require.js page should respond when called.
  *
  * More info on the differences between define and require can be found here:
  * http://stackoverflow.com/a/18535142/4760751
  */

define(['jquery', 'bootstrap'], function($, _){

  var Methods = {
    doSomething: function(){
      $('#foo').text('I got hot sauce in my bag.');
    }
  };

  return Methods;
});
