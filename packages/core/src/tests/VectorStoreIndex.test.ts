import { VectorStoreIndex } from '../indices/vectorStore/VectorStoreIndex';
import { BaseNode } from '../base/BaseNode';
import { ServiceContext } from '../service/ServiceContext';
import { VectorStore } from '../vectorStore/VectorStore';
import { BaseDocumentStore } from '../documentStore/BaseDocumentStore';
import { Document } from '../document/Document';

describe('VectorStoreIndex', () => {
  test('init', async () => {
    // Initialize VectorStoreIndex
    const vectorStoreIndex = await VectorStoreIndex.init({ vectorStore: new VectorStore() });
    expect(vectorStoreIndex).toBeInstanceOf(VectorStoreIndex);
  });

  test('getNodeEmbeddingResults', async () => {
    // Test getNodeEmbeddingResults method
    const nodes = [new BaseNode()];
    const serviceContext = new ServiceContext();
    const results = await VectorStoreIndex.getNodeEmbeddingResults(nodes, serviceContext);
    expect(results).toBeDefined();
  });

  test('buildIndexFromNodes', async () => {
    // Test buildIndexFromNodes method
    const nodes = [new BaseNode()];
    const serviceContext = new ServiceContext();
    const vectorStore = new VectorStore();
    const docStore = new BaseDocumentStore();
    const index = await VectorStoreIndex.buildIndexFromNodes(nodes, serviceContext, vectorStore, docStore);
    expect(index).toBeDefined();
  });

  test('fromDocuments', async () => {
    // Test fromDocuments method
    const documents = [new Document()];
    const vectorStoreIndex = await VectorStoreIndex.fromDocuments(documents);
    expect(vectorStoreIndex).toBeInstanceOf(VectorStoreIndex);
  });

  test('asRetriever', () => {
    // Test asRetriever method
    const vectorStoreIndex = new VectorStoreIndex({ vectorStore: new VectorStore() });
    const retriever = vectorStoreIndex.asRetriever();
    expect(retriever).toBeDefined();
  });
});