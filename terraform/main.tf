terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}
resource "vercel_project" "example_with_git" {
  name      = "vercel-terraform-test-project"
  git_repository = {
    type = "github"
    repo = "pomppa/vercel-terraform-training"
  }
}
