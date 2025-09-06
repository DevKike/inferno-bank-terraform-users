resource "aws_s3_bucket" "files_bucket" {
  bucket = var.files_bucket_name

  tags = {
    Name        = var.files_bucket_name
    Environment = var.environment
    Purpose     = "User files storage"
    Project     = "inferno-bank"
  }
}

resource "aws_s3_bucket_versioning" "files_bucket_versioning" {
  count  = var.enable_versioning ? 1 : 0
  bucket = aws_s3_bucket.files_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "files_bucket_encryption" {
  bucket = aws_s3_bucket.files_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "files_bucket_pab" {
  bucket = aws_s3_bucket.files_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_cors_configuration" "files_bucket_cors" {
  bucket = aws_s3_bucket.files_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "GET", "DELETE"]
    allowed_origins = var.cors_allowed_origins
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
