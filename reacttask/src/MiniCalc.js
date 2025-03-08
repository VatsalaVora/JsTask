import React from 'react';

class MiniCalc extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myerr: {} };
    }

    doValidation(operation) {
        const { txt1, txt2 } = this.state;
        let isValid = true;
        let temperr = {};

        if (!txt1) {
            isValid = false;
            temperr.txt1 = "Please Enter No1";
        }
        if (!txt2) {
            isValid = false;
            temperr.txt2 = "Please Enter No2";
        }
        if (operation === '/' && txt2 === '0') {
            isValid = false;
            temperr.txt2 = "Cannot divide by zero";
        }

        this.setState({ myerr: temperr });
        return isValid;
    }

    doUpdate(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    doSum(operation) {
        let doCheck = this.doValidation(operation);
        if (doCheck) {
            const { txt1, txt2 } = this.state;
            let no1 = parseInt(txt1);
            let no2 = parseInt(txt2);
            let result;

            if (operation === '+') {
                result = no1 + no2;
                this.setState({ ans: `Sum of ${no1} + ${no2} = ` + result });
            } else if (operation === '-') {
                result = no1 - no2;
                this.setState({ ans: `Subtraction of ${no1} - ${no2} = ` + result });
            } else if (operation === '/') {
                result = no1 / no2;
                this.setState({ ans: `Division of ${no1} / ${no2} = ` + result });
            } else if (operation === '*') {
                result = no1 * no2;
                this.setState({ ans: `Multiplication of ${no1} * ${no2} = ` + result });
            }
        }
    }

    render() {
        return (
            <>
             <div style={{ textAlign: "center", marginTop: "50px" }}>
                No1: <input type='text' name="txt1" onChange={this.doUpdate.bind(this)} />
                <p style={{ color: 'red' }}>{this.state.myerr.txt1}</p>

                No2: <input type='text' name="txt2" onChange={this.doUpdate.bind(this)} />
                <p style={{ color: 'red' }}>{this.state.myerr.txt2}</p>

                <input type="button" value=" + " onClick={() => this.doSum('+')} />
                <> </>
                <input type="button" value=" - " onClick={() => this.doSum('-')} />
                <> </>
                <input type="button" value=" / " onClick={() => this.doSum('/')} />
                <> </>
                <input type="button" value=" * " onClick={() => this.doSum('*')} /><br />

                {this.state.ans}
                </div>
            </>
        );
    }
}

export default MiniCalc;
