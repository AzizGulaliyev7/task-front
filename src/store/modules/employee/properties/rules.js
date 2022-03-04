export const rules = {
    first_name: [
        { required: true, message: 'Please, enter first name ', trigger: 'blur' },
        { min: 2, max: 200, message: 'Length must be from 2 to 200', trigger: 'blur' }
    ],
    passport_number: [
        { required: true, message: 'Please, enter passport number ', trigger: 'blur' }
    ],
    last_name: [
        { required: true, message: 'Please, enter last name ', trigger: 'blur' },
        { min: 2, max: 200, message: 'Length must be from 2 to 200', trigger: 'blur' }
    ],
    phone_number: [
        { required: true, message: 'Please, enter employee phone number ', trigger: 'blur' },
    ]
};