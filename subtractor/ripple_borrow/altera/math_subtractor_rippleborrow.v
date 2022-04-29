// Math, ripple borrow subtractor, main
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

module math_subtractor_rippleborrow #( parameter N = 4 )
										       ( input wire [N-1:0] a,b, // numbers to be added together
										         output wire [N:0] d );  // difference
				  
   wire [N-2:0] l; // internal loan-out signals

   // array instantiation
   math_subtractor_fs_block fs [N-1:0] ( .a  ( a ),
												     .b  ( b ),
												     .li ( {l[N-2:0], 1'b0} ),
												     .d  ( d[N-1:0] ),
												     .lo ( {d[N], l[N-2:0]}) );
endmodule
