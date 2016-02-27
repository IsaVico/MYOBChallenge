/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is responsible of do the necessary operations to get the output data.
 */

/**
 * This function does all the operations to get the output data. In this function the system gets the data from the
 * input data and create the output data.
 * @param employeeList List of employee that is going to be processed
 */
function calculatePayslip(employeeList) {
	var currentEmployee,
		i;

	for(i=0; i< employeeList.length; i++) {
		if(employeeList[i].validEmployee){
			currentEmployee = employeeList[i];
			currentEmployee.grossIncome = Math.round(currentEmployee.annualSalary/numberOfPaymentsPerYear);
			currentEmployee.superMonthly = Math.round(calculateSuper(currentEmployee));
			currentEmployee.incomeTax = Math.round(calculateTaxes(currentEmployee));
			currentEmployee.netIncome = calculateNetIncome(currentEmployee);
		}
	}
	createOutputData(employeeList);
}

/**
 * Calculates the superRate which is the result of multiplied the gross monthly income and the super rate.
 * @param employee Object that represent the employee whose is going to get the super income.
 * @returns {number} Returns the super rate amount per month.
 */
function calculateSuper(employee){
	return employee.grossIncome * (parseInt(employee.superRate) / 100);
}

/**
 * Calculates the taxes based on the annual salary and the ATO table
 * @param employee Object that represent the employee whose is going to get the taxes payed.
 * @returns {number} Return the amount of taxes that the user needs to pay per month.
 */
function calculateTaxes(employee) {
	var taxAmount,
		annualSalary;

	annualSalary = employee.annualSalary;

	switch (true) {
		case (annualSalary > (taxableIncome.highSalary)):
			taxAmount = getTaxAmount(fixedTaxes.highTax, annualSalary, taxableIncome.highSalary, variableTaxes.highVarTax);
			break;
		case (annualSalary > (taxableIncome.mediumSalary) && annualSalary <= taxableIncome.highSalary):
			taxAmount = getTaxAmount(fixedTaxes.mediumTax, annualSalary, taxableIncome.mediumSalary, variableTaxes.mediumVarTax);
			break;
		case (annualSalary > (taxableIncome.midLowSalary) && annualSalary <= taxableIncome.mediumSalary):
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

/**
 * Get the tax amount with the given data.
 * @param fixedTax Amount that represents the fixed taxes to pay from the ATO Table data.
 * @param annualSalary Salary of the employee, this amount is gotten from the input data filled.
 * @param taxableIncome Amount that represents the range which is going to taking in account to calculate the tax amount.
 * @param varTax Amount that represents the variable taxes which is going to taking in account to calculate the tax amount.
 * @returns {number} Returns the amount of the taxes that the employee is going to pay.
 */
function getTaxAmount(fixedTax, annualSalary, taxableIncome, varTax) {
	return (fixedTax + (annualSalary - taxableIncome) * varTax)/numberOfPaymentsPerYear;
}

/**
 * Calculates the net income which is the result of subtract to the gross monthly income the monthly taxes.
 * @param employee Object that represent the employee whose is going to get the the income received.
 * @returns Return the super rate amount per month.
 */
function calculateNetIncome(employee) {
	return employee.grossIncome - employee.incomeTax;
}

