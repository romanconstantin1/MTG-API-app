export const htmlNameEncode = (name) => {
    const newName = name
        .replaceAll(" ", "+")
        .replaceAll(",", "%2C")
        .replaceAll("'", "%27")
    return newName
}