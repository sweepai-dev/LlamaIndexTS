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
    // Implement the add method using the Supabase client
  }

  delete(refDocId: string, deleteKwargs?: any): void {
    // Implement the delete method using the Supabase client
  }

  query(query: VectorStoreQuery, kwargs?: any): VectorStoreQueryResult {
    // Implement the query method using the Supabase client
  }

  persist(persistPath: string, fs?: GenericFileSystem): void {
    // Implement the persist method using the Supabase client
  }
}