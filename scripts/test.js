/**
  * This test file demonstrates the way a standard require.js page should respond when called.
  *
  * More info on the differences between define and require can be found here:
  * http://stackoverflow.com/a/18535142/4760751
  */

define(['jquery', 'p5'], function($, p5){

  var genesPopulated = false;
  var goPopulated = false;

  var myp5 = new p5(function( sketch ) {
      sketch.setup = function() {
        var HEIGHT = document.getElementById('sunGui').clientHeight;
        var WIDTH = document.getElementById('sunGui').clientWidth;
        var cnv = sketch.createCanvas(WIDTH,HEIGHT);
      }

      sketch.draw = function() {
        sketch.background(16,16,16);
        sketch.fill(0);

        if (sketch.mouseIsPressed) {
          sketch.fill(0);
        } else {
          sketch.fill(255);
        }
        sketch.ellipse(sketch.mouseX, sketch.mouseY, 80, 80);
      }
    }, 'sunGui');

  var Methods = {

    doSomething: function(){
      $('#foo').text('I got hot sauce in my bag.');
    },

    populateGenes: function(){

      if(genesPopulated){
        return;
      }

      genesPopulated = true;
      var geneDictionary = {};
      geneDictionary["At1g01040"] = "DEAD/DEAH";
      geneDictionary["At1g01050"] = "inorganic";
      geneDictionary["At1g01060"] = "myb family traits";
      geneDictionary["At1g01090"] = "pyruvate dehydration";
      geneDictionary["At1g01100"] = "60S acidic";
      geneDictionary["At1g01120"] = "fatty acid elongated";
      geneDictionary["At1g01130"] = "CBL-interactivity";
      geneDictionary["At1g01150"] = "expressed protein";
      geneDictionary["At1g01160"] = "SSXT protein-rich";
      geneDictionary["At1g01170"] = "ozone-responsive";
      geneDictionary["At1g01220"] = "GHMP kinasede";
      geneDictionary["At1g01250"] = "encodes a metosis";
      geneDictionary["At1g01630"] = "SEC14 cytososis";
      geneDictionary["At1g01640"] = "speckle type";

      var tbody = document.getElementById("geneTbody");

      for(var key in geneDictionary){
        if(geneDictionary.hasOwnProperty(key)){
          var row = tbody.insertRow(0);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = key;
          cell2.innerHTML = geneDictionary[key];
        }
      }
      $('#geneTbody tr').on('click', function(event) {
          $(this).addClass('highlight').siblings().removeClass('highlight');
      });
    },

    populateGoTerms: function(){

      if(goPopulated){
        return;
      }

      goPopulated = true;
      var goHierarchy = {};
      goHierarchy["-10;11231"] = "biological_process";
      goHierarchy["-1;14082"] = "cellular_component";
      goHierarchy["-9;13754"] = "biological_process";
      goHierarchy["-10;11231"] = "cellular_component";
      goHierarchy["-9;13754"] = "molecular_function";

      var goStraight = {};

      goStraight["13;6301"] = "biological_process";
      goStraight["5;494"] = "response to stress";
      goStraight["5;893"] = "transport";
      goStraight["5;969"] = "transporter activity";
      goStraight["4;267"] = "amino acid and derivative metabolism";
      goStraight["4;605"] = "development";
      goStraight["4;541"] = "hydrolase activity, acting on ester bonds";
      goStraight["4;210"] = "intracellular transport";
      goStraight["4;304"] = "lipid metabolism";
      goStraight["4;235"] = "nitrogen compound metabolism";

      var goDir = document.getElementById("goDir");
      var goList = document.getElementById("goList");

      for(var key in goHierarchy){
        if(goHierarchy.hasOwnProperty(key)){
          var node = document.createElement("li");
          var textnode = document.createTextNode("(" + key + ") " + goHierarchy[key]);
          node.appendChild(textnode);
          goDir.appendChild(node);
        }
      }

      for(var key in goStraight){
        if(goStraight.hasOwnProperty(key)){
          var node = document.createElement("li");
          var textnode = document.createTextNode("(" + key + ") " + goStraight[key]);
          node.appendChild(textnode);
          goList.appendChild(node);
        }
      }
    },

    removeGoTerms: function(){
      goPopulated = false;
      var goDir = document.getElementById("goDir");
      while(goDir.firstChild){
        goDir.removeChild(goDir.firstChild);
      }

      var goList = document.getElementById("goList");
      while(goList.firstChild){
        goList.removeChild(goList.firstChild);
      }
    }
  };

  return Methods;
});
