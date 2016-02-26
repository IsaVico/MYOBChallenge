var employeeData;

function prepareEmployeeData(fields){
	var employee;
	if(allMandatoryDataFilled(fields))
	{
		employee = {
			firstName: fields[0],
			lastName: fields[1],
			annualSalary: fields[2],
			superRate: fields[3],
			payPeriod: fields[4].replace('\n', ''),
			grossIncome: undefined,
			incomeTax: undefined,
			netIncome: undefined,
			superMonthly: undefined
		};
	} else {
		employee = {
			firstName: 'This employee have not all the mandatory data filled. The operations cannot be done',
			lastName: undefined,
			annualSalary: undefined,
			superRate: undefined,
			payPeriod: undefined,
			grossIncome: undefined,
			incomeTax: undefined,
			netIncome: undefined,
			superMonthly: undefined
		}
	}
	return employee;
}

function allMandatoryDataFilled(fields) {
	return ((fields[2].length > 0 && fields[3].length > 0 && fields[3].length > 0));
}

function calculatePayslip(employeeList) {
	var currentEmployee,
		i;

	employeeData = employeeList;

	for(i=0; i< employeeData.length; i++) {
		if(isValidEmployee(employeeData[i])){
			currentEmployee = employeeData[i];
			currentEmployee.grossIncome = Math.round(currentEmployee.annualSalary/12);
			currentEmployee.superMonthly = Math.round(calculateSuper(currentEmployee));
			currentEmployee.incomeTax = Math.round(calculateTaxes(currentEmployee));
			currentEmployee.netIncome = calculateNetIncome(currentEmployee);
		}
	}
	createOutputData(employeeData);
}

function isValidEmployee(employee){
	return employee.lastName != undefined;
}

/**
 * @private
 * Calculates the superRate which is the result of multiplied the gross monthly income and the super rate.
 * @returns Return the super rate amount per month.
 */
function calculateSuper(employee){
	return employee.grossIncome * (parseInt(employee.superRate) / 100);
}

/**
 * @private
 * Calculates the taxes based on the annual salary and the ATO table
 * @returns Return the amount of taxes that the user needs to pay per month.
 */
function calculateTaxes(employee) {
	var taxAmount,
		annualSalary;

	annualSalary = employee.annualSalary;

	switch (true) {
		case (annualSalary > 180001):
			taxAmount = (54547 + (annualSalary - 180000)*0.45)/12;
			break;
		case (annualSalary > 80001 && annualSalary <= 180000):
			taxAmount = (17547 + (annualSalary - 80000)*0.37)/12;
			break;
		case (annualSalary > 37001 && annualSalary <= 80000):
			taxAmount = (3572 + (annualSalary - 37000)*0.325)/12;
			break;
		case (annualSalary > 18200 && annualSalary <= 37000):
			taxAmount = ((annualSalary - 18200)*0.19)/12;
			break;
		default:
			taxAmount = 0;
			break;
	}

	return taxAmount;
}

/**
 * @private
 * Calculates the net income which is the result of subtract to the gross monthly income the monthly taxes.
 * @returns Return the super rate amount per month.
 */
function calculateNetIncome(employee) {
	return employee.grossIncome - employee.incomeTax;
}

