/*
Radhika Mattoo, March 2016
Test File for gene folder
@radhikamattoo | rm3485@nyu.edu
*/
var Anchor = require('./anchor');
var Gene = require('./gene');
var GeneEvent = require('./geneEvent');
var Term = require('./term');
var Vessel = require('./vessel');

console.log("\nANCHOR");
console.log("------------");
var anchor = new Anchor("radhika");
var otherAnchor = new Anchor("notRadhika");
console.log(anchor.compare(otherAnchor)); //should be positive
console.log(otherAnchor.compare(anchor)); //negative

console.log("\nGENE");
console.log("------------");
var gene = new Gene("Radhika", "super cool");
console.log(gene.getName()); //Radhika
console.log(gene.getDesc()); //super cool
var expressions = ['yes', 'no'];
gene.setExp(expressions);
console.log(gene.getExp()); //[yes, no]

var otherGene = new Gene("notRadhika", "not super cool");
console.log(gene.compare(otherGene)); //positive
console.log(otherGene.compare(gene)); // negative
console.log(gene.toString()); //Radhika

console.log("\nVESSEL");
console.log("------------");
var anchorArray = [anchor, otherAnchor];
var vessel = new Vessel(anchorArray);
console.log(vessel.toString()); //radhika | notRadhika
vessel.addGene(gene);
console.log(vessel.getFullCount()); //1


console.log("\nGENEEVENT");
console.log("------------");
var geneList = ['tester'];
var source = {"source": "event"};
var type = "eventType";
var geneEvent = new GeneEvent(geneList, source, type);
console.log(geneEvent.getGeneList()); //[tester]
console.log(geneEvent.getSource()); //{source:event}
console.log(geneEvent.getType()); //eventType


console.log("\nTERM");
console.log("------------");
var term = new Term(1234, "radhika");
var parentTerm = new Term(1123, "mom");
var childTerm = new Term(2345, "child");
term.setRatio(10);

term.addChild(childTerm);
term.addParent(parentTerm);
console.log(term.getChildren()); //child object
console.log(term.getParents()); //mom object
term.addGene(otherGene);
console.log(term.isRoot()); //false
term.setActive(false);
console.log(term.isActive()); //false
console.log(term.getAllGenes()); //notRadhika gene obj
console.log(term.getId() + "," + term.getName()); //1234, radhika

var list = [gene, otherGene];
console.log(term.getIntersectCount(list)); //1
console.log(parentTerm.compare(term)); //negative
console.log(term.compare(childTerm)); //positive
console.log(term.toString()); //(0;-1) radhika
term.setTotal(20);
console.log(term.updateHyp(10));//0.000005412544112234511
console.log(term.getHyp()); //0.000005412544112234511

term.updateStoredCount(list);
console.log(term.getStoredCount()); //1
term.resetStoredCount();
console.log(term.getStoredCount()); //-1
term.initUnion();
console.log(term.getAllGenes()); //null
term.findUnion(list);
console.log(term.getAllGenes()); //notRadhika
console.log(term.getSelectedState());//STATE_UNKNOWN (0)
term.initSelectedState();
term.updateSelectedState(list);
console.log(term.getSelectedState()); //either selected or unselected (1 or 2)
