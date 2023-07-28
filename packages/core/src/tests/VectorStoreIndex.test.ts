import { VectorStoreIndex } from '../indices/vectorStore/VectorStoreIndex';
import { VectorStore } from '../indices/vectorStore/VectorStore';
import { BaseNode } from '../indices/BaseNode';
import { ServiceContext } from '../ServiceContext';
import { BaseDocumentStore } from '../indices/BaseDocumentStore';

describe('VectorStoreIndex', () => {
  let vectorStoreIndex: VectorStoreIndex;
  let vectorStore: VectorStore;
  let nodes: BaseNode[];
  let serviceContext: ServiceContext;
  let docStore: BaseDocumentStore;

  beforeEach(() => {
    vectorStore = new VectorStore();
    nodes = [new BaseNode(), new BaseNode()];
    serviceContext = new ServiceContext();
    docStore = new BaseDocumentStore();
    vectorStoreIndex = new VectorStoreIndex({ vectorStore });
  });

  it('should initialize correctly', async () => {
    const result = await VectorStoreIndex.init({ vectorStore });
    expect(result).toBeInstanceOf(VectorStoreIndex);
  });

  it('should retrieve node embedding results correctly', async () => {
    const result = await VectorStoreIndex.getNodeEmbeddingResults(nodes, serviceContext);
    expect(result).toBeInstanceOf(Array);
  });

  it('should build index from nodes correctly', async () => {
    const result = await VectorStoreIndex.buildIndexFromNodes(nodes, serviceContext, vectorStore, docStore);
    expect(result).toBeInstanceOf(Object);
  });

  it('should create from documents correctly', async () => {
    const documents = [{ id: '1', text: 'test' }, { id: '2', text: 'test' }];
    const result = await VectorStoreIndex.fromDocuments(documents);
    expect(result).toBeInstanceOf(VectorStoreIndex);
  });
});