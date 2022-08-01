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



var generatePassword = function() {
  var chars = '01234567890abcdefghijklmnopqrstuvwxyz!@#$%^&*()_-+=,.:;<>?][{}~`abcdefghijklmnopqrstuvwxyz';
  var pwordLength = 8;
  var password = '';

  var array = new Uint32Array(pwordLength);
  window.crypto.getRandomValues(array);
  console.log(array);

  for (var i = 0; i < pwordLength; i++) {
    // we do this due to the fact that the numbers in the UInt32Array are large, and would exceed the length of the 
    // initial character array's length. remainders cannot be larger than the divisor, and as such, we use the char variable's
    // length as said divisor, divided by the random numbers produced by our UInt32Array to produce a random number that never exceeds
    // the length of the characters it has to select from. Along with this, it always produces a whole number.
    password += chars[array[i] % chars.length]
  }

  console.log("Password is " + password);


}

generatePassword();

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

      console.log(selections);
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

//https://stackoverflow.com/questions/68617403/how-to-properly-generate-a-random-password-with-the-window-crypto-property

// button 
// when button clicked -> begin prompts
// depending on prompts (true/false) select a different charset
// generate password
// display password on screen