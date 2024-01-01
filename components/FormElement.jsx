const FormElement = ({label, user, setUser, field, readonly, sanitize}) => {
    return (
        <label>
            <span className="form_label"> {label} </span>
            { readonly 
                ? <p> {user[field] ? user[field] : <i>(empty)</i>} </p>
                : <textarea
                    value={user[field]}
                    onChange={(e) => {
                        e.preventDefault();
                        if (readonly) return ;
                        if (sanitize !== undefined) {
                            const msg = sanitize(e.target.value);
                            if (msg.length) {
                                alert(`Invalid value for "${field}". Reason: ${msg}`)
                                return ;
                            }
                        }
                        // console.log("Changing ", field, " to ", e.target.value);
                        const newUser = {...user};
                        newUser[field] = e.target.value
                        setUser(newUser)
                    }}
                    placeholder={`Enter new ${field}...`}
                    required
                    className="form_textarea"
                />
            }
        </label>
    )
}

export default FormElement