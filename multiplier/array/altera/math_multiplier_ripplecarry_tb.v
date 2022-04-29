// Math, ripple carry multiplier, test bench
//
// Platform: Altera Cyclone IV using Quartus 16.1
// Documentation: http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/5
//
// GNU GENERAL PUBLIC LICENSE Version 3, check the file LICENSE for more information
// (c) Copyright 2015-2016, Johan Vonk and Coert Vonk
// All rights reserved.  Use of copyright notice does not imply publication.
// All text above must be included in any redistribution

`timescale 1ns / 1ps
`default_nettype none

module math_multiplier_ripplecarry_tb;

   parameter N = 4;  // MUST MATCH the default parameter N in arraymultiplier.v
	reg [N:0] a;  // extra bit for the loop counter
	reg [N:0] b;  // extra bit for the loop counter
	wire [2*N-1:0] p;

	math_multiplier_ripplecarry uut ( .a (a[N-1:0]), 
		                               .b (b[N-1:0]), 
		                               .p (p) );
	initial begin
      #100; // wait 100 ns for global reset to finish
		  
      for ( a = 0; a < 2**N; a = a + 1 )
         for ( b = 0; b < 2**N; b = b + 1 )
			   #20 if ( a * b != p )
                $display( "%d * %d != %d", a, b, p );
		$display("EOT");
	end
	
endmodule
