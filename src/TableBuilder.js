/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is the responsible of built the output table. It is built in HTML language and show the results
 * after do all the necessary operations to get the requested data.
 */

/**
 * @public
 * Is the responsible of creates the table with the output data and embed it into the HTML code to show them to the user.
 */
function showOutputData(){
    var table = document.createElement('table'),
        employee,
        employeeIndex;

    table.appendChild(createHeaderRow());
    for ( employeeIndex = 0; employeeIndex < employeeData.length; employeeIndex++){
        employee = employeeData[employeeIndex];
        table.appendChild(createRow(employee));
    }
    document.body.appendChild(table);
}

/**
 * @private
 * Creates the row for an employee with the data in the object.
 * @param employee Object that contains all the data to show.
 * @returns {Element} Returns the HTML DOM TableRow Object with the data to show.
 */
function createRow(employee){
    var row;

    row = document.createElement('tr');
    appendColumn(row, employee.firstName.concat(' ').concat(employee.lastName));
    appendColumn(row, employee.payPeriod);
    appendColumn(row, employee.grossIncome);
    appendColumn(row, employee.incomeTax);
    appendColumn(row, employee.netIncome);
    appendColumn(row, employee.superMonthly);

    return row;
}

/**
 * @private
 * Creates the header row with the headers to show in the table.
 * @returns {Element} Returns the HTML DOM TableRow Object with the headers.
 */
function createHeaderRow(){
    var row;

    row = document.createElement('tr');
    appendColumn(row, "Full Name");
    appendColumn(row, "Payment Period");
    appendColumn(row, "Monthly gross income");
    appendColumn(row, "Monthly income taxes");
    appendColumn(row, "Monthly net income");
    appendColumn(row, "Monthly super rate");

    return row;
}

/**
 * @private
 * Appends one column to the row. The column contains the text passed by parameter.
 * @param row The HTML DOM TableRow Object where the column is going to be appended.
 * @param textNode String with the text show in the column.
 */
function appendColumn(row, textNode){
    var column;

    column = document.createElement('td');
    column.appendChild(document.createTextNode(textNode));
    row.appendChild(column);
}