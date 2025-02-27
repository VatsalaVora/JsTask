import React from 'react';
function MinicalcHooks() {

    const [numbers, setNumbers] = React.useState({ no1: 0, no2: 0});
    const [errors, setErrors] = React.useState({});
    const [ans, setAns] = React.useState("")

    const handleChange = (e) => {
        setNumbers({ ...numbers, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" })
    }

    const validateInputs = (operation) => {
        let err = {};
        let isValid = true;

        if (!numbers.no1) {
            isValid = false;
            err.no1 = "Please Enter No1";
        }
        if (!numbers.no2) {
            isValid = false;
            err.no2 = "Please Enter No2";
        }
        if (operation === "/" && numbers.no2 === "0") {
            isValid = false;
            err.no2 = "Cannot Divice By Zero";
        }
        setErrors(err)
        return isValid;
    };

    const doSum = (operation) => {
        if (!validateInputs(operation)) return;

        const num1 = parseInt(numbers.no1);
        const num2 = parseInt(numbers.no2);
        let result;

        if (operation === "+") {
            result = num1 + num2;
        }
        else if (operation === "-") {
            result = num1 - num2;
        }
        else if (operation === "/") {
            result = num1 / num2;
        }
        else if (operation === "*") {
            result = num1 * num2;
        }

        setAns(`${num1} ${operation} ${num2} = ${result}`)
    }


    return (<>
        No1 : <input type='text' name='no1' onChange={handleChange} style={{ marginRight: "10px" }} /><br/>
        <span style={{ color: "red", marginLeft: "10px" }}>{errors.no1}</span><br/>
        No2 : <input type='text' name='no2' onChange={handleChange} /><br/>
        <span style={{ color: "red", marginLeft: "10px" }}>{errors.no2}</span><br /><br />
        <input type="button" value=" + " onClick={() => doSum("+")} style={{ marginRight: "10px" }} />
        <input type="button" value=" - " onClick={() => doSum("-")} style={{ marginRight: "10px" }} />
        <input type="button" value=" * " onClick={() => doSum("*")} style={{ marginRight: "10px" }} />
        <input type="button" value=" / " onClick={() => doSum("/")} /><br/><br/>
        {ans}
    </>);
}

export default MinicalcHooks;