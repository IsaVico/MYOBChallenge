var employeeData;

function prepareEmployeeData(fields){
    return {
        firstName: fields[0],
        lastName: fields[1],
        annualSalary: fields[2],
        superRate: fields[3],
        payPeriod: fields[4].replace(/\r?\n?[^\r\n]*$/, ""),
        grossIncome: undefined,
        incomeTax: undefined,
        netIncome: undefined,
        superMonthly: undefined
    };
}

function calculatePayslip(employeeList) {
    var currentEmployee,
        i;

	employeeData = employeeList;
	
    for(i=0; i< employeeData.length; i++) {
        currentEmployee = employeeData[i];
        currentEmployee.grossIncome = Math.round(currentEmployee.annualSalary/12);
        currentEmployee.superMonthly = Math.round(calculateSuper(currentEmployee));
        currentEmployee.incomeTax = Math.round(calculateTaxes(currentEmployee));
        currentEmployee.netIncome = calculateNetIncome(currentEmployee);
    }
	createOutputData(employeeData);
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
    return getTaxes(employee.annualSalary);
}

/**
 * @private
 * Calculates the net income which is the result of subtract to the gross monthly income the monthly taxes.
 * @returns Return the super rate amount per month.
 */
function calculateNetIncome(employee) {
    return employee.grossIncome - employee.incomeTax;
}

/**
 * @private
 * Get the taxes for every range of salaries based on the ATO Table
 * @param {Integer} annualSalary Annual salary filled by the user, used as the base of the calculation for the taxes
 * @returns {Integer} Returns the monthly amount of the taxes.
 */
function getTaxes(annualSalary){
    var taxAmount;

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
            taxAmount = annualSalary/12;
            break;
    }

    return taxAmount;
}
