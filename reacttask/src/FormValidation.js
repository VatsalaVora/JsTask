import React from 'react';

class FormValidation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            mobile: "",
            email: "",
            password: "",
            confpassword: "",
            gender: "",
            city: "",
            hobbies: [],
            errors: {}
        };
    }

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            this.setState((prevState) => {
                const hobbies = checked
                    ? [...prevState.hobbies, value]
                    : prevState.hobbies.filter((hobby) => hobby !== value);
                return { hobbies };
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    validateForm = () => {
        const { name, surname, mobile, email, password, confpassword, gender, city, hobbies } = this.state;
        let errors = {};
        let isValid = true;

        if (!name) {
            errors.name = "Name is required.";
            isValid = false;
        } else if (name.length < 2) {
            errors.name = "Name must be at least 2 characters long.";
            isValid = false;
        }

        if (!surname) {
            errors.surname = "Surname is required.";
            isValid = false;
        } else if (surname.length < 2) {
            errors.surname = "Surname must be at least 2 characters long.";
            isValid = false;
        }

        if (!mobile) {
            errors.mobile = "Mobile number is required.";
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(mobile)) {
            errors.mobile = "Mobile number must be 10 digits.";
            isValid = false;
        }

        if (!email) {
            errors.email = "Email is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid email format. Example: example@domain.com";
            isValid = false;
        }

        if (!password) {
            errors.password = "Password is required.";
            isValid = false;
        } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
            errors.password = "Password must be at least 8 characters long, include an uppercase letter and a special character.";
            isValid = false;
        }

        if (!confpassword) {
            errors.confpassword = "Confirm Password is required.";
            isValid = false;
        } else if (password !== confpassword) {
            errors.confpassword = "Passwords do not match.";
            isValid = false;
        }

        if (!gender) {
            errors.gender = "Gender selection is required.";
            isValid = false;
        }

        if (!city) {
            errors.city = "City selection is required.";
            isValid = false;
        }

        if (hobbies.length === 0) {
            errors.hobbies = "Please select at least one hobby.";
            isValid = false;
        }

        this.setState({ errors });
        return isValid;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            alert("Form submitted successfully!");
            this.setState({
                name: "",
                surname: "",
                mobile: "",
                email: "",
                password: "",
                confpassword: "",
                gender: "",
                city: "",
                hobbies: [],
                errors: {}
            });
        }
    };

    render() {
        const { errors, name, surname, mobile, email, gender, city, hobbies, password, confpassword } = this.state;
        return (
            <>
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Personal Information</legend>
                        Name: <input type='text' name="name" value={name} placeholder='Please Enter Name' onChange={this.handleChange} />
                        <div style={{ color: "red" }}>{errors.name}</div>
                        Surname:<input type='text' name='surname' value={surname} placeholder='Please Enter Surname' onChange={this.handleChange} />
                        <div style={{ color: "red" }}>{errors.surname}</div>
                        Mobile No.:<input type='text' name='mobile' value={mobile} placeholder='Please Enter Mobile No' onChange={this.handleChange} />
                        <div style={{ color: "red" }}>{errors.mobile}</div>
                        Email:<input type='text' name='email' value={email} placeholder='Please Enter Email' onChange={this.handleChange} />
                        <div style={{ color: "red" }}>{errors.email}</div>
                        <hr />

                        Gender :
                         <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={this.handleChange} />Male
                         <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={this.handleChange} />Female
                        <div style={{ color: "red" }}>{errors.gender}</div>
                        <hr />

                        City :
                        <select name="city" value={city} onChange={this.handleChange}>
                            <option value="">Select City</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="delhi">Delhi</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="bangalore">Bangalore</option>
                            <option value="kolkata">Kolkata</option>
                        </select>
                        <div style={{ color: "red" }}>{errors.city}</div>
                        <hr />

                        <legend>Hobby:</legend>
                        <input type="checkbox" name="hobby" value="cricket" checked={hobbies.includes("cricket")} onChange={this.handleChange} /> Cricket<br />
                        <input type="checkbox" name="hobby" value="traveling" checked={hobbies.includes("traveling")} onChange={this.handleChange} /> Traveling<br />
                        <input type="checkbox" name="hobby" value="reading" checked={hobbies.includes("reading")} onChange={this.handleChange} /> Reading<br />
                        <input type="checkbox" name="hobby" value="music" checked={hobbies.includes("music")} onChange={this.handleChange} /> Music
                        <div style={{ color: "red" }}>{errors.hobbies}</div>
                        <hr />

                        <legend>Password</legend>
                        Password:<input type='password' name='password' value={password} placeholder='Please Enter Password' onChange={this.handleChange} />
                        <div style={{ color: "red" }}>{errors.password}</div><br />
                        Confirm Password:<input type='password' name='confpassword' value={confpassword} placeholder='Please Enter Password' onChange={this.handleChange} />
                        <div style={{ color: "red" }}>{errors.confpassword}</div>
                        <hr />
                        <div style={{ textAlign: 'center' }}>
                            <button type='submit'>Submit</button>
                        </div>
                    </fieldset>
                </form>
                </div>
            </>
        );
    }
}

export default FormValidation;