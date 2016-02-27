/**
* @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
* This class is the responsible to test the functionality implemented in OutputFileController.
*/
describe("When creating the Output file", function() {
var employeeList,
    showOutputDataSpy;

	beforeEach(function() {
        employeeList = [{
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
		}];
        showOutputDataSpy = spyOn(window, 'showOutputData');
	});

	it("it must call to convertToCSVFile", function() {
		var convertToCSVFileSpy = spyOn(window, 'convertToCSVFile');
		spyOn(window, 'createDownloadLink');
		createOutputData(employeeList);
		expect(convertToCSVFileSpy).toHaveBeenCalled();
	});

	it("it must call to createDownloadLink", function() {
		var createDownloadLinkSpy = spyOn(window, 'createDownloadLink');
		spyOn(window, 'convertToCSVFile');
		createOutputData(employeeList);
		expect(createDownloadLinkSpy).toHaveBeenCalled();
	});

    it("it must call to showOutputData", function() {
        createOutputData(employeeList);
        expect(showOutputDataSpy).toHaveBeenCalled();
    });

	it("the output data must be correct", function() {
		var expectedOutput;
		expectedOutput = 'David Rudd,01 March - 31 March,5004,922,4082,450';
		expect(convertToCSVFile(employeeList)).toBe(expectedOutput.concat('\n'));
	});
});
