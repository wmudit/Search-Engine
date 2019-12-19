let SortedSet = require("collections/sorted-set");
const suggestionLength = 5;

class Suggestions {
    
    constructor(suggestion, priority) {
        this.suggestion = suggestion;
        this.priority = priority;
    }

}

class TrieNode {
    
    constructor() {
        this.isEnd = false;
        this.children = {};
        this.suggestions = new SortedSet();
    }

}

class Trie {

    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        if( word.length === 0 ) return 	// forbid empty string
        let letter, curNode = this.root
        for( let i = 0; i < word.length; i++ ){
            letter = word[i]
            if( !curNode.children.hasOwnProperty(letter) ){
                curNode.children[letter] = new TrieNode()
            }
            curNode = curNode.children[letter]
        }
        curNode.isEnd = true
    }

    getNodeForPrefix(str) {
        let letter, curNode = this.root
        for( let i = 0; i < str.length; i++ ){
            letter = str[i]
            if( !curNode.children.hasOwnProperty(letter) ) 
                return null
            curNode = curNode.children[letter]
        }
        return curNode
    }

    isWord(word) {
        let result = this.getNodeForPrefix(word);
        if( result === null ) return false
        return result.isEnd
    }

}


module.exports = Trie

// let ace = "ace"
// let at = "at"
// let cat = "cat"
// let cab = "cab"
// let of = "of"

// let t = new Trie()
// t.insert(ace)
// console.log(t.isWord(ace))	  // true

// t.insert(ace)	
// console.log(t.isWord(ace))     // true

// t.insert(at)	
// console.log(t.isWord(at))      // true

// t.insert(cat)
// t.insert(cat)
// console.log(t.isWord(cat))     // true
// t.insert(cat)	

// t.insert(cab)
// console.log(t.isWord(cab))     // true

// t.insert(of)
// console.log(t.isWord(of))     // true

// // check the internal representation of the Trie
// console.log(t.root)

// t.root = new TrieNode();

// // console.log(t.root);