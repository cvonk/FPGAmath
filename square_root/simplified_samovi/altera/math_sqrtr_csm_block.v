// Math, sqrt simplified samovi, controlled subtract-multiplex block
//
// Platform: Altera Cyclone IV using Quartus >=16.1
// Documentation: https://coertvonk.com/hw/building-math-circuits/parameterized-square-root-in-verilog-30778
//
// GNU GENERAL PUBLIC LICENSE Version 3, check the file LICENSE for more information
// (c) Copyright 2015-2016,2022, Johan Vonk and Coert Vonk
// All rights reserved.  Use of copyright notice does not imply publication.
// All text above must be included in any redistribution

`timescale 1ns / 1ps
`default_nettype none

module math_sqrt_csm_block( input wire a,      // x
									 input wire b,      // y
									 input wire bi,     // borrow in
									 input wire os,     // output select
									 output wire d,     // difference out
									 output wire bo );  // borrow out

    wire d1 = a ^ b ^ bi;
	 assign d = (os & a) + (~os & d1);
	 assign bo = (~a & b) + (bi & (~(a ^ b)));
endmodule
