const Input = ( { type, name, min, max, placeholder, setFunc, pattern, title, step, idName} ) => {
    return (<input className="input_modif" id={idName} step={step} pattern={pattern} required title={title} type={type} name={name} minLength={min} maxLength={max} placeholder={placeholder} onChange={(e) => {
                                setFunc(e.target.value)
                            }}/>
    )
}

Input.defaultProps = {
    type : 'text',
    min : 4,
    max : 10,
    placeholder : 'texte'
}

export default Input