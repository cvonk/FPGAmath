`timescale 1ns / 100ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/4

module math_multiplier_array #( parameter N = 4 )
                              ( input wire [N-1:0] a,
                                input wire [N-1:0] b,
                                output wire [N*2-1:0] p );
							
   wire [N-1:0] s [N:0];
   wire [N-1:0] c [N:0];
	 
   generate
      genvar ii, jj;
	   for ( ii = 0; ii < N; ii = ii + 1) begin: gen_ii
         for ( jj = 0; jj < N; jj = jj + 1) begin: gen_jj

            math_multiplier_ma_block ma( .x  ( a[jj] ),
                   .y  ( b[ii]),
                   .si ( ii == 0 ? 1'b0 : jj < N - 1 ? s[ii-1][jj+1] : c[ii-1][N-1] ),
                   .ci ( jj > 0 ? c[ii][jj-1] : 1'b0 ),
                   .so ( s[ii][jj] ),
                   .co ( c[ii][jj] ) );
         end
			assign p[ii] = s[ii][0];
       end
    
       for ( jj = 1; jj < N; jj = jj + 1) begin: gen_jj2
		     assign p[jj+N-1] = s[N-1][jj];
	    end
		 
		 assign p[N*2-1] = c[N-1][N-1];
   endgenerate
	
endmodule
