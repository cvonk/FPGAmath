//
// UNFINISHED WORK
//

// Math, carry lookahead adder, main
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

module math_adder_carrylookahead2lvl #( parameter int N = 16 )   // word size
										        ( input wire [N-1:0] a,b, // numbers to be added together
										          output wire [N:0] s );  // sum

	localparam int M = (N + 3) >> 2 << 2; // round up to multiple of 4
	wire [M-1:0] c, p, g;        // 1st level
	wire [(M/4)-1:0] c2, p2, g2, dontcare; // 2nd level

	math_adder_pfa_block pfa [N] ( .a  ( a ), 
											 .b  ( b ),
											 .ci ( { c[N-2:0], 1'b0 } ),
											 .s  ( s[N-1:0] ),
											 .p  ( p[N-1:0] ),
											 .g  ( g[N-1:0] ) );

	generate genvar ii;
		for (ii = 0; ii < M/4; ii = ii + 1)
			begin :gen_ii
				math_adder_pcla_block pcla( .ci ( ii == 0 ? 1'b0 : c[(ii-1)*4+3] ),
												    .p  ( p[ii*4+3 : ii*4] ),
												    .g  ( g[ii*4+3 : ii*4] ),
												    .c  ( { dontcare[ii], c[ii*4+2 : ii*4] } ),
												    .po ( p2[ii] ),
												    .go ( g2[ii] ) );
			end
	endgenerate

	math_adder_pcla_block pcla( .ci ( 1'b0 ),
										 .p  ( p2 ),
										 .g  ( g2 ),
										 .c  ( {c[15], c[11], c[7], c[3]} ) );

	assign s[N] = c[N-1];

endmodule
