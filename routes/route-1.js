let express = require("express");
let router = express.Router();
let readline = require("readline");
let fs = require("fs");
let trie = require("../utils/constants").trie;

router.get('/', function (req, res) {
    console.time("buildTrie");
    await buildTrie();
    res.send("Trie built in " + console.timeEnd("buildTrie"));
})

async function buildTrie () {
    return new Promise(async (resolve, reject) => {
        let rl = readline.createInterface( {
            input: fs.createReadStream("./utils/words_1.txt")
        });
        rl.on("line", function (line) {
            trie.insert(line.trim());
        }).on("close", function () {
            resolve(true);
        });
    });
}

module.exports = router;