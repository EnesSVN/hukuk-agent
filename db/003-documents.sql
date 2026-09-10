-- Chunk store for the KVKK corpus.
--
-- halfvec, not vector: nvidia/nemotron-3-embed-1b returns 2048 dimensions and
-- pgvector's HNSW index rejects `vector` columns above 2000 dims
-- ("column cannot have more than 2000 dimensions for hnsw index").
-- halfvec is 16-bit instead of 32-bit: half the storage, HNSW up to 4000 dims,
-- and the precision loss is negligible for cosine similarity.

create extension if not exists vector;

create table if not exists documents (
  id        serial primary key,
  content   text not null,
  embedding halfvec(2048),
  metadata  jsonb not null default '{}'::jsonb
);


create index if not exists documents_embedding_hnsw
  on documents using hnsw (embedding halfvec_cosine_ops);


create index if not exists documents_metadata_gin
  on documents using gin (metadata);
