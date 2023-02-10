// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

//create some test arrays
const test = [valid1, valid2, invalid1, invalid2];
const test2 = [valid1, valid2, valid3, valid4, valid5];
const test3 = [invalid1, invalid2, invalid3, invalid4, invalid5];
const test4 = [invalid2, invalid5];
const test5 = [[9, 3, 3], [13, 4, 4], [19, 4, 5]];
const test6 = [valid4, invalid4, mystery3];
const test7 = [valid2, invalid2, mystery2];

// Add your functions below:
const validateCred = array => {
    //create a Toggle that switches every other iteration
    let toggle = false;
    //create an empty array to push new values into
    let newArray = [];
    //create a variable to sum up total values
    let totalSum = 0;
    //create a loop to iterate over the array, double and perform Luhn Algorithm
    for ( let i = array.length - 1; i >= 0; i-- ) {
        //check the toggle status to only perform this function on every other digit
        if ( toggle ) {
            //here we use a ternary operator to double the digit and subtract 9 if the product is greater than 9
            array[i] * 2 > 9 ? newArray.push(array[i] * 2 - 9) : newArray.push(array[i] * 2);
        } else {
            //if toggle is not true, we do not double and simply push the current digit to the new array
            newArray.push(array[i]);
        }
        //this is the magic, every iteration we flip the status of toggle
        toggle = !toggle;
    }
    //create a new loop that iterates over all the digits in our newArray and adds them up into totalSum
    for ( let j = 0; j < newArray.length; j++ ) {
        totalSum += newArray[j];
    }
    if ( totalSum % 10 === 0 ) {
        return true;
    } else {
        return false;
    }
}

//test validateCred function
// console.log(validateCred(valid1)); //should return 'true'
// console.log(validateCred(invalid1)); //should return 'false'

//create a function with a nested array parameter
const findInvalidCards = nestedArray => {
    //create a new nested array to return output
    let invalidArray = [];
    //loop through nested array and push invalid arrays to invalidArray
    for ( let k = 0; k < nestedArray.length; k++ ){
        if ( validateCred(nestedArray[k]) !== true ) {
            invalidArray.push(nestedArray[k])
        }
    }
    return invalidArray;
}

//test findInvalidCards function
// console.log(findInvalidCards(test)); //should return two arrays

//create a function with a nested array parameter that returns an array of companies
const idInvalidCardCompanies = nestedArray => {
    //create an empty array to return later
    let cardCompanyArray = [];
    //loop over every array in nested array and check first digit against card company table
    for ( let l = 0; l < nestedArray.length; l++ ) {
        if ( nestedArray[l][0] === 3) {
            if ( !cardCompanyArray.includes('Amex (American Express)')){
                cardCompanyArray.push('Amex (American Express)')
            }    
        } else if ( nestedArray[l][0] === 4 ) {
            if ( !cardCompanyArray.includes('Visa')) {
                cardCompanyArray.push('Visa')
            } 
        } else if ( nestedArray[l][0] === 5 ) {
            if ( !cardCompanyArray.includes('Mastercard')) {
                cardCompanyArray.push('Mastercard')
            } 
        } else if ( nestedArray[l][0] === 6 ) {
            if ( !cardCompanyArray.includes('Discover')) {
                cardCompanyArray.push('Discover')
            } 
        } else {
            console.log('Company not found..')
        }
    }
    return cardCompanyArray;
}

//test idInvalidCardCompanies function
// console.log(idInvalidCardCompanies(test6)); //should return 'Discover'
// console.log(idInvalidCardCompanies(test7)); //should return 'Mastercard'
// console.log(idInvalidCardCompanies(batch)); //should return all four companies.

//Extra Credit

//create a function to convert a string that is a credit card number into an array
const convertString2Array = string => {
    let convertedString = [];
    for ( n = 0; n < string.length; n++ ) {
        convertedString.push( parseInt(string[n] ));
    }
    return convertedString;
}

//test convertString2Array function
// console.log(convertString2Array("3498641258746359")); //should return an array

//create a function to convert invalid numbers into valid numbers
const invalid2Valid = invalidArray => {
    let correctedArray = invalidArray;
    correctedArray.pop();
    correctedArray.push(0);
    while (!validateCred(correctedArray)) {
        correctedArray.push(correctedArray.pop() + 1);
    }
    return correctedArray;
}

//test invalid2Valid function
// console.log(invalid2Valid(invalid1)); //should return corrected array
// console.log(validateCred(invalid2Valid(invalid1))); //should return true
