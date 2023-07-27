import { VectorStore, NodeWithEmbedding, VectorStoreQuery, VectorStoreQueryResult } from './types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class SupabaseVectorStore implements VectorStore {
  storesText: boolean = true;
  isEmbeddingQuery?: boolean;
  private supabaseClient: SupabaseClient;

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  client(): SupabaseClient {
    return this.supabaseClient;
  }

  add(embeddingResults: NodeWithEmbedding[]): string[] {
    // Use the insert method of the Supabase client to add the embedding results to the database
    this.supabaseClient.from('embeddings').insert(embeddingResults);
    return [];
  }

  delete(refDocId: string, deleteKwargs?: any): void {
    // Use the delete method of the Supabase client to delete the specified document from the database
    this.supabaseClient.from('embeddings').delete().match({ refDocId });
  }

  query(query: VectorStoreQuery, kwargs?: any): VectorStoreQueryResult {
    // Use the select method of the Supabase client to perform a query on the database and return the result
    const result = this.supabaseClient.from('embeddings').select().eq('query', query);
    return result;
  }

  persist(persistPath: string, fs?: GenericFileSystem): void {
    // Use the upsert method of the Supabase client to persist the current state of the SupabaseVectorStore to the database
    this.supabaseClient.from('embeddings').upsert(this.data);
  }
}