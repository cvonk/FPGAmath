// Math, sqrt simplified samovi, test bench
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

module math_sqrt_simplifiedsamovi_tb;

   parameter xWIDTH = 8;  // MUST MATCH default parameter in UUT
	parameter yWIDTH = 4;  // MUST MATCH default parameter in UUT
	
	reg [xWIDTH:0] x;  // extra bit for the loop counter
	reg [yWIDTH:0] y;  // extra bit for the loop counter
	wire [xWIDTH-1:0] q;
	wire [yWIDTH:0] r;

	math_sqrt_simplifiedsamovi uut ( .x( x[xWIDTH-1:0] ), 
											   .y( y[yWIDTH-1:0] ), 
											   .q( q ), 
											   .r( r ) );

	initial begin
		#100; // wait 100 ns for global reset to finish

		for (x = 0; x < 2**xWIDTH; x = x + 1)
			for (y = 1; y < 2**yWIDTH; y = y + 1)
					#100 if ( x / y != q || x % y != r )
						 $display("%d / %d != %d r%d", x, y, q, r );	 
		$display("EOT");
	end
endmodule


