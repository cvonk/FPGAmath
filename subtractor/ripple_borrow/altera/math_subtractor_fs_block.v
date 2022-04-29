// Math, ripple borrow subtractor, full subtractor block
//
// Platform: Altera Cyclone IV using Quartus >=16.1
// Documentation: https://coertvonk.com/hw/building-math-circuits/parameterized-adder-and-subtractor-in-verilog-30766
//
// GNU GENERAL PUBLIC LICENSE Version 3, check the file LICENSE for more information
// (c) Copyright 2015-2016,2022 Johan Vonk and Coert Vonk
// All rights reserved.  Use of copyright notice does not imply publication.
// All text above must be included in any redistribution


`timescale 1ns / 1ps
`default_nettype none

module math_subtractor_fs_block( input wire a,      // a
								         input wire b,      // b
								         input wire li,     // loan in
								         output wire d,     // difference
								         output wire lo );  // loan out
 
    assign d = a ^ b ^ li;
    assign lo = !a & b | li & !(a ^ b);
 
endmodule