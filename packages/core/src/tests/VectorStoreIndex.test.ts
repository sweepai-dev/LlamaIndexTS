import { VectorStoreIndex } from '../indices/vectorStore/VectorStoreIndex';
import { Node } from '../Node';
import { expect } from 'chai';

describe('VectorStoreIndex', () => {
  it('should correctly store and retrieve nodes', async () => {
    const vectorStoreIndex = await VectorStoreIndex.init(/* pass necessary arguments here */);

    const node1 = new Node(/* pass necessary arguments here */);
    const node2 = new Node(/* pass necessary arguments here */);

    await vectorStoreIndex.add(node1);
    await vectorStoreIndex.add(node2);

    const retrievedNode1 = await vectorStoreIndex.retrieve(node1.id_);
    const retrievedNode2 = await vectorStoreIndex.retrieve(node2.id_);

    expect(retrievedNode1).to.deep.equal(node1);
    expect(retrievedNode2).to.deep.equal(node2);
  });
});