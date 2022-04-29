`timescale 1ns / 1ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/6

module math_divider_csm_block( input wire a,      // x
										 input wire b,      // y
										 input wire bi,     // borrow in
										 input wire os,     // output select
										 output wire d,     // difference out
										 output wire bo );  // borrow out

    wire d1 = a ^ b ^ bi;
	 assign d = (os & a) + (~os & d1);
	 assign bo = (~a & b) + (bi & (~(a ^ b)));
endmodule
