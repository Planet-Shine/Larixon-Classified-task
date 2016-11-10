/*jslint */
/*globals dataTypes*/

dataTypes.push({
    'caption' : 'Events',
    'name'    : 'events',
    'titleBy' : 'title',
    'structure'  : [
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
            'caption' : 'Title',
            'name'    : 'title',
            'type'    : 'mediumString'
        },
        {
            'caption' : 'Time',
            'name'    : 'time',
            'type'    : 'time'
        },
        {
            'caption' : 'Address',
            'name'    : 'address',
            'type'    : 'longString'
        }
    ]
});