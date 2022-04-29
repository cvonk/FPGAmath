`timescale 1ns / 10ps
`default_nettype none

module math_multiplier_ma_block( input wire x,      // x
											input wire y,      // y
											input wire si,     // sum in
											input wire ci,     // carry in
											output wire so,    // sum out
											output wire co );  // carry out

    wire p = x & y;
	 assign so = si ^ p ^ ci;
	 assign co = si & p | ci & (si ^ p);

endmodule
