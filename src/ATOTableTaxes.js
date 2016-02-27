/**
 * @author Isabel Vico Peinado [isabel.vico.peinado@gmail.com]
 * This class is responsible of store all the static data. If the ATO Table change, here is the place to change
 * the data
 */

/**
 * TaxableIncome refers to the ranges of the salaries to determine the taxes to apply.
 * @type {number}
 * highSalary is consider over $180001
 * mediumSalary is consider between $80001 and $180000
 * midLowSalary is consider between $37001 and $80000
 * lowSalary is consider lower than $18200
 */
const taxableIncome ={
        highSalary: 180000,
        mediumSalary: 80000,
        midLowSalary: 37000,
        lowSalary: 18200
    };

/**
 * fixedTaxes refers to the fix amount to pay depending of the annual salary.
 * @type {number}
 * highTax is $54547, this is the fixed amount payed if the salary is in 'highSalary' range,
 * mediumTax is $17547, this is the fixed amount payed if the salary is in 'mediumSalary' range,
 * lowTax is $3572, this is the fixed amount payed if the salary is in 'midLowSalary' range,
 * If the salary is in 'lowSalary' range, the employee does not need to pay a fixed amount, just the variable one.
 */
const fixedTaxes = {
        highTax: 54547,
        mediumTax: 17547,
        lowTax: 3572
    };

/**
 * variableTaxes refers to the variable amount to pay for every cent over the range, depending of the annual salary.
 * @type {number}
 * highVarTax is 0.45c, this is the variable amount payed each $1 over the 'highSalary' range,
 * mediumVarTax is 0.37c, this is the variable amount payed each $1 over the 'mediumSalary' range,
 * midLowVarTax is 0.325c, this is the variable amount payed each $1 over the 'midLowSalary' range,
 * lowVarTax is 0.19c, this is the variable amount payed each $1 over the 'lowSalary' range,
 * If the salary is less than the consider as 'lowSalary' range, the employee does not need to pay any tax.
 */
const variableTaxes = {
        highVarTax: 0.45,
        mediumVarTax: 0.37,
        midLowVarTax: 0.325,
        lowVarTax: 0.19,
        noTax:0
    };

/**
 * This is the number of months to divide the annual period. This is not usual that suffer any change.
 * @type {number} Usually the number of months consider in the business period is 12.
 */
const periodicMonths = 12;

