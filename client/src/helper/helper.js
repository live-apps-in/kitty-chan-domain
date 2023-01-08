export const comma_separate_number = (number) => {
     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}