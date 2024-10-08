function convertISOToDate(isoString) {
    const date = new Date(isoString);
    
    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Format day to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}/${month}/${year}`; // Return in dd/mm/yy format
}

export default convertISOToDate