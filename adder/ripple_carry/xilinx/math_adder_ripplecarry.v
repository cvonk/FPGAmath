`timescale 1ns / 1ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/2

module math_adder_ripplecarry #( parameter N = 4)
										 ( input wire [N-1:0] a,b, // numbers to be added together
										   input wire ci,          // carry in
										   output wire [N:0] s,    // sum
										   output wire co);        // carry out
				  
   wire [N-2:0] c; // internal carries

   // array instantiation
   math_adder_fa_block fa [N-1:0] ( .a  ( a ),
												.b  ( b ),
												.ci ( {c, ci} ),
												.s  ( s[N-1:0] ),
												.co ( {s[N], c}) );
endmodule
