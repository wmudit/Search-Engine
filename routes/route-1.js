let express = require("express");
let router = express.Router();
let readline = require("readline");
let fs = require("fs");
let trie = require("../utils/constants").trie;

router.get('/', async function (req, res) {
    let startTime = process.hrtime();
    await buildTrie();
    res.send("Trie built in " + process.hrtime(startTime).join(" "));
    setSuggesions();
})

router.get('/query/:word', async function (req, res) {
    res.send(trie.getSuggestions(req.params.word));
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

function setSuggesions () {
    let startTime = process.hrtime();
    trie.setSuggestionsForTrie();
    console.log(`Trie suggestions fixed in ${process.hrtime(startTime).join(" ")}`);
}

module.exports = router;