`timescale 1ns / 1ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/2

module math_adder_ripplecarry_tb;

   localparam N = 4;  // must match default N in math_adder_ripplecarry.v
	reg [N:0] a;  // extra bit for the loop
	reg [N:0] b;  // extra bit for the loop
	reg ci;
	wire [N:0] s;
	wire co;

	math_adder_ripplecarry #(N) uut ( .a (  a[N-1:0] ), 
												 .b (  b[N-1:0] ), 
												 .ci( ci ), 
												 .s (  s ), 
												 .co( co ) );
	initial begin
		ci = 0;
		
		#100;  // Wait 100 ns for global reset to finish
        
		for (a = 0; a < 2**N; a = a + 1)
         for (b = 0; b < 2**N; b = b + 1)
            #10 if ( a + b != s )
                $display( "%d + %d != %d", a, b, s );

		$display("EOT");
	end
      
endmodule

