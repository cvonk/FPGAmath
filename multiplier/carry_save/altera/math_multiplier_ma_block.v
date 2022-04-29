// Math, carry save multiplier, multiplier adder module
//
// Platform: Altera Cyclone IV using Quartus 16.1
// Documentation: http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/6
//
// GNU GENERAL PUBLIC LICENSE Version 3, check the file LICENSE for more information
// (c) Copyright 2015-2016, Johan Vonk and Coert Vonk
// All rights reserved.  Use of copyright notice does not imply publication.
// All text above must be included in any redistribution

`timescale 1ns / 1ps
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
