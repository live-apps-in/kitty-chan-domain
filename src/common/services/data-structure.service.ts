import { injectable } from 'inversify';

@injectable()
export class DataStructure {
  private trie: Trie = new Trie();

  matchPhrase(
    message: string,
    lib: string[],
    whitelist: string[] = [],
  ): { detected: boolean; match: string[] } {
    this.trie = new Trie(); // Reset the trie before inserting new phrases
    this.insertPhrases(lib);

    const detectedTexts: string[] = this.trie.searchWords(message, whitelist);
    const detected = detectedTexts.length > 0;

    return {
      detected,
      match: detectedTexts,
    };
  }
  private insertPhrases(phrases: string[]) {
    for (const phrase of phrases) {
      this.trie.insert(phrase);
    }
  }
}

class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord = false;
}

class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  searchWords(text: string, whitelist: string[]): string[] {
    const result: string[] = [];
    let node = this.root;
    let currentWord = '';
    for (const char of text) {
      if (!node.children[char]) {
        node = this.root;
        currentWord = '';
      } else {
        node = node.children[char];
        currentWord += char;
        if (
          node.isEndOfWord &&
          (!whitelist.length || !whitelist.includes(currentWord))
        ) {
          result.push(currentWord);
        }
      }
    }
    return result;
  }
}
