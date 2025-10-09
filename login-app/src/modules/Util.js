export function toTitleCase(str){
    return str
    .replace(/([A-Z])/g, ' $1')       // Add space before capital letters
    .replace(/^./, s => s.toUpperCase()); // Capitalize first letter
}