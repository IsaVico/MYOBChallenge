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
			currentEmployee.grossIncome = Math.round(currentEmployee.annualSalary/periodicMonths);
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
		case (annualSalary > (taxableIncome.highSalary + 1)):
				taxAmount = getTaxAmount(fixedTaxes.highTax, annualSalary, taxableIncome.highSalary, variableTaxes.highVarTax);
				break;
			case (annualSalary > (taxableIncome.mediumSalary + 1) && annualSalary <= taxableIncome.highSalary):
				taxAmount = getTaxAmount(fixedTaxes.mediumTax, annualSalary, taxableIncome.mediumSalary, variableTaxes.mediumVarTax);
				break;
			case (annualSalary > (taxableIncome.midLowSalary + 1) && annualSalary <= taxableIncome.mediumSalary):
				taxAmount = getTaxAmount(fixedTaxes.lowTax, annualSalary, taxableIncome.midLowSalary, variableTaxes.midLowVarTax);
				break;
			case (annualSalary > taxableIncome.lowSalary && annualSalary <= taxableIncome.midLowSalary):
				taxAmount = getTaxAmount(0, annualSalary, taxableIncome.lowSalary, variableTaxes.lowVarTax);
				break;
			default:
				taxAmount = variableTaxes.noTax;
				break;
		}

	return taxAmount;
}

function getTaxAmount(fixedTax, annualSalary, taxableIncome, varTax) {
	return (fixedTax + (annualSalary - taxableIncome) * varTax)/periodicMonths;
}

/**
 * @private
 * Calculates the net income which is the result of subtract to the gross monthly income the monthly taxes.
 * @returns Return the super rate amount per month.
 */
function calculateNetIncome(employee) {
	return employee.grossIncome - employee.incomeTax;
}

