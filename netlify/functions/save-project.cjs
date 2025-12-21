const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { project, projects, action } = JSON.parse(event.body);
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.REPO_OWNER || 'mvalencia464'; // Default to your user
  const REPO_NAME = process.env.REPO_NAME || '001-epsak'; // Updated to your actual repo
  const FILE_PATH = 'src/data/projects.json';

  if (!GITHUB_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing GITHUB_TOKEN environment variable' })
    };
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    // 1. Get current file content (we need the SHA to update it)
    const { data: fileData } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });

    let updatedProjects;
    let commitMessage;

    // CASE 1: Overwrite (Delete or Reorder)
    if (projects && Array.isArray(projects)) {
      updatedProjects = projects;
      commitMessage = action === 'delete' 
        ? 'fix(portfolio): remove project via Admin UI'
        : 'chore(portfolio): update project list via Admin UI';
    } 
    // CASE 2: Add Single Project (Legacy/Default)
    else if (project) {
      const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
      const currentProjects = JSON.parse(content);
      updatedProjects = [project, ...currentProjects];
      commitMessage = `feat(portfolio): add new project "${project.title}" via Admin UI`;
    } else {
      throw new Error("Invalid request: Provide 'project' (to add) or 'projects' (to update).");
    }

    // 2. Update file in GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      message: commitMessage,
      content: Buffer.from(JSON.stringify(updatedProjects, null, 2)).toString('base64'),
      sha: fileData.sha,
      committer: {
        name: "EPSAK Portfolio Bot",
        email: "bot@epsak.com"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Changes saved to GitHub! Build triggered.' })
    };

  } catch (error) {
    console.error('GitHub API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
