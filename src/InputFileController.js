/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is the responsible of build the output table. It is built in HTML language and show the results
 * after do all the necessary operations to get the requested data.
 */

/**
 * This is the responsible to open and load the data from the file. After load the file, the resulted string is parsed,
 * so all the data is converted into the proper structure that allows the system to do all the operations.
 * After all the calculations are done, the system show the output data
 * @param event Event which is launched when the file is loaded.
 */
function openFile(event){

	var employeeData,
        inputFile,
        inputData;

    inputFile = event.target.files[0];
    if(inputFile.name.split('.').pop() == 'csv')
    {
        var reader = new FileReader();
        reader.onload = function(){
            inputData = reader.result;
            employeeData = parseFile(inputData);
            calculatePayslip(employeeData);
        };
        reader.readAsText(inputFile);
    } else {
        alert('The file must have .csv extension');
    }
}

/**
 * Parses the text passed as parameter. In this function the system prepare the data, parsing to the proper structure.
 * @param text Text read from the input file.
 * @returns {Array} Array with the input data parsed in employee objects.
 */
function parseFile(text){
	var employeeData,
		record,
		indexRecord,
		indexEmployee,
		fields;

	employeeData = [];
	record = text.split("\n");
	indexEmployee = 0;

	for(indexRecord= 0; indexRecord< record.length; indexRecord++){
		fields = record[indexRecord].split(',');
		if(fields.length > 1) {
			employeeData[indexEmployee] = prepareEmployeeData(fields);
			indexEmployee++;
		}
	}

    return employeeData;
}
