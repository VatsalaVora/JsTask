import React from 'react';
class DemoCondition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    doUpdate() {
        if (this.state.islogin) {
            this.setState({ islogin: false })
        } else {
            this.setState({ islogin: true })
        }
    }

    render() {
        var a = this.state.islogin ? "Welcome" : "Bye"
        if (this.state.islogin) {
            
            return (<>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                {a}<br/>
                <input type='button' value="Logout" onClick={this.doUpdate.bind(this)}/>
                </div>
            </>);
        }else{
            return(<>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                {a}<br/>
                <input type='button' value="Login" onClick={this.doUpdate.bind(this)}/>
                </div>
            </>)
        }
    }
}

export default DemoCondition;