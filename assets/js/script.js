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


}

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

btnAlerts();

// number = length of the array (?)
// number of elements within array

//changing the type of array (8 - 64 bit) changes the content of the array in bytes i believe.
//this in turn forces a change in number length
// var array = new Uint8Array(1);
// window.crypto.getRandomValues(array);

// console.log("Your lucky numbers:");
// for (const num of array) {
//   console.log(num.toString(36));
// }

//https://stackoverflow.com/questions/68617403/how-to-properly-generate-a-random-password-with-the-window-crypto-property

// button 
// when button clicked -> begin prompts
// depending on prompts (true/false) select a different charset
// generate password
// display password on screen