export const getOmissionName = (str) => {
    const arr = str.split(' ');
    if(arr.length < 2) { // If User name is not such format [First Name] [Last Name]
        return arr[0].slice(0,2).toUpperCase();
    }
    else {
        const firstLetter = arr[0].slice(0,1).toUpperCase();
        const lastLetter = arr[1].slice(0,1).toUpperCase();
        return `${firstLetter}${lastLetter}`;
    }
}