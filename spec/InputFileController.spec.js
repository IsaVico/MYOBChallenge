/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is the responsible to test the functionality implemented in InputFileController
 */
describe("When loading and parsing input file", function() {
	describe("When parsing file", function() {
		var text;

		beforeEach(function() {
			spyOn(window, 'calculatePayslip');
		});

		afterEach(function() {
			employeeData = undefined;
		});

		it("the code must be properly parsed if the text is correct", function() {
			text = 'David,Rudd,60050,9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March';
			parseFile(text);
			expect(employeeData.length).toEqual(2);
		});

		it("the code must be properly parsed if the text has an empty line between records", function() {
			text = 'David,Rudd,60050,9%,01 March – 31 March\n\nRyan,Chen,120000,10%,01 March – 31 March';
			parseFile(text);
			expect(employeeData.length).toEqual(2);
		});

		it("the code must be properly parsed if the text has an empty line as first record", function() {
			text = '\nDavid,Rudd,60050,9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March';
			parseFile(text);
			expect(employeeData.length).toEqual(2);
		});

		it("the code must be properly parsed if the text has an empty line as last record", function() {
			text = 'David,Rudd,60050,9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March\n';
			parseFile(text);
			expect(employeeData.length).toEqual(2);
		});


	});
});