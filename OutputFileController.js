var employeeData;

function createOutputData(employeeList){
	var outputData;
	
	employeeData = employeeList;
	outputData = convertToCSVFile();
	createDownloadLink(outputData);
}

function createDownloadLink(outputData) {  
       var data, filename, link;

        filename = 'outputPaySlip.csv';

        if (!outputData.match(/^data:text\/csv/i)) {
            outputData = 'data:text/csv;charset=utf-8,' + outputData;
        }
		
        data = encodeURI(outputData);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
		/*var node = document.getElementById('output');
		node.text = link;*/
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
