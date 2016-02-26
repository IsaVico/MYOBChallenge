/**
 * Created by Isabel on 26/02/2016.
 */
describe("When calculating the amounts", function() {
 var employeeFields;
	beforeEach(function() {
		employeeFields = ['David','Rudd','60050','9%','01 March - 31 March'];
	});

	function assertEmployeeFields(expectedEmployee, lastName) {
		expect(expectedEmployee.firstName).toBe('David');
		expect(expectedEmployee.lastName).toBe(lastName);
		expect(expectedEmployee.annualSalary).toEqual('60050');
		expect(expectedEmployee.superRate).toBe('9%');
		expect(expectedEmployee.payPeriod).toBe('01 March - 31 March');
	}

	it("prepareEmployeeData must return the correct data", function() {
		var expectedEmployee;
		expectedEmployee = prepareEmployeeData(employeeFields);
		assertEmployeeFields(expectedEmployee, 'Rudd');
	});

	it("prepareEmployeeData must have in account one employee if it have one of the non mandatory fields filled", function (){
		var expectedEmployee;
		employeeFields[1] = '';
		expectedEmployee = prepareEmployeeData(employeeFields);
		assertEmployeeFields(expectedEmployee, '');
	});

	it("prepareEmployeeData must not have in account one employee if it have not all the mandatory fields", function (){
		var expectedEmployee;
		employeeFields[2] = '';
		expectedEmployee = prepareEmployeeData(employeeFields);
		expect(expectedEmployee.lastName).toBeUndefined();
	});

	it("allMandatoryDataFilled must return true if the mandatory data are filled", function() {
		var expectedAllMandatoryDataFilled;

		expectedAllMandatoryDataFilled = allMandatoryDataFilled(employeeFields);
		expect(expectedAllMandatoryDataFilled).toBe(true);
	});

	it("allMandatoryDataFilled must return false if the mandatory data are  not filled", function() {
		var expectedAllMandatoryDataFilled;
		employeeFields[2] = '';
		expectedAllMandatoryDataFilled = allMandatoryDataFilled(employeeFields);
		expect(expectedAllMandatoryDataFilled).toBe(false);
	});

	it("isValidEmployee must return true if the the employee has not errors", function() {
		var employee,
			validEmployee;
		employee = prepareEmployeeData(employeeFields);
		validEmployee = isValidEmployee(employee);
		expect(validEmployee).toBe(true);
	});

	it("isValidEmployee must return false if the the employee has errors", function() {
		var employee,
			validEmployee;

		employeeFields[2] = '';
		employee = prepareEmployeeData(employeeFields);
		validEmployee = isValidEmployee(employee);
		expect(validEmployee).toBe(false);
	});

	describe("CalculatePayslip function", function (){
		var createOutputDataSpy;

		beforeEach(function() {
			createOutputDataSpy = spyOn(window, 'createOutputData');
		});

		it("calculatePayslip must call to createOutputData if all the employees is valid", function() {
			calculatePayslip([prepareEmployeeData(employeeFields)]);
			expect(createOutputDataSpy).toHaveBeenCalled();
		});

		it("calculatePayslip must call to createOutputData even if there is not valid employees", function() {
			employeeFields[2] = '';
			calculatePayslip([prepareEmployeeData(employeeFields)]);
			expect(createOutputDataSpy).toHaveBeenCalled();
		});

		it("calculatePayslip must call to calculateSuper, calculateTaxes, calculateNetIncome if the user is valid", function() {
			var calculateSuperSpy,
				calculateTaxesSpy,
				calculateNetIncomeSpy;

			calculateSuperSpy = spyOn(window, 'calculateSuper');
			calculateTaxesSpy = spyOn(window, 'calculateTaxes');
			calculateNetIncomeSpy = spyOn(window, 'calculateNetIncome');

			calculatePayslip([prepareEmployeeData(employeeFields)]);
			expect(calculateSuperSpy).toHaveBeenCalled();
			expect(calculateTaxesSpy).toHaveBeenCalled();
			expect(calculateNetIncomeSpy).toHaveBeenCalled();
		});

		it("calculatePayslip must not call to calculateSuper, calculateTaxes, calculateNetIncome if the user is not valid", function() {
			var calculateSuperSpy,
				calculateTaxesSpy,
				calculateNetIncomeSpy;

			calculateSuperSpy = spyOn(window, 'calculateSuper');
			calculateTaxesSpy = spyOn(window, 'calculateTaxes');
			calculateNetIncomeSpy = spyOn(window, 'calculateNetIncome');
			employeeFields[2] = '';

			calculatePayslip([prepareEmployeeData(employeeFields)]);
			expect(calculateSuperSpy).not.toHaveBeenCalled();
			expect(calculateTaxesSpy).not.toHaveBeenCalled();
			expect(calculateNetIncomeSpy).not.toHaveBeenCalled();
		});
	});

	it("calculateSuper must return the correct value", function() {
		var expectedSuper,
			calculatedSuper,
			employee;
		expectedSuper = 450;
		employee = prepareEmployeeData(employeeFields);
		employee.grossIncome = 5004;
		calculatedSuper = Math.round(calculateSuper(employee));
		expect(calculatedSuper).toEqual(expectedSuper);
	});

	it("calculateNetIncome must return the correct value", function() {
		var expectedTaxes,
			calculatedTaxes,
			employee;
		expectedTaxes = 4082;
		employee = prepareEmployeeData(employeeFields);
		employee.grossIncome = 5004;
		employee.incomeTax = 922;
		calculatedTaxes = Math.round(calculateNetIncome(employee));
		expect(calculatedTaxes).toEqual(expectedTaxes);
	});

	describe("calculateTaxes function", function () {
		var employee,
			expectedTaxes,
			calculatedTaxes;

		function calculateEmployeeTaxes(annualSalary) {
			employee = prepareEmployeeData(employeeFields);
			employee.annualSalary = annualSalary;
			return Math.round(calculateTaxes(employee));
		}

		it("calculateTaxes must get the correct getTaxes if salary is more than 180000", function() {
			expectedTaxes = 5671;
			calculatedTaxes = calculateEmployeeTaxes(210000);

			expect(calculatedTaxes).toBe(expectedTaxes);
		});

		it("calculateTaxes must get the correct getTaxes if salary is between 80000 and 180000", function() {
			expectedTaxes = 2696;
			calculatedTaxes = calculateEmployeeTaxes(120000);

			expect(calculatedTaxes).toBe(expectedTaxes);
		});

		it("calculateTaxes must get the correct getTaxes if salary is between 37000 and 80000", function() {
			expectedTaxes = 922;
			calculatedTaxes = calculateEmployeeTaxes(60050);

			expect(calculatedTaxes).toBe(expectedTaxes);
		});

		it("calculateTaxes must get the correct getTaxes if salary is between 18200 and 37000", function() {
			expectedTaxes = 124;
			calculatedTaxes = calculateEmployeeTaxes(26000);

			expect(calculatedTaxes).toBe(expectedTaxes);
		});

		it("calculateTaxes must get the correct getTaxes if salary is less than 18200", function() {
			expectedTaxes = 0;
			calculatedTaxes = calculateEmployeeTaxes(12000);

			expect(calculatedTaxes).toBe(expectedTaxes);
		});
	});
});