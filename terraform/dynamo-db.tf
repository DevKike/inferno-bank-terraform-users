module "dynamodb" {
  source = "./modules/dynamo-db"

  table_name = "users"
}
