/*
Radhika Mattoo, November 2015 N.Y.

Porting Sungear from Java to Javascript,
Translated from Ilyas Mounaime's Java code 

*/
var FastMathPI = (105414357.0 / 33554432.0) + 1.984187159361080883e-9;

var FastMathE = (2850325.0 / 1048576.0) + 8.254840070411028747e-8;

var RECOMPUTE_TABLES_AT_RUNTIME = false;

var EXP_INT_TABLE_MAX_INDEX = 750;

var EXP_INT_TABLE_LEN = EXP_INT_TABLE_MAX_INDEX * 2;

var LN_MANT_LEN = 1024;

var EXP_FRAC_TABLE_LEN = 1025; 

var TWO_POWER_52 = 4503599627370496.0;

var TWO_POWER_53 = 2 * TWO_POWER_52;

var F_1_2 = 1/2; 
 
var F_1_3 = 1/3; 

var HEX_40000000 = 0x40000000;

var LN_2_A = 0.693147063255310059;

var LN_2_B = 1.17304635250823482e-7;

var LN_MANT;

var EXP_INT_TABLE_A;

var EXP_INT_TABLE_B;

var LN_QUICK_COEF = [
	[1.0, 5.669184079525E-24],
	[-0.25, -0.25],
	[0.3333333134651184, 1.986821492305628E-8],
	[-0.25, -6.663542893624021E-14],
	[0.19999998807907104, 1.1921056801463227E-8],
	[-0.1666666567325592, -7.800414592973399E-9],
	[0.1428571343421936, 5.650007086920087E-9],
	[-0.12502530217170715, -7.44321345601866E-11],
	[0.11113807559013367, 9.219544613762692E-9],
];

var LN_HI_PREC_COEF = [
	[1.0, -6.032174644509064E-23],
	[-0.25, -0.25],
	[0.3333333134651184, 1.9868161777724352E-8],
	[-0.2499999701976776, -2.957007209750105E-8],
	[0.19999954104423523, 1.5830993332061267E-10],
	[-0.16624879837036133, -2.6033824355191673E-8]
];


function lnMant(){
// 	if (RECOMPUTE_TABLES_AT_RUNTIME) {
// 	LN_MANT = new double[FastMath.LN_MANT_LEN][];
// 
// 	// Populate lnMant table
// 	for (int i = 0; i < LN_MANT.length; i++) {
// 		final double d = Double.longBitsToDouble( (((long) i) << 42) | 0x3ff0000000000000L );
// 		LN_MANT[i] = FastMathCalc.slowLog(d);
// 	}
// } else { IGNORING THIS FOR NOW!
	LN_MANT = FastMathLiteralArraysLoadLnMant();
//}

	
	
}


function ExpIntTable(){
// 	if(RECOMPUTE_TABLES_AT_RUNTIME){
// 		var EXP_INT_TABLE_A = new Array(EXP_INT_TABLE_LEN);
// 		var EXP_INT_TABLE_B = NEW Array(EXP_INT_TABLE_LEN);
// 	
// 		var tmp = new Array(2);
// 		var recip = new Array(2);
	//IGNORING THIS FOR NOW. HAVE TO IMPLEMENT FASTMATHCALC METHODS 
	// 	for(i = 0; i < EXP_INT_TABLE_MAX_INDEX; i++){ 
// 			FastMathCalcExpint(i, tmp);
// 			EXP_INT_TABLE_A[i + EXP_INT_TABLE_MAX_INDEX] = tmp[0];
// 			EXP_INT_TABLE_B[i + EXP_INT_TABLE_MAX_INDEX] = tmp[1];
// 		
// 			if(i != 0){
// 				FastMathCalcSplitReciprocal(tmp, recip);
// 				    EXP_INT_TABLE_A[FastMath.EXP_INT_TABLE_MAX_INDEX - i] = recip[0];
//                     EXP_INT_TABLE_B[FastMath.EXP_INT_TABLE_MAX_INDEX - i] = recip[1];
// 				
// 				
// 			}
// 		}
// 	}else{
	     EXP_INT_TABLE_A = FastMathLiteralArraysLoadExpIntA();
         EXP_INT_TABLE_B = FastMathLiteralArraysLoadExpIntB();
//	}


}
function FastMath(){} 

function FastMathMin(a, b){
	if(a <= b){ return a;}
	else return b; 

}

function FastMathMax(a, b){
	if(a <= b){ return b;}
	else return a; 

}


function FastMathExp(x, extra, hiPrec){
	var intPartA; 
	var intPartB;
	var intVal;
	
	if(x < 0.0){
		intVal = -x; 
		
		if(intVal > 746){
			if(hiPrec != null){
				hiPrec[0] = 0.0;
				hiPrec[1] = 0.0;
			}
			return 0.0;
		}
		
		if(intVal > 709){
			var result = exp(x + 40.19140625, extra, hiPrec) / 285040095144011776.0;
			if(hiPrec != null){
				hiPrec[0] /= 285040095144011776.0;
				hiPrec[1] /= 285040095144011776.0;
				
			}
			return result;
		}
		if(intVal == 709){
			var result =  exp(x+1.494140625, extra, hiPrec) / 4.455505956692756620;
			if(hiPrec != null){
				hiPrec[0] /= 4.455505956692756620;
				hiPrec[1] /= 4.455505956692756620;
			}
			return result; 
		}
		intVal++; 
		
		ExpIntTable(); 
		intPartA = EXP_INT_TABLE_A[EXP_INT_TABLE_MAX_INDEX-intVal];
		intPartB = EXP_INT_TABLE_B[EXP_INT_TABLE_MAX_INDEX-intVal]; 
		
		intVal = -intVal;
	}else{
		intVal = x; 
		if(intVal > 709){
			if(hiPrec!= null){
				hiPrec[0] = Number.POSITIVE_INFINITY; 
				hiPrec[1] = 0.0;
			}
			return Number.POSITIVE_INFINITY;
		}
		ExpIntTable();
		intPartA = EXP_INT_TABLE_A[EXP_INT_TABLE_MAX_INDEX + intVal];
		intPartB = EXP_INT_TABLE_B[EXP_INT_TABLE_MAX_INDEX + intVal]; 		
		
	}
}

 function FastMathLog(x, hiPrec){
	if(x == 0) {return Number.NEGATIVE_INFINITY; }
	
	if(x <= 0.0 || isNaN(x)){
		if(x != 0.0){
			if (hiPrec != null){
				hiPrec[0] = Number.Nan;
			}
			return Number.Nan
		}
	}
	
	var bits = (x).toString(16); //hexadecimal 
	if((bits & 0x8000000000000000) != 0 || isNaN(x)){
		if(x != 0.0){
			if(hiPrec != null){
				hiPrec[0] = Number.Nan;
			}
			return Number.Nan; 
		}
		
	}
	
	if(x == Number.POSITIVE_INFINITY){
		if (hiPrec != null){
			hiPrec[0] = Number.POSITIVE_INFINITY;
		}
		return Number.POSITIVE_INFINITY;
	}
 	var exp = (bits >> 52) - 1023; //get exponent 
 	
 	if((bits & 0x7ff0000000000000) == 0){
		if(x == 0){
			if(hiPrec != null){
				hiPrec[0] = Number.NEGATIVE_INFINITY;
			}
			return Number.NEGATIVE_INFINITY;
		}
		
 		//normalize number
 		bits = bits << 1;
//   		while((bits & 0x0010000000000000) == 0) {
//  			--exp;
//  			bits = bits << 1; 
// 		
//  		}
		
 	}
	
	if(exp == -1 || exp == 0){
		if (x < 1.01 && x > 0.99 && hiPrec == null) {
			var xa = x - 1.0;
			var xb = xa - x + 1.0;
			var tmp = xa * HEX_40000000;
			var aa = xa + temp - temp;
			var ab = xa - aa;
			xa = aa;
			xb = ab; 
			
			var lnCoeg_last = LN_QUICK_COEF[LN_QUICK_COEF.length - 1];
			var ya = lnCoef_lab[0];
			var yb = lnCoef_lab[1];
			
			for (i = LN_QUICK_COEF.length - 2; i >= 0; i--) {
				aa = ya * xa;
				ab = ya * xb + yb * xa + yb * xb;
				
				tmp = aa * HEX_40000000;
				ya = aa + tmp - tmp;
				yb = aa - ya + ab;
				
				var lnCoef_i = LN_QUICK_COEF[i];
				aa = ya + lnCoef_i[0];
				ab = yb + lnCoef_i[1];
				
				tmp = aa * HEX_40000000;
				ya = aa + tmp - tmp;
				yb = aa - ya + ab;
			}
			aa = ya * xa;
			ab = ya * xb + yb * xa + yb * xb;
			
			tmp = aa * HEX_40000000;
			ya = aa + tmp - tmp;
			yb = aa - ya + ab;

			return ya + yb;
			
		} 
	}
	lnMant(); 
	var lnm = LN_MANT[Math.round(((bits & 0x000ffc0000000000) >> 42))];
	var epsilon = (bits & 0x3ffffffffff)/ (TWO_POWER_52 + (bits & 0x000ffc0000000000));
	var lnza = 0.0;
	var lnzb = 0.0; 
	
	if(hiPrec != null){
		//split epsilon --> x
		var tmp = epsilon * HEX_40000000;
		var aa = epsilon + tmp - tmp;
		var ab = epsilon - aa;
		var xa = aa;
		var xb = ab;
		
		//Need a more accurate epsilon, so adjust the division
		var numer = bits & 0x3ffffffffff;
		var denom = TWO_POWER_52 + (bits & 0x000ffc0000000000);
		aa = numer - xa*denom - xb * denom;
        xb += aa / denom;
        
        var lnCoef_last = LN_HI_PREC_COEF[LN_HI_PREC_COEF.length-1];
		var ya = lnCoef_last[0];
		var yb = lnCoef_last[1];
		
		for(i = LN_HI_PREC_COEF.length - 2; i >= 0; i--) {
		
			aa = ya * xa;
			ab = ya * xb + yb * xa + yb * xb;
			
			tmp = aa * HEX_40000000;
			ya = aa + tmp - tmp;
			yb = aa - ya + ab;

			
			var lnCoef_i = LN_HI_PREC_COEF[i];
			aa = ya + lnCoef_i[0];
			ab = yb + lnCoef_i[1];
		
			tmp = aa * HEX_40000000;
			ya = aa + tmp - tmp;
			yb = aa - ya + ab;
			
		}
		
     	aa = ya * xa;
        ab = ya * xb + yb * xa + yb * xb;
	
		lnza = aa + ab;
		lnzb = -(lnza - aa - ab);
	}else{//high precision not required
		lnza = -0.16624882440418567;
		lnza = lnza * epsilon + 0.19999954120254515;
		lnza = lnza * epsilon + -0.2499999997677497;
		lnza = lnza * epsilon + 0.3333333333332802;
		lnza = lnza * epsilon + -0.5;
		lnza = lnza * epsilon + 1.0;
		lnza = lnza * epsilon;
	
	}
	var a = LN_2_A*exp;
	var b = 0.0;
	var c = a+lnm[0];
	var d = -(c-a-lnm[0]);
	a = c;
	b = b + d;

	c = a + lnza;
	d = -(c - a - lnza);
	a = c;
	b = b + d;

	c = a + LN_2_B*exp;
	d = -(c - a - LN_2_B*exp);
	a = c;
	b = b + d;

	c = a + lnm[1];
	d = -(c - a - lnm[1]);
	a = c;
	b = b + d;

	c = a + lnzb;
	d = -(c - a - lnzb);
	a = c;
	b = b + d;

	if (hiPrec != null) {
		hiPrec[0] = a;
		hiPrec[1] = b;
	}

	return a + b;
	
	
}



function FastMathAbs(x){
	if(x < 0){return -x;}
	return x; 
}

function FastMathFloor(x){
	if(isNaN(x)){
		return x;
	}
	if (x >= TWO_POWER_52 || x <= -TWO_POWER_52) {
		return x;
	}
	return Math.floor(x); 
	
	
}

function FastMathLog1p(x){ //needed in Gamma.js
	if(x == -1){
		return Number.NEGATIVE_INFINITY; 
	}
	if(x == Number.POSITIVE_INFINITY){
		return Number.POSITIVE_INFINITY;
	}
	if (x > 1e-6 || x < -1e-6) {
			var xpa = 1 + x;
			var xpb = -(xpa - 1 - x);
			
			hiPrec = new Array(2); 
			var lores = FastMathLog(xpa, hiPrec);
			if(!isFinite(lores)){
				return lores;
			}
			
			var fx1 = xpb/xpa;
			var epsilon =  0.5 * fx1 + 1;
			return epsilon * fx1 + hiPrec[1] + hiPrec[0];
		}else{
			var y = (x * F_1_3 - F_1_2) * x + 1;
			return y * x;
	}
}


