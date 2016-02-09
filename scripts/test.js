/**
  * This test file demonstrates the way a standard require.js page should respond when called.
  *
  * More info on the differences between define and require can be found here:
  * http://stackoverflow.com/a/18535142/4760751
  */

define(['jquery', 'd3'], function($, d3){

  var genesPopulated = false;
  var goPopulated = false;

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
    },

    visualizeCircles: function(){
      var maxRadius = 32, // maximum radius of circle
        padding = 1, // padding between circles; also minimum radius
        margin = {top: -maxRadius, right: -maxRadius, bottom: -maxRadius, left: -maxRadius},
        width = 450 - margin.left - margin.right,
        height = 275 - margin.top - margin.bottom;

      var k = 1, // initial number of candidates to consider per circle
          m = 10, // initial number of circles to add per frame
          n = 2500, // remaining number of circles to add
          newCircle = bestCircleGenerator(maxRadius, padding);

      var svg = d3.select("#sunMain").append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.timer(function() {
        for (var i = 0; i < m && --n >= 0; ++i) {
          var circle = newCircle(k);

          svg.append("circle")
              .attr("cx", circle[0])
              .attr("cy", circle[1])
              .attr("r", 0)
              .style("fill", "white")
              .style("fill-opacity", (Math.random() + .5) / 2)
            .transition()
              .attr("r", circle[2]);

          // As we add more circles, generate more candidates per circle.
          // Since this takes more effort, gradually reduce circles per frame.
          if (k < 500) k *= 1.01, m *= .998;
        }
        return !n;
      });

      function bestCircleGenerator(maxRadius, padding) {
        var quadtree = d3.geom.quadtree().extent([[0, 0], [width, height]])([]),
            searchRadius = maxRadius * 2,
            maxRadius2 = maxRadius * maxRadius;

        return function(k) {
          var bestX, bestY, bestDistance = 0;

          for (var i = 0; i < k || bestDistance < padding; ++i) {
            var x = Math.random() * width,
                y = Math.random() * height,
                rx1 = x - searchRadius,
                rx2 = x + searchRadius,
                ry1 = y - searchRadius,
                ry2 = y + searchRadius,
                minDistance = maxRadius; // minimum distance for this candidate

            quadtree.visit(function(quad, x1, y1, x2, y2) {
              if (p = quad.point) {
                var p,
                    dx = x - p[0],
                    dy = y - p[1],
                    d2 = dx * dx + dy * dy,
                    r2 = p[2] * p[2];
                if (d2 < r2) return minDistance = 0, true; // within a circle
                var d = Math.sqrt(d2) - p[2];
                if (d < minDistance) minDistance = d;
              }
              return !minDistance || x1 > rx2 || x2 < rx1 || y1 > ry2 || y2 < ry1; // or outside search radius
            });

            if (minDistance > bestDistance) bestX = x, bestY = y, bestDistance = minDistance;
          }

          var best = [bestX, bestY, bestDistance - padding];
          quadtree.add(best);
          return best;
        };
      }
    }
  };


  return Methods;
});
