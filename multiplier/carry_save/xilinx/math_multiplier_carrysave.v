`timescale 1ns / 10ps
`default_nettype none
// (c) 2015, by Coert Vonk
// http://www.coertvonk.com/technology/logic/fpga-math-verilog-12758/5

module math_multiplier_carrysave #( parameter N = 4)
									       ( input wire [N-1:0] a,
									         input wire [N-1:0] b,
									         output wire [N*2-1:0] p );
							
   wire [N+1:0] s [N:0];
   wire [N+1:0] c [N:0];
	 
   generate
      genvar ii, jj;
	   for ( ii = 0; ii <= N; ii = ii + 1) begin: gen_ii
         for ( jj = 0; jj < N; jj = jj + 1) begin: gen_jj

            math_multiplier_ma_block ma(
				       .x  ( ii < N ? a[jj] : (jj > 0) ? c[4][jj-1] : 1'b0 ),
                   .y  ( ii < N ? b[ii] : 1'b1 ),
                   .si ( ii > 0 && jj < N - 1 ? s[ii-1][jj+1] : 1'b0 ),
                   .ci ( ii > 0 ? c[ii-1][jj] : 1'b0 ),
                   .so ( s[ii][jj] ),
                   .co ( c[ii][jj] ) );

				if ( ii == N ) assign p[N+jj] = s[N][jj];
         end

			assign p[ii] = s[ii][0];
       end
		 // ignore the last carry, instead of doing assign p[N*2]  = c[N][N-1];
   endgenerate

endmodule
