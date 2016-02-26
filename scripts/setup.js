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
    p5: 'lib/p5',
    keypress: 'lib/keypress-2.1.3.min',
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
  //Y.doSomething();
  document.getElementById("ctrlRestart").addEventListener("click", Y.visualizeCircles);
  document.getElementById("geneQuery").addEventListener("click", Y.populateGenes);
  document.getElementById("expand").addEventListener("click", Y.populateGoTerms);
  document.getElementById("collapse").addEventListener("click", Y.removeGoTerms);
});

// Call the main.js file to load the canvas and get rolling.
require(['main']);
