/**
 * Created by Isabel on 26/02/2016.
 */
var employeeData;

function createOutputData(employeeList){
	var outputData;

	employeeData = employeeList;
	outputData = convertToCSVFile();
	showOutputData();
	createDownloadLink(outputData);
}

function createDownloadLink(outputData) {
	var data, 
		filename,
		link,
		linkNodeText;

	filename = 'outputDataPaySlip.csv';

	if (!outputData.match(/^data:text\/csv/i)) {
		outputData = 'data:application/csv;charset=utf-8,' + encodeURI(outputData);
	}

	link = document.createElement('a');
	link.setAttribute('href', outputData);
	link.setAttribute('download', filename);
	linkNodeText = document.createTextNode("Click on this link if you want to download the csv document");
	 link.appendChild(linkNodeText);
	 document.body.appendChild(link);
}

function convertToCSVFile() {
	var outputData,
		fieldDelimiter,
		recordDelimiter;

	outputData = '';
	fieldDelimiter= ',';
	recordDelimiter = '\n';

	employeeData.forEach(function(employee) {
		var name;

		name = getFullName(employee);
		outputData = outputData.concat(name).concat(fieldDelimiter).concat(employee.payPeriod).concat(fieldDelimiter).concat(employee.grossIncome).concat(fieldDelimiter).concat(employee.incomeTax).concat(fieldDelimiter).concat(employee.netIncome).concat(fieldDelimiter).concat(employee.superMonthly).concat(recordDelimiter);
	});
	return outputData;
}

function getFullName(employee){
	return employee.firstName.concat(' ').concat(employee.lastName);
}

