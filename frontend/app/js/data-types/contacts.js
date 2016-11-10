/*jslint */
/*globals dataTypes*/

dataTypes.push({
    'caption'   : 'Contacts',
    'name'      : 'contacts',
    'titleBy'   : 'name',
    'structure' : [
        {
            'caption' : 'Id',
            'name'    : 'id',
            'type'    : 'integer'
        },
        {
            'caption' : 'Avatar',
            'name'    : 'avatar',
            'type'    : 'avatarUri'
        },
        {
            'caption' : 'Name',
            'name'    : 'name',
            'type'    : 'person'
        },
        {
            'caption' : 'Phone',
            'name'    : 'phone',
            'type'    : 'phone'
        },
        {
            'caption' : 'Email',
            'name'    : 'email',
            'type'    : 'email'
        },
        {
            'caption' : 'Address',
            'name'    : 'address',
            'type'    : 'longString'
        }
    ]
});