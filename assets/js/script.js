// Assignment code here

/* 
Short description: uses window.crypto and a shuffle function to shuffle and randomly pick characters from
a string, and generates a password of user specified length using said randomly picked characters 
*/

// Variable declared on the global scope so that it can be accessed by multiple functions.

var generatedPassword = '';

/* Password generation function starts, with argument for object "selections". 
This object is passed into it by the btnAlerts() function. */

var generatePassword = function(selections) {
  
  // Sets generatedPassword to be empty so that it doesn't store previous passwords.

  generatedPassword = "";

  // Characters which are able to be used in generation are declared seperately for selection.

  var numbers = '01234567890123456789';
  var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var specialCharacters = '!@#$%^&*()_-+=,.:;<>?][{}~`';
 
  /* Variable representing the length of the password to be generated is set to the 
  user input gathered in the btnAlerts() function. */

  var passwordLength = selections.passwordLength;

  /* By default, no matter what the user selects the pool of potential characters to generate from
  must be at least these lowercase letters */

  var selectedChars = 'abcdefghijklmnopqrstuvwxyz';

  /* Taking the selections from the btnAlerts() function, simple logic adds onto the
  selectedChars string depending on which characters the user wants in their password */

  if (selections.numbers) {
    selectedChars = selectedChars + numbers;
  } 
  
  if (selections.specialCharacters) {
    selectedChars = selectedChars + specialCharacters;
  }
  
  if (selections.upperCase) {
    selectedChars = selectedChars + uppercaseLetters
  };

  /* In order to help prevent bias in the password generation, the pool of potential characters 
  to select from is shuffled. This is done using a modified version of the Fisher-Yates shuffle algorithm 

  Credit: https://stackoverflow.com/questions/3079385/str-shuffle-equivalent-in-javascript */
  
  function characterShuffle(string) {

    /* Splits the characters of the inputed string into an array. 
    This is done since strings are immutable. */

    var stringParts = string.split('');

    // Loop which shuffles the characters an amount of times equal to the length of the array.

    for (var i = stringParts.length; i > 0;) {

        // Generates a random number and uses parseInt to remove the decimal values.

        var random = parseInt(Math.random() * i);

        /* This functions as the --i part of the for loop, and also 
        temporarily stores a character while also reducing index by 1 */

        var temp = stringParts[--i];

        // sets current index equal to the content of a random index

        stringParts[i] = stringParts[random];

        // sets same random index's content equal to the character of the index it just changed

        stringParts[random] = temp;
    }

    // returns the shuffled array of characters conjoined back into a string.

    return stringParts.join('');

  };

  /* Calls the characterShuffle function to shuffle the currently selectedChars, and then sets
  the selectedChars variable equal to the returned value. */
  
  selectedChars = characterShuffle(selectedChars);

  /*
  --------------------
  *Note:
    Opted to use window.crypto to generate psuedo-random numbers as Math.random is not 
    cryptographically secure.
  ---------------------
  What this does is declare an array of unsigned 32-bit integers the length of the selectedChars array.
  Then, it assigns random 32-bit values to each index in the array.

  */

  // the new Uint32Array() is a constructor method.

  var rngArray = new Uint32Array(selectedChars.length);
  window.crypto.getRandomValues(rngArray);

  /* A for loop which iterates through random character selection using the previous 32-bit array's values
  and generates a password as long as the user selected. */

  for (var i = 0; i < passwordLength; i++) {

    /* 
    Using a random number in the previous array, we divide that by the length of the selectedChars 
    and then take the remainder of that to use as a random index to select our characters from
    
    We do this due to the fact the remainder will never exceed the length of the divisor, and the divisor is the
    length of our array. if it tried to select a random character outside the bounds of our array it would break.
    */


    // += allows us to build the password 1 character at a time

    generatedPassword += selectedChars[rngArray[i] % selectedChars.length];
  }

  // Finally returns the randomly generated password

  return generatedPassword;

};

// Password generation function ends 

/* Button Alerts function begins. It displays prompts to gather user input when the "generate password"
button is clicked */

var btnAlerts = function() {

  // sets the variable lengthResponse to the parsed integer of the user's response to the prompt.

  var lengthResponse = parseInt(window.prompt("How long would you like your password? (min: 8 characters, max: 128 characters)"));
  // function for all the additional character confirmations

  var characterConfirm = function() {
    
    // variables all set to a boolean value depending on whether the user confirms they want said characters in their password.
    window.alert("WARNING: The following selected characters will be randomly added to a pool of characters to generate your password from. There is no guarantee your password will contain said characters with shorter lengths!");
    var numericConfirm = window.confirm("Would you like numeric characters to be chosen from?");
    var specialCharactersConfirm = window.confirm("Would you like special characters to be chosen from?");
    var uppercaseConfirm = window.confirm("Would you like uppercase characters to be chosen from?");

    // response validation to ensure that the user selects AT LEAST one extra set of characters

    if (!numericConfirm && !specialCharactersConfirm && !uppercaseConfirm) {
      window.alert("one extra character type must be selected!");

      // restarts function
      return characterConfirm();
    } else {
      
      /* Packages previously selected values into an object so that it can then be passed to the
      generatePassword() function */

      var selections = {
        passwordLength: lengthResponse,
        numbers: numericConfirm,
        specialCharacters: specialCharactersConfirm,
        upperCase: uppercaseConfirm
      }

      // sends object with all user's values to the function
      generatePassword(selections);

    }
  };

  /* Response validation for length provided by user. Provides different alerts depending on what criteria
  they missed */

  // if not a number
  if (isNaN(lengthResponse) || "") {
    window.alert("You must provide a numeric length!");
    return btnAlerts();
  // if length is less than 8
  } else if (lengthResponse < 8) {
    window.alert("Your password must be longer than 8 characters!");
    return btnAlerts();
  // if length is longer than 128
  } else if (lengthResponse > 128) {
    window.alert("Your password must not be longer than 128 characters!");
    return btnAlerts();
  // if length is within bounds, THEN ask what type of characters the user wants via characterConfirm() function
  } else {
    characterConfirm();
  };

};

// Get references to the #generate button element

var generateBtn = document.querySelector("#generate");

// Write password to the #password input

function writePassword() {
  var passwordText = document.querySelector("#password");
  // calls the function to start PW generation when button is pressed
  btnAlerts();
  // sets html element's value to the generatedPassword returned after all is processed.
  passwordText.value = generatedPassword;
};

// Add event listener to generate button

generateBtn.addEventListener("click", writePassword);

