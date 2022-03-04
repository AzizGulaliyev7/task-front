export const rules = {
    name: [
        { required: true, message: 'Please, enter the company name ', trigger: 'blur' },
        { min: 2, max: 200, message: 'Length must be from 2 to 200', trigger: 'blur' }
    ],
    phone_number: [
        { required: true, message: 'Please, enter the company phone number ', trigger: 'blur' },
    ]
};