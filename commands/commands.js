import 'dotenv/config';

const ANNOY_COMMAND = {
    name: 'annoy',
    description: 'make willfromafar say the given text to michael',
    options: [{
        type: 3, // string
        name: 'message',
        description: 'the message that will be read aloud',
        required: true
    }],
    type: 1, // CHAT_INPUT
};

const QUERY_COMMAND = {
    name: 'query',
    description: 'Ask mikebot what he thinks about something',
    type: 1, // CHAT_INPUT
}

const HONK_COMMAND = {
    name: 'honk',
    dascription: 'honks a horn, somewhere out there, you\'ll have to trust me',
    type: 1, //CHAT_UNPUT
}

export const ALL_COMMANDS = [ANNOY_COMMAND, QUERY_COMMAND];