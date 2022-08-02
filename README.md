# Password Generator Challenge

## Contents
This is Adrian Jimenez's password generator challenge submission.

To complete this project I began by attempting to figure out a way to generate a random password through research. I found many solutions involving the usage of Math.random() to randomly select characters in a pool and build a random password, however, upon further reading I discovered that Math.random() is not cryptographically secure. It can even be possible for the results of a password generator utilizing Math.random() to be predicted, as it is not truly random, and operates off of a seed. As such, I set out to find an alternative means of generating a more secure password which led me to discover the window.crypto.getRandomValues() method. This method would input random values into a specified array which could then be used similarly to values produced by the Math.random() method to generate a random password. With this in mind I began implementing a pool of characters to select from, which would randomly be selected through a random number generator using crypto.getRandomValues(). After creating functions to gather user input I was able to dissect the getRandomValues() method to understand it enough to use in my project, and I was succesfully able to implement it into an early version of the code. However, to add further security and reduce character selection bias, I decided to shuffle the pool of characters the password generator had to select from. This came with its own set of challenges, due to the fact that JavaScript strings are immutable, and I was unnable to simply use a method to easily shuffle the characters in the string. This led to me discovering the Fisher-Yates shuffle algorithm, and a function which provided the functionality I needed on StackOverflow (credit provided in the code, and credits section). I decided not to allow myself to use the code in my project if I didn't understand how it worked, and so I spent a long time researching and playing with the code to get different outputs until I sufficiently understood it enough to describe each part of the code with comments. Once I was able to do that, I implemented it into my code, and then proceeded to add comments to all of my code explaining what it does to finalize it.

## Built With
* HTML
* CSS
* JavaScript

## Preview
![Preview](path)

## Website

## Credits
Made by Adrian Jimenez

Fisher-Yates function:
https://stackoverflow.com/questions/3079385/str-shuffle-equivalent-in-javascript

## License

MIT License

Copyright ©️ 2022 Adrian Jimenez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

