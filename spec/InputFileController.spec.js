/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is the responsible to test the functionality implemented in InputFileController
 */
describe("When loading and parsing input file", function() {
	describe("When parsing file", function() {
		var text,
            employeeListData;

		beforeEach(function() {
			spyOn(window, 'calculatePayslip');
		});

		afterEach(function() {
            employeeListData = undefined;
		});

		it("the code must be properly parsed if the text is correct", function() {
			text = 'David,Rudd,60050,9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March';
            employeeListData = parseFile(text);
			expect(employeeListData.length).toEqual(2);
            expect(employeeListData[0].validEmployee).toBe(true);
		});

		it("the code must be properly parsed if the text has an empty line between records", function() {
			text = 'David,Rudd,60050,9%,01 March – 31 March\n\nRyan,Chen,120000,10%,01 March – 31 March';
            employeeListData = parseFile(text);
			expect(employeeListData.length).toEqual(2);
            expect(employeeListData[0].validEmployee).toBe(true);
		});

		it("the code must be properly parsed if the text has an empty line as first record", function() {
			text = '\nDavid,Rudd,60050,9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March';
            employeeListData = parseFile(text);
			expect(employeeListData.length).toEqual(2)
            expect(employeeListData[0].validEmployee).toBe(true);
		});

		it("the code must be properly parsed if the text has an empty line as last record", function() {
			text = 'David,Rudd,60050,9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March\n';
            employeeListData = parseFile(text);
			expect(employeeListData.length).toEqual(2);
            expect(employeeListData[0].validEmployee).toBe(true);
		});

        it("the code must be properly parsed if any no mandatory data is not filled", function() {
            text = ',Rudd,60050,9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March';
            employeeListData = parseFile(text);
            expect(employeeListData.length).toEqual(2);
            expect(employeeListData[0].lastName).toEqual('Rudd');
            expect(employeeListData[0].validEmployee).toBe(true);
        });

        it("the code must show an error if the mandatory data are not filled", function() {
            text = 'David,Rudd,60050,,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March';
            employeeListData = parseFile(text);
            expect(employeeListData[0].firstName).toEqual('Mandatory data not filled. The operations cannot be done');
            expect(employeeListData[0].validEmployee).toBe(false);
        });

        it("the code must be properly parsed if the text is not correct (not all the fields are filled)", function() {
            text = '9%,01 March – 31 March\nRyan,Chen,120000,10%,01 March – 31 March';
            employeeListData = parseFile(text);
            expect(employeeListData[0].firstName).toEqual('Not the correct input data filled. The record is not processed');
            expect(employeeListData[0].validEmployee).toBe(false);
        });
	});
});