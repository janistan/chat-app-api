const cfenv = require('cfenv');
const fs = require('fs');

const appEnv = cfenv.getAppEnv({
    "vcap": {
        "services": process.env.VCAP_SERVICES || JSON.parse(fs.readFileSync('cfenv.json').toString())
    }
});

module.exports = appEnv;