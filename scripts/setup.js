/**
  * Setup file used to designate which resources will need to be loaded
  * in order for Sungear Javascript edition to work properly.
  */


requirejs.config({
  baseUrl: 'scripts',
  shim: {
    // Designate which resources rely on other ones.
    bootstrap: {
      deps: ['jquery'],
      exports: 'Bootstrap'
    }
  },
  paths: {
    // First get the external libraries necessary to run the application.
    // If the CDN location fails, we can load a local version.
    jquery: [
      'https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min',
      'lib/jquery.min'
    ],
    bootstrap: [
      'http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
      'lib/bootstrap.min'
    ],
    d3: [
      'http://d3js.org/d3.v3.min',
      'lib/d3.min'
    ],
    keypress: 'lib/keypress-2.1.3.min'
    // With the external libraries out of the way, we can move onto grabbing real Sungear files.

    // From the Genes folder
    anchor: 'genes/anchor',
    genesGene: 'genes/gene',
    geneEvent: 'genes/geneEvent',
    term: 'genes/term',
    vessel: 'genes/vessel',
    
    // From the GeneLights folder
    anchorList: 'geneLights/anchorList',
    geneLightsGene: 'geneLights/gene',
    geneLoc: 'geneLights/geneLoc',
    label: 'geneLights/label',
    parseData: 'geneLights/parseData'
  }
});

// See 'test.js' for more info on how this function works.
require(['test'], function(Y){
  Y.doSomething();
});

// Give credit to your libraries.
require(["d3", "jquery", "bootstrap"], function(d3, jquery, bootstrap) {
  d3.select("body").append("i").text("Powered by jQuery, Bootstrap, RequireJS and d3 " + d3.version);
});

// Call the main.js file to load the canvas and get rolling.
require(['main']);
