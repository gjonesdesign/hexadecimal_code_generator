# 8 Digit Hexadecimal Code Generator
A hexadecimal code generator using vanilla javascript. Generating a code updates the site with the color that code represents.

# Description
This site has 3 buttons, each of which when clicked will generate an 8 digit hexadecimal code via different approaches. Each function starts by creating a string "result" that contains the hexadecimal "0x" prefix. The remainder of the hex code is then generated and concatenated to the prefix using each functions individual approach. These are as follows:

## Concatenate
Generates 8 digits by concatenation. Loops 8 times, each iteration generating a random number from 0 - 15 that corresponds to the index of a hex digit in the digits array. This digit is then retrieved and concatenated to the hex string until 8 digits have been retrieved.

## Convert toString
Generates the hex by converting a number via toString. Randomly generates a number from 0 to the largest possible base 10 number that can be made with 8 digits of hexadecimal (4,294,967,295). Using javascript's built in conversion method, toString, convert the number to base 16. If the generated hexadecimal code is less than 8 digits, the beginning of the code is padded with 0 until it has reached 8 digits. 

## Covert Manually
Generates the hex by converting manually. Functions identically to the toString method, instead replacing the toString method with manual a conversion algorithm. The algorithm is as follows: 

Loops until the randomly generated number is 0, each loop modding the number by 16 and adding the remainder to the start of the raw_hex array. The number is then updated to the floor of the number divided by 16. When the number is finally equal to 0, much like in the concatenation approach, each value in the raw_hex array will correspond to the index of a hex digit in the digits array. This digit is then retrieved and concatenated to the hex string until 8 digits have been retrieved.

## Constraints
The code follows a few basic restraints. They are as follows:

### Duplicates
This application must generate every possible code before returning a duplicate. 

This is achieved by adding every generated code to an array. If a code is generated but exists in this array, the code is discarded and a new one is generated. If the array is equal to the max number of combinations available with an 8 digit hexadecimal code (2,562,890,625), we have exhausted all possible combinations and thus clear the array to allow for duplicates.

### Sanitization
This application must not print codes that create odd looking codes (such as repeating codes or stepping codes such as 0xAAAAAAAA or 0x01234567 respectively), or codes that contain anything that can be interpreted as words or phrases (including words that can be created using numbers representing letters, such as 0x0D15EA5E). 

The process to achieve this was the longest to complete in this entire application, and involved multiple steps. It may have been possible to create an algorithm that checks for things that seem ~similar~ to a word (for example having a vowel before or after a consonant), but this approach seemed to be the simplest logically and more precise. The steps are as follow:

* Using a python script, and a txt dictionary of all words in the english language (found here: https://github.com/dwyl/english-words), we retrieve all words that could possible be created in an 8 digit hex code and add them to a file to check against in our original program. These words are retrieved by first removing any words that are smaller than 2 characters and larger than 8. We then replace the letters i and l, s, z, and o, with 1, 5, 2, and 0, respectively, since we can use those numbers to represent those letters in text. Any words with letters past F in the alphabet are then discarded as well. Finally, we duplicate words containing A, B, and E and replace those characters with 4, 8, and 3 respectively. Since there is no way to parse a txt file using vanilla javascript, the words are written to a json file as a key with each value being the length of the word. This gives us a file with every word that could possible be created in a hex code (though some of the words may not be remotely legible, like for example 2122135 (zizzies). That said, with over 2.5 billion possible hex codes that can be created, removing those words would be negligible.).

* When each hex code is checked against duplicates, it is also checked for validity. First, we check to see if the hex code is in our array of illegal codes. Then, via comparison in loops we check to see if it is either stepping or an all repeating hex code. Then, the hex code is checked against our dictionary which has been fetched from the json file. If the code is in the illegal array, any part of the code contains a word from the dictionary, or the code is either stepping or repeating, the code is added to the array of illegal codes, discarded, and a new code is generated. The maximum number of codes that can be generated is also decremented. 
