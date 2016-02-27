/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is responsible of prepare the data from the file and check if the data is correct
 */

/**
 * Global variable that store the data for all employees
 */
var employeeData;

/**
 * @public
 * Creates a new employee object with the proper data from the fields read from the file.
 * @param fields Fields read from the input file
 * @returns {Object} Returns the employee object created
 */
function prepareEmployeeData(fields){
    var employee;
    if(isCorrectInputData(fields) && isAllMandatoryDataFilled(fields))
    {
        employee = {
            firstName: clearNewLineCharacters(fields[0]),
            lastName: clearNewLineCharacters(fields[1]),
            annualSalary: clearNewLineCharacters(fields[2]),
            superRate: clearNewLineCharacters(fields[3]),
            payPeriod: clearNewLineCharacters(fields[4]),
            grossIncome: undefined,
            incomeTax: undefined,
            netIncome: undefined,
            superMonthly: undefined,
            validEmployee: true
        };
    } else {
        employee = {
            firstName: getErrorMessage(fields),
            lastName: '',
            annualSalary: 0,
            superRate: '',
            payPeriod: '',
            grossIncome: 0,
            incomeTax: 0,
            netIncome: 0,
            superMonthly: 0,
            validEmployee:false
        }
    }
    return employee;
}

/**
 * @private
 * Gets the proper error message depending of the fields. If there not exists enough data (the input data is not correct
 * the system informs the user that the record is not processed. If the mandatory items are not filled the operations
 * cannot be done, so the system informs the user.
 * @param fields Fields read from the file
 * @returns {string} Returns the message that is going to be shown to the user.
 */
function getErrorMessage(fields) {
    if(!isCorrectInputData(fields)){
        return 'Not the correct input data filled. The record is not processed';
    }
    if(!isAllMandatoryDataFilled(fields)){
        return 'Mandatory data not filled. The operations cannot be done';
    }

    return "Not processed";
}

/**
 * @private
 * Clear the new line characters from the original string in order to avoid write them in table shown or in the output file.
 * @param originalString The string that is going to be cleared.
 * @returns {string} Returns the cleared string without \n or \r characters.
 */
function clearNewLineCharacters(originalString) {
    return originalString.replace(/(?:\r\n|\r|\n)/g, '');
}

/**
 * @private
 * Checks if the number of input data is correct. If the system found less than five fields show an error to the user
 * @param fields Fields read from the file.
 * @returns {boolean} Returns true if the number of data in the file are correct, false otherwise.
 */
function isCorrectInputData(fields){
    return (fields.length == 5);
}

/**
 * @private
 * Checks if the mandatory data are filled. If the mandatory data are not filled the system cannot do the necessary
 * operations to get the output data.
 * @param fields Field read from the file.
 * @returns {boolean} Returns true if the mandatory data are filled, false otherwise.
 */
function isAllMandatoryDataFilled(fields) {
    return ((fields[2].length > 0 && fields[3].length > 0 && fields[4].length > 0));
}
