/*jslint */
/*globals dataTypes*/

dataTypes.push({
    'caption'   : 'Deals',
    'name'      : 'deals',
    'titleBy'   : 'title',
    'structure' : [
        {
            'caption': 'Id',
            'name': 'id',
            'type': 'integer'
        },
        {
            'caption': 'Avatar',
            'name': 'avatar',
            'type': 'avatarUri'
        },
        {
            'caption': 'Title',
            'name': 'title',
            'type': 'mediumString'
        },
        {
            'caption': 'Description',
            'name': 'description',
            'type': 'text'
        },
        {
            'caption': 'Company',
            'name': 'company',
            'type': 'mediumString'
        },
        {
            'caption': 'Email',
            'name': 'email',
            'type': 'email'
        },
        {
            'caption': 'Phone',
            'name': 'phone',
            'type': 'phone'
        }
    ]
});