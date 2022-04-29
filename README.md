# FPGAmath

## Building math circuits

[![GitHub Discussions](https://img.shields.io/github/discussions/cvonk/FPGAmath)](https://github.com/cvonk/FPGAmath/discussions)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/cvonk/FPGAmath)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/cvonk/CALalarm/esp-idf)
![GitHub](https://img.shields.io/github/license/cvonk/FPGAmath)

The article <a href=https://coertvonk.com/category/hw/building-math-circuits">Building Math Circuits</a> describes how elementary math operations, such as addition/subtraction, multiplication/division and square root, can be done using logic circuits.

The repository contains HTML simulations used in the article, as well as Verilog HDL implementations of

  - Adder
      - ripple carry
      - Look ahead
      - Look ahead with 2 levels
  - Subtractor
      - Ripple borrow
  - Multiplier
      - array
      - carry save
  - Divider
       - attempt subtraction

But what good are fast math circuits, if you can’t show them off? We decided to make a test setup to both demonstrate and verify the implementation of the circuits.

In the demo, an Arduino reads the operands from rotary encoders and shows them on 7-segment displays. It sends the operands along with the desired operation to the FPGA. That then returns the result to the Arduino, that shows it on the OLED screen.

![Video](media/math_demo.mp4)

Details of the demonstation setup can be found [here](https://coertvonk.com/hw/building-math-circuits/demonstration-30764).

## Feedback

We love to hear from you. Please use the article blog or the Github discussions to provide feedback.
