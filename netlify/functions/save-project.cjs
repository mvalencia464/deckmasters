const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { project, projects, action } = JSON.parse(event.body);
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.REPO_OWNER || 'mvalencia464';
  const REPO_NAME = process.env.REPO_NAME || 'deckmasters';
  const FILE_PATH = 'src/data/projects.json';

  if (!GITHUB_TOKEN) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing GITHUB_TOKEN environment variable' })
    };
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    console.log(`Attempting to fetch ${FILE_PATH} from ${REPO_OWNER}/${REPO_NAME}...`);
    
    // 1. Get current file content (we need the SHA to update it)
    const { data: fileData } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
    });

    console.log('File fetched successfully. SHA:', fileData.sha);

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
      if (!fileData.content) {
         throw new Error("File content is empty or too large to retrieve via API.");
      }
      const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
      const currentProjects = JSON.parse(content);
      updatedProjects = [project, ...currentProjects];
      commitMessage = `feat(portfolio): add new project "${project.title}" via Admin UI`;
    } else {
      throw new Error("Invalid request: Provide 'project' (to add) or 'projects' (to update).");
    }

    // 2. Update file in GitHub
    console.log('Attempting to write file to GitHub...');
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: FILE_PATH,
      message: commitMessage,
      content: Buffer.from(JSON.stringify(updatedProjects, null, 2)).toString('base64'),
      sha: fileData.sha,
      committer: {
        name: "Deck Masters Portfolio Bot",
        email: "bot@deckmasters.com"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Changes saved to GitHub! Build triggered.' })
    };

  } catch (error) {
    console.error('GitHub API Fatal Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || 'Unknown GitHub API Error',
        step: error.status === 404 ? 'Fetching File (File or Repo not found)' : 'Processing/Writing',
        repo: `${REPO_OWNER}/${REPO_NAME}`,
        details: error.response?.data || 'No response data'
      })
    };
  }
};
