import { StreamEvents } from './streamEvents';

const mockResponse: StreamEvents = {
    events: [
        {
            videoStream: 'Warriors Game',
            timestamp: 1506866940,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1048,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Warriors Game',
            timestamp: 1506867000,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Bus Stop',
            timestamp: 1506867254,
            imageSource: 'http://media.bizj.us/view/img/10183383/passenger-boarding-bus*1200xx3948-2221-0-220.jpg',
            predictions: [
                {
                    boundingBox: {
                        top: 0,
                        left: 0.068,
                        height: 0.877,
                        width: 0.811,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 99,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 1,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.469,
                        left: 0.736,
                        height: 0.34,
                        width: 0.193,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 9,
                        },
                        {
                            label: 'Bike',
                            score: 83,
                        },
                        {
                            label: 'Person',
                            score: 2,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.299,
                        left: 0.395,
                        height: 0.543,
                        width: 0.104,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 6,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 92,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Vet Hospital',
            timestamp: 1506867328,
            imageSource:
                'https://cdn.shopify.com/s/files/1/0344/6469/products/New-Cute-Pet-Cat-Costume-Cartoon-Funny-Pet-Cat-Clothes-Hot-Puppy-Clothing-Doctor-Uniform-Hat_copy_1024x1024.jpg?v=1504800100',
            predictions: [
                {
                    boundingBox: {
                        top: 0.113,
                        left: 0.254,
                        height: 0.754,
                        width: 0.498,
                    },
                    scores: [
                        {
                            label: 'Doctor Cat',
                            score: 99,
                        },
                        {
                            label: 'Doctor Dog',
                            score: 10,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Warriors Game',
            timestamp: 1506867500,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1048,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Warriors Game',
            timestamp: 1506869500,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Vet Hospital',
            timestamp: 1506869555,
            imageSource:
                'https://cdn.shopify.com/s/files/1/0344/6469/products/New-Cute-Pet-Cat-Costume-Cartoon-Funny-Pet-Cat-Clothes-Hot-Puppy-Clothing-Doctor-Uniform-Hat_copy_1024x1024.jpg?v=1504800100',
            predictions: [
                {
                    boundingBox: {
                        top: 0.113,
                        left: 0.254,
                        height: 0.754,
                        width: 0.498,
                    },
                    scores: [
                        {
                            label: 'Doctor Cat',
                            score: 99,
                        },
                        {
                            label: 'Doctor Dog',
                            score: 10,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Warriors Game',
            timestamp: 1506869600,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1048,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Warriors Game',
            timestamp: 1506873678,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Bus Stop',
            timestamp: 1506873702,
            imageSource: 'http://media.bizj.us/view/img/10183383/passenger-boarding-bus*1200xx3948-2221-0-220.jpg',
            predictions: [
                {
                    boundingBox: {
                        top: 0,
                        left: 0.068,
                        height: 0.877,
                        width: 0.811,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 99,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 1,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.469,
                        left: 0.736,
                        height: 0.34,
                        width: 0.193,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 9,
                        },
                        {
                            label: 'Bike',
                            score: 83,
                        },
                        {
                            label: 'Person',
                            score: 2,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.299,
                        left: 0.395,
                        height: 0.543,
                        width: 0.104,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 6,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 92,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Vet Hospital',
            timestamp: 1506873872,
            imageSource:
                'https://cdn.shopify.com/s/files/1/0344/6469/products/New-Cute-Pet-Cat-Costume-Cartoon-Funny-Pet-Cat-Clothes-Hot-Puppy-Clothing-Doctor-Uniform-Hat_copy_1024x1024.jpg?v=1504800100',
            predictions: [
                {
                    boundingBox: {
                        top: 0.113,
                        left: 0.254,
                        height: 0.754,
                        width: 0.498,
                    },
                    scores: [
                        {
                            label: 'Doctor Cat',
                            score: 99,
                        },
                        {
                            label: 'Doctor Dog',
                            score: 10,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Bus Stop',
            timestamp: 1506873999,
            imageSource: 'http://media.bizj.us/view/img/10183383/passenger-boarding-bus*1200xx3948-2221-0-220.jpg',
            predictions: [
                {
                    boundingBox: {
                        top: 0,
                        left: 0.068,
                        height: 0.877,
                        width: 0.811,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 99,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 1,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.469,
                        left: 0.736,
                        height: 0.34,
                        width: 0.193,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 9,
                        },
                        {
                            label: 'Bike',
                            score: 83,
                        },
                        {
                            label: 'Person',
                            score: 2,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.299,
                        left: 0.395,
                        height: 0.543,
                        width: 0.104,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 6,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 92,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Vet Hospital',
            timestamp: 1506874236,
            imageSource:
                'https://cdn.shopify.com/s/files/1/0344/6469/products/New-Cute-Pet-Cat-Costume-Cartoon-Funny-Pet-Cat-Clothes-Hot-Puppy-Clothing-Doctor-Uniform-Hat_copy_1024x1024.jpg?v=1504800100',
            predictions: [
                {
                    boundingBox: {
                        top: 0.113,
                        left: 0.254,
                        height: 0.754,
                        width: 0.498,
                    },
                    scores: [
                        {
                            label: 'Doctor Cat',
                            score: 99,
                        },
                        {
                            label: 'Doctor Dog',
                            score: 10,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Warriors Game',
            timestamp: 1506874378,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1048,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Bus Stop',
            timestamp: 1506875012,
            imageSource: 'http://media.bizj.us/view/img/10183383/passenger-boarding-bus*1200xx3948-2221-0-220.jpg',
            predictions: [
                {
                    boundingBox: {
                        top: 0,
                        left: 0.068,
                        height: 0.877,
                        width: 0.811,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 99,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 1,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.469,
                        left: 0.736,
                        height: 0.34,
                        width: 0.193,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 9,
                        },
                        {
                            label: 'Bike',
                            score: 83,
                        },
                        {
                            label: 'Person',
                            score: 2,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.299,
                        left: 0.395,
                        height: 0.543,
                        width: 0.104,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 6,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 92,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Vet Hospital',
            timestamp: 1506875478,
            imageSource:
                'https://cdn.shopify.com/s/files/1/0344/6469/products/New-Cute-Pet-Cat-Costume-Cartoon-Funny-Pet-Cat-Clothes-Hot-Puppy-Clothing-Doctor-Uniform-Hat_copy_1024x1024.jpg?v=1504800100',
            predictions: [
                {
                    boundingBox: {
                        top: 0.113,
                        left: 0.254,
                        height: 0.754,
                        width: 0.498,
                    },
                    scores: [
                        {
                            label: 'Doctor Cat',
                            score: 99,
                        },
                        {
                            label: 'Doctor Dog',
                            score: 10,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Vet Hospital',
            timestamp: 1506903236,
            imageSource:
                'https://cdn.shopify.com/s/files/1/0344/6469/products/New-Cute-Pet-Cat-Costume-Cartoon-Funny-Pet-Cat-Clothes-Hot-Puppy-Clothing-Doctor-Uniform-Hat_copy_1024x1024.jpg?v=1504800100',
            predictions: [
                {
                    boundingBox: {
                        top: 0.113,
                        left: 0.254,
                        height: 0.754,
                        width: 0.498,
                    },
                    scores: [
                        {
                            label: 'Doctor Cat',
                            score: 99,
                        },
                        {
                            label: 'Doctor Dog',
                            score: 10,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Vet Hospital',
            timestamp: 1506914790,
            imageSource:
                'https://cdn.shopify.com/s/files/1/0344/6469/products/New-Cute-Pet-Cat-Costume-Cartoon-Funny-Pet-Cat-Clothes-Hot-Puppy-Clothing-Doctor-Uniform-Hat_copy_1024x1024.jpg?v=1504800100',
            predictions: [
                {
                    boundingBox: {
                        top: 0.113,
                        left: 0.254,
                        height: 0.754,
                        width: 0.498,
                    },
                    scores: [
                        {
                            label: 'Doctor Cat',
                            score: 99,
                        },
                        {
                            label: 'Doctor Dog',
                            score: 10,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Bus Stop',
            timestamp: 1506917012,
            imageSource: 'http://media.bizj.us/view/img/10183383/passenger-boarding-bus*1200xx3948-2221-0-220.jpg',
            predictions: [
                {
                    boundingBox: {
                        top: 0,
                        left: 0.068,
                        height: 0.877,
                        width: 0.811,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 99,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 1,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.469,
                        left: 0.736,
                        height: 0.34,
                        width: 0.193,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 9,
                        },
                        {
                            label: 'Bike',
                            score: 83,
                        },
                        {
                            label: 'Person',
                            score: 2,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.299,
                        left: 0.395,
                        height: 0.543,
                        width: 0.104,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 6,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 92,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Warriors Game',
            timestamp: 1506924378,
            imageSource:
                'https://img.bleacherreport.net/img/images/photos/003/564/898/hi-res-e46449ab73fc1cc3a55b4b4801d24d95_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top',
            predictions: [
                {
                    boundingBox: {
                        top: 0.1094,
                        left: 0.5678,
                        height: 0.1985,
                        width: 0.1048,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 3,
                        },
                        {
                            label: 'Draymond Green',
                            score: 94,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.1922,
                        left: 0.3514,
                        height: 0.2148,
                        width: 0.1044,
                    },
                    scores: [
                        {
                            label: 'Steph Curry',
                            score: 97,
                        },
                        {
                            label: 'Draymond Green',
                            score: 2,
                        },
                    ],
                },
            ],
        },
        {
            videoStream: 'Bus Stop',
            timestamp: 1506927366,
            imageSource: 'http://media.bizj.us/view/img/10183383/passenger-boarding-bus*1200xx3948-2221-0-220.jpg',
            predictions: [
                {
                    boundingBox: {
                        top: 0,
                        left: 0.068,
                        height: 0.877,
                        width: 0.811,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 99,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 1,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.469,
                        left: 0.736,
                        height: 0.34,
                        width: 0.193,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 9,
                        },
                        {
                            label: 'Bike',
                            score: 83,
                        },
                        {
                            label: 'Person',
                            score: 2,
                        },
                    ],
                },
                {
                    boundingBox: {
                        top: 0.299,
                        left: 0.395,
                        height: 0.543,
                        width: 0.104,
                    },
                    scores: [
                        {
                            label: 'Bus',
                            score: 6,
                        },
                        {
                            label: 'Bike',
                            score: 3,
                        },
                        {
                            label: 'Person',
                            score: 92,
                        },
                    ],
                },
            ],
        },
    ],
};

export default mockResponse;
