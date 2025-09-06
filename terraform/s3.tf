module "s3_files" {
  source = "./modules/s3"

  files_bucket_name    = var.bucket_name
  environment          = var.environment
  enable_versioning    = var.bucket_enable_versioning
  cors_allowed_origins = var.bucket_cors_allowed_origins
}
