/**
 * Formats a number as Indian Rupee (INR) currency.
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted currency string.
 */
export const formatPrice = (amount) => {
    if (amount === undefined || amount === null) return '₹0.00';

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
