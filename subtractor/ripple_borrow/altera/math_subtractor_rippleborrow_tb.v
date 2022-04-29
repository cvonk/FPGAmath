// Math, ripple borrow subtractor, test bench
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

module math_subtractor_rippleborrow_tb;

   localparam N = 4;  // MUST MATCH default parameter N in math_subtractor_rippleborrow.v
	reg [N:0] a;  // extra bit for the loop
	reg [N:0] b;  // extra bit for the loop
	wire [N:0] d; // difference

	math_subtractor_rippleborrow uut( .a ( a[N-1:0] ), 
												 .b ( b[N-1:0] ), 
												 .d ( d ) );
	initial begin
		
		#100;  // Wait 100 ns for global reset to finish
        
		for (a = 0; a < 2**N; a = a + 1)
         for (b = 0; b <= a; b = b + 1)
            #10 if ( a - b != d )
                $display( "%d - %d != %d", a, b, d );

		$display("EOT");
	end
      
endmodule

