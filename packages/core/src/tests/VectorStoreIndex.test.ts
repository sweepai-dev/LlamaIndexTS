import { VectorStoreIndex } from '../indices/vectorStore/VectorStoreIndex';
import { ServiceContext } from '../serviceContext/ServiceContext';
import { StorageContext } from '../storageContext/StorageContext';
import { VectorIndexRetriever } from '../indices/vectorStore/VectorIndexRetriever';
import { BaseNode } from '../baseNode/BaseNode';
import { VectorStore } from '../vectorStore/VectorStore';
import { BaseDocumentStore } from '../documentStore/BaseDocumentStore';
import { Document } from '../document/Document';

describe('VectorStoreIndex', () => {
  let serviceContext: ServiceContext;
  let storageContext: StorageContext;
  let vectorIndexRetriever: VectorIndexRetriever;
  let nodes: BaseNode[];
  let vectorStore: VectorStore;
  let docStore: BaseDocumentStore;
  let documents: Document[];

  beforeEach(() => {
    // Mock the ServiceContext, StorageContext, and VectorIndexRetriever
    serviceContext = jest.fn() as unknown as ServiceContext;
    storageContext = jest.fn() as unknown as StorageContext;
    vectorIndexRetriever = jest.fn() as unknown as VectorIndexRetriever;

    // Initialize nodes, vectorStore, docStore, and documents
    nodes = [];
    vectorStore = new VectorStore();
    docStore = new BaseDocumentStore();
    documents = [];
  });

  it('should initialize VectorStoreIndex', async () => {
    const vectorStoreIndex = await VectorStoreIndex.init({ vectorStore });
    expect(vectorStoreIndex).toBeInstanceOf(VectorStoreIndex);
  });

  it('should get node embedding results', async () => {
    const results = await VectorStoreIndex.getNodeEmbeddingResults(nodes, serviceContext);
    expect(results).toBeDefined();
  });

  it('should build index from nodes', async () => {
    const index = await VectorStoreIndex.buildIndexFromNodes(nodes, serviceContext, vectorStore, docStore);
    expect(index).toBeDefined();
  });

  it('should create VectorStoreIndex from documents', async () => {
    const vectorStoreIndex = await VectorStoreIndex.fromDocuments(documents, { storageContext, serviceContext });
    expect(vectorStoreIndex).toBeInstanceOf(VectorStoreIndex);
  });

  it('should return VectorIndexRetriever', () => {
    const vectorStoreIndex = new VectorStoreIndex({ vectorStore });
    const retriever = vectorStoreIndex.asRetriever();
    expect(retriever).toBeInstanceOf(VectorIndexRetriever);
  });

  it('should return BaseQueryEngine', () => {
    const vectorStoreIndex = new VectorStoreIndex({ vectorStore });
    const queryEngine = vectorStoreIndex.asQueryEngine();
    expect(queryEngine).toBeDefined();
  });
});