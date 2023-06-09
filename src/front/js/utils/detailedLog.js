//get a synchronous console.log from an exact point in code execution

export const detailedLog = (data) => {
    return (
        console.log(JSON.parse(JSON.stringify(data)))
    )
}