// Math, carry save multiplier, test bench
//
// Platform: Altera Cyclone IV using Quartus >=16.1
// Documentation: https://coertvonk.com/hw/building-math-circuits/faster-parameterized-multiplier-in-verilog-30774
//
// GNU GENERAL PUBLIC LICENSE Version 3, check the file LICENSE for more information
// (c) Copyright 2015-2016,2022, Johan Vonk and Coert Vonk
// All rights reserved.  Use of copyright notice does not imply publication.
// All text above must be included in any redistribution

`timescale 1ns / 1ps
`default_nettype none

module math_multiplier_carrysave_tb;

   parameter N = 4;  // must match default N in math_multiplier_carrysave()
	reg [N:0] a;  // extra bit for the loop counter
	reg [N:0] b;  // extra bit for the loop counter
	wire [2*N:0] p;

	math_multiplier_carrysave #(N) uut ( .a (a[N-1:0]), 
													 .b (b[N-1:0]), 
													 .p (p) );
	initial begin
      #100; // wait 100 ns for global reset to finish

      for (a = 0; a < 2**N; a = a + 1)
         for (b = 0; b < 2**N; b = b + 1)
			   #30 if ( a * b != p )
                $display("%d * %d != %d", a, b, p );
					 
		$display("EOT");
	end
endmodule
