/**
* @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
* This class is the responsible to test the functionality implemented in OutputFileController.
*/
describe("When creating the Output file", function() {
var employee;

	beforeEach(function() {
		employee = {
				firstName: 'David',
				lastName: 'Rudd',
				annualSalary: 60050,
				superRate: '9%',
				payPeriod: '01 March - 31 March',
				grossIncome: 5004,
				incomeTax: 922,
				netIncome: 4082,
				superMonthly: 450,
				validEmployee: true
		};
	});

	afterEach(function() {
		employeeData = undefined;
	});

	it("it must call to convertToCSVFile", function() {
		var convertToCSVFileSpy = spyOn(window, 'convertToCSVFile');
		spyOn(window, 'createDownloadLink');
		createOutputData(employee);
		expect(convertToCSVFileSpy).toHaveBeenCalled();
	});

	it("it must call to createDownloadLink", function() {
		var createDownloadLinkSpy = spyOn(window, 'createDownloadLink');
		spyOn(window, 'convertToCSVFile');
		createOutputData(employee);
		expect(createDownloadLinkSpy).toHaveBeenCalled();
	});

	it("the output data must be correct", function() {
		var expectedOutput;
		expectedOutput = 'David Rudd,01 March - 31 March,5004,922,4082,450';
		employeeData = [
			employee
		];
		expect(convertToCSVFile()).toBe(expectedOutput.concat('\n'));
	});
});
