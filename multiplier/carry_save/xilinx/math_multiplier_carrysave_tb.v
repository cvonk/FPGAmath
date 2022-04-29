`timescale 1ns / 1ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/5

module math_multiplier_carrysave_tb;

   parameter N = 4;  // must match default N in math_multiplier_carrysave
	reg [N:0] a;  // extra bit for the loop counter
	reg [N:0] b;  // extra bit for the loop counter
	wire [2*N:0] p;

	math_multiplier_carrysave #(N) uut ( .a (a[N-1:0]), 
													 .b (b[N-1:0]), 
													 .p (p) );
	initial begin
      #100; // wait 100 ns for global reset to finish
		  
		// this one still generates an error
		a = 32'hF00D; b = 32'h0DAD;
		#30 if ( a * b != p )
			$display("%h * %h != %h", a, b, p );
			
		#100
      for (a = 0; a < 2**N; a = a + 1)
         for (b = 0; b < 2**N; b = b + 1)
			   #30 if ( a * b != p )
                $display("%d * %d != %d", a, b, p );
					 
		$display("EOT");
	end
endmodule
