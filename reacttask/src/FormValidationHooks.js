import React, { useState } from 'react';

function FormValidationHooks() {

    const [formData, setFormData] = React.useState({
        name: "",
        surname: "",
        mobile: "",
        email: "",
        password: "",
        confpassword: "",
        gender: "",
        city: "",
        hobbies: []
    })
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            setFormData(prevState => {
                const hobbies = checked
                    ? [...prevState.hobbies, value]
                    : prevState.hobbies.filter(hobby => hobby !== value);
                return { ...prevState, hobbies };
            });
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    }

    const validateForm = () => {
        const { name, surname, mobile, email, password, confpassword, gender, city, hobbies } = formData
        let errors = {};
        let isValid = true;

        if (!name) {
            errors.name = "Name is Required."
            isValid = false
        } else if (name.length < 2) {
            errors.name = "Name Must be at Least 2 Characters Long."
            isValid = false
        }

        if (!surname) {
            errors.surname = "Surname is Required."
            isValid = false
        } else if (surname.length < 2) {
            errors.surname = "Surname Must be at Least 2 Characters Long."
        }

        if (!mobile) {
            errors.mobile = "Mobile Number is Required."
            isValid = false
        } else if (!/^[0-9]{10}$/.test(mobile)) {
            errors.mobile = "Mobile Number Must be 10 Digits."
            isValid = false
        }

        if (!email) {
            errors.email = "Email is Required."
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Invalid Email Format."
            isValid = false
        }

        if (!password) {
            errors.password = "Password is Required."
            isValid = false;
        } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(password)) {
            errors.password = "Password Must be Atleast 8 Characters Long,Include an Uppercase Letter & Special Character."
            isValid = false;
        }

        if (!confpassword) {
            errors.confpassword = "Confirm Password is Required."
            isValid = false
        } else if (password !== confpassword) {
            errors.confpassword = "Confirm Password Should be Same as Password."
            isValid = false
        }

        if (!gender) {
            errors.gender = "Gender Selection is Required."
            isValid = false;
        }

        if (!city) {
            errors.city = "City Selection is Required."
            isValid = false;
        }

        if (hobbies.length === 0) {
            errors.hobbies = "Please Select Atleast One Hobby."
            isValid = false
        }

        setErrors(errors)
        return isValid
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert("Form Submitted Successfully!");
            setFormData({
                name: "",
                surname: "",
                mobile: "",
                email: "",
                password: "",
                confpassword: "",
                gender: "",
                city: "",
                hobbies: []
            })
            setErrors({})
        }
    }


    return (<>
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Personal Information</legend>
                Name: <input type='text' name="name" value={formData.name} placeholder='Please Enter Name' onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.name}</div>
                Surname: <input type='text' name='surname' value={formData.surname} placeholder='Please Enter Surname' onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.surname}</div>
                Mobile No.: <input type='text' name='mobile' value={formData.mobile} placeholder='Please Enter Mobile No' onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.mobile}</div>
                Email: <input type='text' name='email' value={formData.email} placeholder='Please Enter Email' onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.email}</div>
                <hr />

                Gender :
                <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
                <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
                <div style={{ color: "red" }}>{errors.gender}</div>
                <hr />

                City :
                <select name="city" value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Kolkata">Kolkata</option>
                </select>
                <div style={{ color: "red" }}>{errors.city}</div>
                <hr />

                <legend>Hobbies:</legend>
                <input type="checkbox" name="hobby" value="cricket" checked={formData.hobbies.includes("cricket")} onChange={handleChange} /> Cricket <br />
                <input type="checkbox" name="hobby" value="traveling" checked={formData.hobbies.includes("traveling")} onChange={handleChange} /> Traveling<br />
                <input type="checkbox" name="hobby" value="reading" checked={formData.hobbies.includes("reading")} onChange={handleChange} /> Reading<br />
                <input type="checkbox" name="hobby" value="music" checked={formData.hobbies.includes("music")} onChange={handleChange} /> Music
                <div style={{ color: "red" }}>{errors.hobbies}</div>
                <hr />

                <legend>Password</legend>
                <label>Password:</label> <input type='password' name='password' value={formData.password} placeholder='Please Enter Password' onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.password}</div><br />
                <label>Confirm Password:</label> <input type='password' name='confpassword' value={formData.confpassword} placeholder='Please Confirm Password' onChange={handleChange} />
                <div style={{ color: "red" }}>{errors.confpassword}</div>
                <hr />
                <div style={{ textAlign: 'center' }}>
                    <button type='submit'>Submit</button>
                </div>
            </fieldset>
        </form>
    </>);
}

export default FormValidationHooks;