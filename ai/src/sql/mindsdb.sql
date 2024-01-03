/* Testing weaviate db to store embeddings*/
CREATE DATABASE weaviate_datasource
    WITH ENGINE = "weaviate",
    PARAMETERS = {
    "weaviate_url" : "https://lawgpt-mindsdb-h9lmpvso.weaviate.network",
    "weaviate_api_key": "YfPjpknLy1IvarljFtxu1FNvVjEoNCqnryiq"
};


CREATE TABLE weaviate_datascource.test
    (SELECT * FROM sqlitedb.test);

