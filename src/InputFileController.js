/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is the responsible of built the output table. It is built in HTML language and show the results
 * after do all the necessary operations to get the requested data.
 */

/**
 * Global variable that store the data for all employees
 */
var employeeData;

/**
 * This is the responsible to open and load the data from the file. After load the file, the resulted string is parsed,
 * so all the data is converted into the proper structure that allows the system do all the operations.
 * @param event
 */
function openFile(event){

	var input = event.target;

    if(input.files[0].name.split('.').pop() == 'csv')
    {
        var reader = new FileReader();
        reader.onload = function(){
            parseFile(reader.result);
        };
        reader.readAsText(input.files[0]);
    } else {
        alert('The file must have .csv extension');
    }
}

/**
 * Parses the text passed as parameter. In this function the system prepare the data, parsing to the proper structure
 * and calculate all the data. After all the operations are done, the system show the output data.
 * @param text Text read from the input file.
 */
function parseFile(text){
	var record,
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

	calculatePayslip(employeeData);
}
