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
        i,
		fields;

    employeeData = [];
    record = text.split("\n");

    for(i= 0; i< record.length; i++){
		fields = record[i].split(',');
		if(fields[0].length > 0) {
			employeeData[i] = prepareEmployeeData(fields);
		}
    }
    calculatePayslip(employeeData);
}
