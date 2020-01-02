let SortedSet = require("collections/sorted-set");
let MinHeap = require("collections/heap");
let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]; // require("../utils/constants").letters;
const suggestionLength = 5;

class Suggestions {
    
    constructor(suggestion, priority) {
        this.suggestion = suggestion;
        this.priority = priority;
    }

    toString() {
        return "{" + this.suggestion + ", " + this.priority + "}";
    }

}

const equalsSet = (a, b) => {
    return (a.priority == b.priority && a.suggestion == b.suggestion);
}

const compareSet = (a, b) => {
    if(a.priority - b.priority == 0)
        return a.suggestion.localeCompare(b.suggestion);
    return a.priority - b.priority; 
}

const equalsHeap = (a, b) => {
    return (a.priority == b.priority && a.suggestion == b.suggestion);
}

const compareHeap = (a, b) => {
    if(a.priority - b.priority == 0)
        return b.suggestion.localeCompare(a.suggestion);
    return - a.priority + b.priority;
}

class TrieNode {
    
    constructor() {
        this.isEnd = false;
        this.children = {};
        this.frequency = 0;
        // this.suggestions = new SortedSet([], equalsSet, compareSet);
    }
    
    setSuggestions(anArray) {
        this.suggestions = new SortedSet(anArray, equalsSet, compareSet);
    }
    
}

class Trie {

    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        if( word.length === 0 ) return  // forbid empty string
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

    zzsetSuggestionsForPrefix(aNode, aPrefix = "") {
        let result = new MinHeap([], equalsHeap, compareHeap);
        if (aNode.isEnd) {
            result.push(new Suggestions(aPrefix, aNode.frequency));
        }
        for(let i = 0; i < letters.length; i++) {
            if(aNode.children.hasOwnProperty(letters[i])) {
                result.push(this.setSuggestionsForPrefix(aNode.children[letters[i]], aPrefix + letters[i]).toArray());
            }
        }
        if(result.length > 0) {
            while(result.length > suggestionLength)
                result.pop(); //console.log(result.pop());
            // console.log(`Setting suggestions for ${aPrefix} -> ${result}`)
            console.log(result.length);
            aNode.setSuggestions(result.toArray())
        }
        return result;
    }

    zzsetSuggestionsForTrie() {
        for(let i = 0; i < letters.length; i++)
            if(this.root.children.hasOwnProperty(letters[i]))
                this.zzsetSuggestionsForPrefix(this.root.children[letters[i]], letters[i]);
    }

    setSuggestionsForPrefix(aNode, aPrefix = "") {
        let result = [];
        // if (aNode.isEnd) {
        //     result.push(new Suggestions(aPrefix, aNode.frequency));
        // }
        for(let i = 0; i < letters.length; i++) {
            if(aNode.children.hasOwnProperty(letters[i])) {
                result = result.concat(...this.setSuggestionsForPrefix(aNode.children[letters[i]], aPrefix + letters[i]));
            }
        }
        if(result.length > 0) {
            result = result.slice(0, Math.min(suggestionLength, result.length));
            aNode.setSuggestions(result)
        }
        if (aNode.isEnd) {
            result.push(new Suggestions(aPrefix, aNode.frequency));
        }
        return result;
    }

    setSuggestionsForTrie() {
        for(let i = 0; i < letters.length; i++)
            if(this.root.children.hasOwnProperty(letters[i]))
                this.setSuggestionsForPrefix(this.root.children[letters[i]], letters[i]);
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
        result.frequency++
        return result.isEnd
    }

    getSuggestions(word) {
        let result = this.getNodeForPrefix(word);
        if( result === null ) return false
        result.frequency++
        return (result.suggestions) ? result.suggestions.toJSON() : "No suggestions";
    }

}


module.exports = Trie