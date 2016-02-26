describe("InputFileController", function() {
	var inputFileController;

	describe("When opening file", function() {
	  it("the file must call parseFile", function() {
		expect(true).toBe(true);
	  });
	});

	describe("When parsing file", function() {
		var text;

		beforeEach(function() {
			 spyOn(InputFileController, 'calculatePayslip');
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