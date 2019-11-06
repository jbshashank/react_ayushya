import validation from "validate.js";

let constraints = {
    firstName: {
        presence: { allowEmpty: false },
        format: {
            pattern: "[a-z_ ]+",
            flags: "i",
            message: "can only contain alphabets"
        }
    },
    middleName: {
        // presence: {allowEmpty: false},
        // format: {
        //     pattern:"[a-z_ ]+",
        //     flags: "i",
        //     message: "can only contain alphabets"
        // }
    },
    lastName: {
        presence: { allowEmpty: false },
        format: {
            pattern: "[a-z_ ]+",
            flags: "i",
            message: "can only contain alphabets"
        }
    },
    pinCode: {
        length: { is: 6 }
    },
    phoneNumber: {
        presence: { allowEmpty: false },
        length: { is: 10 },
        numericality: {
            onlyInteger: true,
            notValid: "Please enter valid mobile number",
            notInteger: "Please enter valid mobile number",
        }
    },
    email: {
        presence: { allowEmpty: false },
        // email: true,
        format: {
            pattern: "[A-Z0-9._%+-]+@[A-Z0-9.-]+(?:com|org|net|in|edu|info|net|co.in)",
            flags: "i",
            message: "is not a valid email"
        }
    },
    salary: {
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            notValid: "Please enter valid salary",
            notInteger: "Please enter number",
            notGreaterThan: "Salary should be greater than 0"
        }
    },
    age: {
        presence: { allowEmpty: false },
        numericality: {
            greaterThan: 0,
            notValid: "Please enter valid Date",
            notGreaterThan: "Age should be greater than 0"
        }
    },
    expertiseLevel: {
        presence: { allowEmpty: false },
        format: {
            pattern: "[a-z_ ]+",
            flags: "i",
            message: "can only contain alphabets"
        }
    },
    skills: {
        presence: { allowEmpty: false },
        format: {
            pattern: "[a-z_ ]+",
            flags: "i",
            message: "can only contain alphabets"
        }
    },
    role: {
        presence: { allowEmpty: false },
        format: {
            pattern: "[a-z_ ]+",
            flags: "i",
            message: "can only contain alphabets"
        }
    },
    location: {
        presence: { allowEmpty: false },
        // format: {
        //     pattern:"[a-zA-Z]+",
        //     // flags: "i",
        //     message: "can only contain alphabets"
        // }
    },
    city: {
        presence: { allowEmpty: true },
        // format: {
        //     pattern:"[a-zA-Z]+",
        //     // flags: "i",
        //     message: "can only contain alphabets"
        // }
    },
    state: {
        presence: { allowEmpty: true },
        // format: {
        //     pattern:"[a-zA-Z]+",
        //     // flags: "i",
        //     message: "can only contain alphabets"
        // }
    },

};

export default function validate(fieldName, value) {
    let formValues = {};
    formValues[fieldName] = value;

    let formFields = {};
    formFields[fieldName] = constraints[fieldName];

    let result = validation(formValues, formFields, { fullMessages: false });

    if (result) {
        return result[fieldName][0];
    }
    return null;
}



