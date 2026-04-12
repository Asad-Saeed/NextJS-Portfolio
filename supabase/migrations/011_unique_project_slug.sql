CREATE UNIQUE INDEX IF NOT EXISTS idx_portfolio_projects_user_slug
  ON portfolio_projects (user_id, project_slug)
  WHERE project_slug != '';
