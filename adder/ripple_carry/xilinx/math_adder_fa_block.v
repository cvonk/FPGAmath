`timescale 1ns / 1ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/2

module math_adder_fa_block( input wire a,      // a
								    input wire b,      // b
								    input wire ci,     // carry in
								    output wire s,     // sum
								    output wire co );  // carry out
 
    assign s = a ^ b ^ ci;
    assign co = a & b | ci & (a ^ b);
 
endmodule