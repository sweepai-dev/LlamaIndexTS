import { Document, NodeRelationship, TextNode } from "./Node";
import { SentenceSplitter } from "./TextSplitter";
import { DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE } from "./constants";

/**
 * Splits the text of a document into smaller parts.
 * 
 * @param {Document} document - The document to split.
 * @param {SentenceSplitter} textSplitter - The splitter to use for splitting the document.
 * @returns {string[]} - The text splits from the document.
 */
export function getTextSplitsFromDocument(
  document: Document,
  textSplitter: SentenceSplitter
) {
  const text = document.getText();
  const splits = textSplitter.splitText(text);

  return splits;
}

/**
 * Generates text nodes from a document.
 * 
 * @param {Document} document - The document to generate nodes from.
 * @param {SentenceSplitter} textSplitter - The splitter to use for splitting the document.
 * @param {boolean} includeMetadata - Whether to include metadata in the nodes.
 * @param {boolean} includePrevNextRel - Whether to include previous and next relationships in the nodes.
 * @returns {TextNode[]} - The text nodes generated from the document.
 * 
 * @example
 * const document = new Document("Hello, world!");
 * const textSplitter = new SentenceSplitter();
 * const nodes = getNodesFromDocument(document, textSplitter);
 */
export function getNodesFromDocument(
  document: Document,
  textSplitter: SentenceSplitter,
  includeMetadata: boolean = true,
  includePrevNextRel: boolean = true
) {
  let nodes: TextNode[] = [];

  const textSplits = getTextSplitsFromDocument(document, textSplitter);

  textSplits.forEach((textSplit) => {
    const node = new TextNode({
      text: textSplit,
      metadata: includeMetadata ? document.metadata : {},
    });
    node.relationships[NodeRelationship.SOURCE] = document.asRelatedNodeInfo();
    nodes.push(node);
  });

  if (includePrevNextRel) {
    nodes.forEach((node, index) => {
      if (index > 0) {
        node.relationships[NodeRelationship.PREVIOUS] =
          nodes[index - 1].asRelatedNodeInfo();
      }
      if (index < nodes.length - 1) {
        node.relationships[NodeRelationship.NEXT] =
          nodes[index + 1].asRelatedNodeInfo();
      }
    });
  }

  return nodes;
}
/**
 * A node parser generates TextNodes from Documents
 */
/**
 * Interface for classes that can generate text nodes from documents.
 * 
 * @method getNodesFromDocuments - Generates text nodes from an array of documents.
 */
export interface NodeParser {
  getNodesFromDocuments(documents: Document[]): TextNode[];
}

/**
 * SimpleNodeParser is the default NodeParser. It splits documents into TextNodes using a splitter, by default SentenceSplitter
 */
/**
 * Class that implements the NodeParser interface using a simple strategy.
 * 
 * @property {SentenceSplitter} textSplitter - The splitter to use for splitting documents.
 * @property {boolean} includeMetadata - Whether to include metadata in the nodes.
 * @property {boolean} includePrevNextRel - Whether to include previous and next relationships in the nodes.
 * 
 * @method getNodesFromDocuments - Generates text nodes from an array of documents.
 * 
 * @example
 * const documents = [new Document("Hello, world!"), new Document("Goodbye, world!")];
 * const parser = new SimpleNodeParser();
 * const nodes = parser.getNodesFromDocuments(documents);
 */
export class SimpleNodeParser implements NodeParser {
  textSplitter: SentenceSplitter;
  includeMetadata: boolean;
  includePrevNextRel: boolean;

  constructor(init?: {
    textSplitter?: SentenceSplitter;
    includeMetadata?: boolean;
    includePrevNextRel?: boolean;

    chunkSize?: number;
    chunkOverlap?: number;
  }) {
    this.textSplitter =
      init?.textSplitter ??
      new SentenceSplitter(
        init?.chunkSize ?? DEFAULT_CHUNK_SIZE,
        init?.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP
      );
    this.includeMetadata = init?.includeMetadata ?? true;
    this.includePrevNextRel = init?.includePrevNextRel ?? true;
  }

  static fromDefaults(init?: {
    chunkSize?: number;
    chunkOverlap?: number;
    includeMetadata?: boolean;
    includePrevNextRel?: boolean;
  }): SimpleNodeParser {
    return new SimpleNodeParser(init);
  }

  /**
   * Generate Node objects from documents
   * @param documents
   */
  getNodesFromDocuments(documents: Document[]) {
    return documents
      .map((document) => getNodesFromDocument(document, this.textSplitter))
      .flat();
  }
}
