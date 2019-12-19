let express = require("express");
let router = express.Router();
let readline = require("readline");
let fs = require("fs");
let trie = require("../utils/constants").trie;

router.get('/', async function (req, res) {
    let startTime = process.hrtime();
    await buildTrie();
    res.send("Trie built in " + process.hrtime(startTime).join(" "));
})

async function buildTrie () {
    return new Promise(async (resolve, reject) => {
        let rl = readline.createInterface( {
            input: fs.createReadStream("./lib/words_1.txt")
        });
        rl.on("line", function (line) {
            trie.insert(line.trim());
        }).on("close", function () {
            resolve(true);
        });
    });
}

module.exports = router;