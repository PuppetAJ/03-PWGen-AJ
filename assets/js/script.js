// Assignment code here


// Get references to the #generate button element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

var generatePassword = function(selections) {

  var numbers = '01234567890123456789';
  var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var specialCharacters = '!@#$%^&*()_-+=,.:;<>?][{}~`';
 
  var passwordLength = selections.passwordLength;
  var selectedChars = 'abcdefghijklmnopqrstuvwxyz';
  var generatedPassword = '';

  if (selections.numbers) {
    selectedChars = selectedChars + numbers;
  } 
  
  if (selections.specialCharacters) {
    selectedChars = selectedChars + specialCharacters;
  }
  
  if (selections.upperCase) {
    selectedChars = selectedChars + uppercaseLetters
  };

    // Fisher-Yates shuffle https://stackoverflow.com/questions/3079385/str-shuffle-equivalent-in-javascript
    function characterShuffle(string) {
      var stringParts = string.split('');
      for (var i = stringParts.length; i > 0;) {
          var random = parseInt(Math.random() * i);
          // this functions as the --i part of the for loop, and also 
          // temporarily stores character while also reducing index by 1
          var temp = stringParts[--i];

          // sets current index (after the above reduction) equal to the content of a random index
          stringParts[i] = stringParts[random];

          // sets same random index's content equal to the character of the index it just changed
          stringParts[random] = temp;
      }
      return stringParts.join('');
  };

  selectedChars = characterShuffle(selectedChars);

  var rngArray = new Uint32Array(passwordLength);
  window.crypto.getRandomValues(rngArray);

  for (var i = 0; i < passwordLength; i++) {
    // we do this due to the fact that the numbers in the UInt32Array are large, and would exceed the length of the 
    // initial character array's length. remainders cannot be larger than the divisor, and as such, we use the char variable's
    // length as said divisor, divided by the random numbers produced by our UInt32Array to produce a random number that never exceeds
    // the length of the characters it has to select from. Along with this, it always produces a whole number.
    generatedPassword += selectedChars[rngArray[i] % selectedChars.length];
  }

  console.log("Password is " + generatedPassword);

};

var btnAlerts = function() {

  var length = window.prompt("How long would you like your password? (min 8, max 128 characters)");
  var lengthResponse = parseInt(length);

  var characterConfirm = function() {
    var numericConfirm = window.confirm("Would you like numeric characters?");
    var specialCharactersConfirm = window.confirm("Would you like special characters?");
    var uppercaseConfirm = window.confirm("Would you like uppercase characters?");

    if (!numericConfirm && !specialCharactersConfirm && !uppercaseConfirm) {
      window.alert("one extra character type must be selected!");
      return characterConfirm();
    } else {
      var selections = {
        passwordLength: lengthResponse,
        numbers: numericConfirm,
        specialCharacters: specialCharactersConfirm,
        upperCase: uppercaseConfirm
      }

      generatePassword(selections);

    }
  };

  if (isNaN(lengthResponse) || "") {
    window.alert("You must provide a numeric length!");
    return btnAlerts();
  } else if (lengthResponse < 8) {
    window.alert("Your password must be longer than 8 characters!");
    return btnAlerts();
  } else if (lengthResponse > 128) {
    window.alert("Your password must not be longer than 128 characters!");
    return btnAlerts();
  } else {
    characterConfirm();
  };

};

btnAlerts();