import { GitHubIssue } from 'github';
import HttpClient from 'lib/HttpClient';

class GitHubIssueRepository extends HttpClient {
  private path;

  private issueListPageNumber = 1;

  constructor({ owner, repo }: { owner: string; repo: string }) {
    super({ isGitHub: true });
    this.path = `/repos/${owner}/${repo}/issues`;
  }

  async getIssueListPage() {
    const data = await super.get<GitHubIssue[]>(this.path, {
      params: { sort: 'comments', page: this.issueListPageNumber },
    });

    this.issueListPageNumber += 1;

    return data;
  }
}

export default GitHubIssueRepository;
