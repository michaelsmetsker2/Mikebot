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

const TTM_COMMAND = {
    name: 'ttm',
    description: 'text to michael',
    options: [{
        type: 3, //string
        name: 'text',
        description: 'text that will to michael',
        required: true
    }],
    type: 1, // CHAT_INPUT
}

export const ALL_COMMANDS = [ANNOY_COMMAND, QUERY_COMMAND, TTM_COMMAND];