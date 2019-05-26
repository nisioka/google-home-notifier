const config = require('./config/default.json');

// for http server
const http = require('http');
const ngrok = require('ngrok');

// for googlehome
const googlehome = require('google-home-notifier');
const language = 'ja';

function googlehome_init() {
    googlehome.device(config.googlehome_name, language);
    googlehome.ip(config.googlehome_ip, language);
}

function googlehome_speak(text) {
    googlehome.notify(text, function (res) {
        console.log('googlehome_res : ' + res + '   speech_text : ' + text);
    });
}

// main()
googlehome_init();

http.createServer(function (request, response) {
    let post_data = '';

    request.on('data', function (chunk) {
        post_data += chunk;
    });

    request.on('end', function () {
        console.log('post_data : ' + post_data);

        const webHook = JSON.parse(post_data).events[0];
        if (webHook.type !== 'message' || webHook.message.type !== 'text') {
            return;
        }

        if (config.speakable_userid === '' || webHook.source.userId === config.speakable_userid) {
            const data_text = webHook.message.text;
            googlehome_speak(config.beginning_sentence + data_text);
        }

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end();
    });
}).listen(config.server_port, function () {
    ngrok.connect(config.server_port, function (err, url) {
        console.log('Endpoints:');
        console.log('    ' + url);
    });
});
