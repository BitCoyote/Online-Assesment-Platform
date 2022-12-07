export const replaceJwtSpecialSymb = (line) => {
    return line.replaceAll('=', '')
               .replaceAll('+', '-')
               .replaceAll('/', '_');
}