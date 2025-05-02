
const Input = (input: string) => {
    return (
        <input
            type="text"
            value={input}
            onChange={(e) => {
                input = e.target.value;
            }}
        />
    )
}


export default Input;