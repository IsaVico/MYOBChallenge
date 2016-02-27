/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is the responsible of convert the data to CSV file format, built the output file and
 * create the link to download the file.
 */

/**
 * Global variable that store the data for all employees
 */
var employeeData;

/**
 * @public
 * This is the function responsible to create the table show in the HTML and the link to download the data into a
 * csv file.
 * @param employeeList List of employees. This list contains all the data that is going to be shown to the user.
 */
function createOutputData(employeeList){
	var outputData;

	employeeData = employeeList;
	outputData = convertToCSVFile();
	showOutputData();
	createDownloadLink(outputData);
}

/**
 * @private
 * Creates the link to download the csv file with the data show in the data.
 * @param outputData Is the string with al the data. This is going to be wrote in the file in case the user wants to
 * keep the information in a csv file.
 */
function createDownloadLink(outputData) {
	var data,
		filename,
		link,
		linkNodeText;

    linkNodeText = 'Click on this link if you want to download the csv document';
	filename = 'outputDataPaySlip.csv';

	if (!outputData.match(/^data:text\/csv/i)) {
		outputData = 'data:application/csv;charset=utf-8,' + encodeURI(outputData);
	}

	link = document.createElement('a');
	link.setAttribute('href', outputData);
	link.setAttribute('download', filename);
	link.appendChild(document.createTextNode(linkNodeText));
	document.body.appendChild(link);
}

/**
 * @private
 * Converts all the information stored in the list of employees to a string, in order to write in a csv file.
 * @returns {string} The data with the csv format prepared to write it in a csv file if the user download the link.
 */
function convertToCSVFile() {
	var outputData,
		fieldDelimiter,
		recordDelimiter;

	outputData = '';
	fieldDelimiter= ',';
	recordDelimiter = '\n';

	employeeData.forEach(function(employee) {
		var name;

		name = employee.firstName.concat(' ').concat(employee.lastName);
		outputData = outputData.concat(name).concat(fieldDelimiter).concat(employee.payPeriod).concat(fieldDelimiter).concat(employee.grossIncome).concat(fieldDelimiter).concat(employee.incomeTax).concat(fieldDelimiter).concat(employee.netIncome).concat(fieldDelimiter).concat(employee.superMonthly).concat(recordDelimiter);
	});
	return outputData;
}
