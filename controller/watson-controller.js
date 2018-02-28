const Promise = require('bluebird');
const cfenv = require('./../config/cfenv-init.js');
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

const text_to_speech = new TextToSpeechV1({
    url: cfenv.services.text_to_speech[0].credentials.url,
    username: cfenv.services.text_to_speech[0].credentials.username,
    password: cfenv.services.text_to_speech[0].credentials.password,
});

const conversation = new ConversationV1({
    url: cfenv.services.conversation[0].credentials.url,
    username: cfenv.services.conversation[0].credentials.username,
    password: cfenv.services.conversation[0].credentials.password,
    version_date: ConversationV1.VERSION_DATE_2017_05_26
});

conversation.message = Promise.promisify(conversation.message);

exports.sendConversation = (req, res, next) => {
    conversation.message({
            input: {
                text: req.body.text
            },
            workspace_id: "91abcbbd-1d4a-4336-949c-30f56c67dd21",
            context: req.body.context
        })
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.tts = (req, res, next) => {
    var params = {
        text: req.body.text,
        voice: 'en-US_AllisonVoice', // Optional voice
        accept: 'audio/wav'
    };
    // Pipe the synthesized text to a file
    text_to_speech.synthesize(params).pipe(res);
};