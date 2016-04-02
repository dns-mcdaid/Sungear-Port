/*
Radhika Mattoo, March 2016
Test File for geneLights folder
@radhikamattoo | rm3485@nyu.edu
*/

// define(['jquery', 'p5'], function($, p5){
// });
// var Label = require('./Label');
// var geneLoc = require('./geneLoc');
// var Gene = require('./gene');
// var anchorList = require('./anchorList');
//-------------------------------Label.js-------------------------------------//
console.log("LABEL");
console.log("------------");
var label = new Label("radhika", true);
console.log(label.getName()); //radhika
console.log(label.isCool()); //true
console.log(label.toString()); //radhika

var otherLabel = new Label("notRadhika", false);
console.log(label.compare(otherLabel)); //1
console.log(label.equals(otherLabel)); //false
console.log(label.equals(new Label("radhika", false))+ "\n"); //true

//------------------------------geneLoc.js------------------------------------//
console.log("GENELOC");
console.log("------------");
var geneloc = new geneLoc(1234, 12);
console.log(geneloc.getListID() + "," + geneloc.getOffset() + "\n"); //1234, 12

//-------------------------------Gene.js--------------------------------------//
console.log("GENE");
console.log("------------");
var gene = new Gene("radhika", 100);
console.log(gene.getName() + "," + gene.getValue()); //radhika, 100

var otherGene = new Gene("notRadhika", 200);
console.log(gene.compare(otherGene)); //-1
console.log(gene.equals(new Gene("radhika", 100))); //true
console.log(gene.equals(otherGene)+ "\n");//false


//----------------------------anchorList.js-----------------------------------//
console.log("ANCHOR LIST");
console.log("------------");

var anchorList = new anchorList("radhika");
console.log(anchorList.getName()); //radhika
anchorList.addGene(gene);
anchorList.addGene(otherGene);
console.log(anchorList.getOriGeneList());//[radhika, notRadhika gene objects]
console.log(anchorList.contains(gene)); //true
console.log(anchorList.contains(new Gene("test", 1222))); //false

anchorList.addEffectiveGene(gene);
console.log(anchorList.getEffectiveGenes()); //[radhika] gene object
console.log(anchorList.sizeOfEffectiveGenes()); //1

var testSet = [otherGene, gene];
anchorList.setEffectiveGenes(testSet);
console.log(anchorList.getEffectiveGenes());//[notradhika, Radhika] gene objects
console.log(anchorList.sizeOfEffectiveGenes()); //2

anchorList.sortEffectiveGenes();
console.log(anchorList.getSortedGenes()); //[radhika, notRadhika]
console.log(anchorList.getEffectiveGenes());//[notradhika, Radhika] gene objects

console.log(anchorList.getMinValue()); //100
console.log(anchorList.getMaxValue()); //200

console.log(anchorList.size()); //2
console.log(anchorList.getSelectedGenes()); //null










//----------------------------------------------------------------------------//
