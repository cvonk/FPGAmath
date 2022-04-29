// Math, carry lookahead adder, partial full adder block
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

module math_adder_pfa_block( input wire a,      // a
								     input wire b,      // b
									  input wire ci,		// carry in
									  output wire s,     // sum
									  output wire p,     // propagate carry
								     output wire g );   // generate carry

    assign g = a & b;
	 assign p = a ^ b;
	 assign s = p ^ ci;
	 
endmodule