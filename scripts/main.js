/**
 * Interactive generalization of a Venn diagram to many dimensions.
 * @author crispy & RajahBimmy
 */

var WIDTH = 800;
var HEIGHT = 600;
var clicked = false;

var canvas = document.getElementById("sungear_plot");
var context = canvas.getContext("2d");

(function()
{
	/** Sungear display outer radius */
    public static final double R_OUTER = 1.2;
    /** Sungear circle radius */
    public static final double R_CIRCLE = 1.0;
    /** Default text/graphics color */
    public static final String C_PLAIN = '#d0d0d0';
    /** Highlighted text/graphics color */
    public static final String C_HIGHLIGHT = '#ffa0a0';
    /** Selected text/graphics */
    public static final String C_SELECT = '#ffffa0';
    /** Display size of largest vessel */
    double vRadMax = 0.1;
    /** Item count of largest vessel */
    double vMax;
    /** Item count of smallest vessel */
    double vMin;
    /** Set true to run relaxation algorithm for vessel position after narrow, false for deterministic positioning */
    boolean relax;
    /** Set true for polar Sungear plot, false for default Cartesian */
    boolean polarPlot;
    boolean showArrows;
    double[] minRad = { 0.000, 0.005, 0.010, 0.015, 0.020 };
    int minRadIdx;
    // DECLARE GENELIST AND OTHER FEATURES (Lines 94 - 121)

    function sunGear(GeneList genes, float thresh)
    {
    	var genes = genes;
    	var thresh = thresh;
    	// More lines here

    	polarPlot = false;
    	showArrows = true;
    	minRadIdx = 0;

    	// Fill the canvas
    	context.rect(0, 0, WIDTH, HEIGHT);
		context.fillStyle = "black";
		context.fill();
    }
})();