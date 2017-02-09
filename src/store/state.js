export const state = {
    view: 'table',
    selectedItem: null,
    selectedItems: [],
    data: '',
    dataProperties: {
        id: {
            value: 'ID',
            required: true,
            pattern: '',
            postBack: false,
            editable: false,
            showDefault: false
        },
        first_name: {
            value: 'First Name',
            required: true,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: true
        },
        last_name: {
            value: 'Last Name',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: true
        },
        company_name: {
            value: 'Company Name',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: true
        },
        address: {
            value: 'Address',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: false
        },
        city: {
            value: 'City',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: false
        },
        state: {
            value: 'State',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: false
        },
        zip: {
            value: 'Zip Code',
            required: false,
            pattern: '^([0-9]{5})$',
            postBack: true,
            editable: true,
            showDefault: false
        },
        phone: {
            value: 'Phone',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: true
        },
        work_phone: {
            value: 'Work Phone',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: false
        },
        email: {
            value: 'Email',
            required: false,
            pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$',
            postBack: true,
            editable: true,
            showDefault: true
        },
        url: {
            value: 'URL',
            required: false,
            pattern: '',
            postBack: true,
            editable: true,
            showDefault: false
        },
        created_at: {
            value: 'Created At',
            required: true,
            pattern: '',
            postBack: false,
            editable: false,
            showDefault: false
        },
        updated_at: {
            value: 'Updated At',
            required: true,
            pattern: '',
            postBack: false,
            editable: false,
            showDefault: false
        },
    },
};