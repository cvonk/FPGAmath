// Math, ripple carry adder, main
//
// Platform: Altera Cyclone IV using Quartus 16.1
// Documentation: http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/3
//
// GNU GENERAL PUBLIC LICENSE Version 3, check the file LICENSE for more information
// (c) Copyright 2015-2016, Johan Vonk and Coert Vonk
// All rights reserved.  Use of copyright notice does not imply publication.
// All text above must be included in any redistribution

`timescale 1ns / 1ps
`default_nettype none

module math_adder_ripplecarry #( parameter N = 4 )
										 ( input wire [N-1:0] a,b, // numbers to be added together
										   output wire [N:0] s );  // sum
				  
   wire [N-2:0] c; // internal carry-out signals

   // array instantiation
   math_adder_fa_block fa [N-1:0] ( .a  ( a ),
												.b  ( b ),
												.ci ( {c[N-2:0], 1'b0} ),
												.s  ( s[N-1:0] ),
												.co ( {s[N], c[N-2:0]}) );

endmodule
