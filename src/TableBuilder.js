function showOutputData(){
	var table = document.createElement('table'),
		employee,
		employeeIndex;
	table.style.border="1.5px solid black";

	table.appendChild(createHeaderRow());
	for ( employeeIndex = 0; employeeIndex < employeeData.length; employeeIndex++){
		employee = employeeData[employeeIndex];	
		table.appendChild(createRow(employee));
	}
	document.body.appendChild(table);
}

function createRow(employee){
	var row;
	
	row = document.createElement('tr'); 
	row.style.border="1.5px solid black";
	appendColumn(row, getFullName(employee));
	appendColumn(row, employee.payPeriod);
	appendColumn(row, employee.grossIncome);
	appendColumn(row, employee.incomeTax);
	appendColumn(row, employee.netIncome);
	appendColumn(row, employee.superMonthly);

	return row;
}

function createHeaderRow(){
	var row;

	row = document.createElement('tr'); 
	row.style.border="1.5px solid black";
	appendColumn(row, "Full Name");
	appendColumn(row, "Payment Period");
	appendColumn(row, "Monthly gross income");
	appendColumn(row, "Monthly income taxes");
	appendColumn(row, "Monthly net income");
	appendColumn(row, "Monthly super rate");

	return row;
}

function appendColumn(row, textNode){
	var column;
	
	column = document.createElement('td');
	column.style.border="1.5px solid black";
	column.appendChild(document.createTextNode(textNode));
	row.appendChild(column);
}