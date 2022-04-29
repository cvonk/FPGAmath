// Math, carry lookahead adder, carry lookahead logic
//
// Platform: Altera Cyclone IV using Quartus 16.1
// Documentation: http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/4
//
// GNU GENERAL PUBLIC LICENSE Version 3, check the file LICENSE for more information
// (c) Copyright 2015-2016, Johan Vonk and Coert Vonk
// All rights reserved.  Use of copyright notice does not imply publication.
// All text above must be included in any redistribution

`timescale 1ns / 1ps
`default_nettype none

module math_adder_pcla_block( input wire ci,
									   input wire [3:0] p,    // propagate inputs
								      input wire [3:0] g,    // generate inputs
									   output wire [3:0] c,   // carry to pfa and carry out
										output wire po,        // propagate output
										output wire go	);      // generate output
 
	 assign c[0] = g[0] | ci & p[0];

	 assign c[1] = g[1] | g[0] & p[1] | ci & p[0] & p[1];

	 assign c[2] = g[2] | g[1] & p[2] | 
	               g[0] & p[1] & p[2] | ci & p[0] & p[1] & p[2];

	 assign c[3] = g[3] | g[2] & p[3] | 
	               g[1] & p[2] & p[3] | 
	               g[0] & p[1] & p[2] & p[3] | ci & p[0] & p[1] & p[2] & p[3];
						
	 assign po = &p;
	 
	 assign go = g[3] | p[3] & g[2] | p[3] & p[2] & g[1] | p[3] & p[2] & p[1] & g[0];
	  
endmodule