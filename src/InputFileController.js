/**
 * Created by Isabel on 26/02/2016.
 */
var employeeData;

function openFile(event){

	var input = event.target;

	var reader = new FileReader();
	reader.onload = function(){
		parseFile(reader.result);
	};
	reader.readAsText(input.files[0]);
}

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
		if(fields[0].length > 0) {
			employeeData[indexEmployee] = prepareEmployeeData(fields);
			indexEmployee++;
		}
	}

	calculatePayslip(employeeData);
}
