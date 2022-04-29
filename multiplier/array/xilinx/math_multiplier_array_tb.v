`timescale 1ns / 100ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/4

module math_multiplier_array_tb;

   parameter N = 4;  // must match the default N in arraymultiplier.v
	reg [N:0] a;  // extra bit for the loop counter
	reg [N:0] b;  // extra bit for the loop counter
	wire [2*N-1:0] p;
	wire [N-1:0] s0, s1, s2, s3, s4;
	wire [N-1:0] s5, s6, s7;

	math_multiplier_array uut ( .a (a[N-1:0]), 
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
