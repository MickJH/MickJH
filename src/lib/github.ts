import "server-only";

import {
  parseCalendar,
  type Contributions,
  type GitHubCalendar,
} from "./contributions";

const QUERY = /* GraphQL */ `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GraphQLResponse = {
  data?: {
    user?: {
      contributionsCollection: { contributionCalendar: GitHubCalendar };
    } | null;
  };
  errors?: { message: string }[];
};

/**
 * Fetches the contribution calendar for the last year. Runs only at build time
 * (static export), so the token never reaches the browser.
 *
 * Returns `null` without a token or when the API fails: the section is then left
 * out instead of breaking the build or showing made-up data.
 */
export async function getContributions(
  login: string,
): Promise<Contributions | null> {
  const token = process.env.GH_CONTRIBUTIONS_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-build",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
    });

    if (!response.ok) {
      console.warn(`[github] contributions request failed: ${response.status}`);
      return null;
    }

    const json = (await response.json()) as GraphQLResponse;
    const calendar =
      json.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) {
      console.warn(
        "[github] no calendar in response",
        json.errors?.map((e) => e.message),
      );
      return null;
    }

    return parseCalendar(calendar, new Date().toISOString());
  } catch (error) {
    console.warn("[github] contributions request threw", error);
    return null;
  }
}
