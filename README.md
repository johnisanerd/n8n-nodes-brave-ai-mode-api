# n8n-nodes-brave-ai-mode-api

An [n8n](https://n8n.io/) community node that fetches the Brave Search AI answer for a query and returns the summary (as markdown), source references, and web results. It is backed by the [Brave AI Mode API](https://apify.com/johnvc/brave-ai-mode-api?fpr=9n7kx3) on [Apify](https://apify.com?fpr=9n7kx3) and bills per result, so there are no subscriptions and no minimums.

[Installation](#installation) · [Credentials](#credentials) · [Operations](#operations) · [Output](#output) · [Example workflows](#example-workflows) · [Pricing](#pricing) · [Resources](#resources)

## What it does

Give the node a query, and it returns whether an AI answer is present, the answer text as markdown, the source references, related questions, and supporting web results. It also works as an **AI Agent tool**, so an agent can read Brave's AI answer on demand. This is useful for **answer engine optimization (AEO)** and privacy-focused search monitoring.

- Fetch the Brave Search AI answer and references for any query
- Get the answer as ready-to-use markdown
- Localize with a country code and language code
- Choose how much data to return: Simplified, Raw, or Selected Fields

## Installation

Follow the n8n [community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/):

1. In n8n, open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-brave-ai-mode-api` as the npm package name.
4. Agree to the risks of using community nodes, then select **Install**.

After it installs, the **Brave AI Mode** node appears in the nodes panel.

> n8n Cloud only allows verified community nodes. Until this node is verified, install it on a self-hosted n8n instance.

## Credentials

You need a free [Apify account](https://apify.com?fpr=9n7kx3) and an API token.

1. Sign in to the [Apify Console](https://console.apify.com?fpr=9n7kx3).
2. Open **Settings > Integrations** and copy your **Personal API token**.
3. In n8n, create a new **Apify API** credential and paste the token.
4. Use the credential's **Test** button to confirm it works.

The node also supports **Apify OAuth2** if you prefer to connect that way.

## Operations

**AI Answer > Get** returns the Brave AI answer for a query.

| Parameter | Description |
| --- | --- |
| Search Query | The query to fetch the Brave AI answer for. Required. |
| Country Code | Two-letter country code the search runs from. Defaults to `us`. |
| Language Code | Two-letter language code for the results. Defaults to `en`. |
| Output | How much data to return: Simplified, Raw, or Selected Fields. |

## Output

One item is returned per query. The **Output** parameter lets you choose how much to return:

- **Simplified** (default): a compact object with `query`, `aiModePresent`, `overview` (the markdown answer), `references` (each with `title` and `link`), `relatedQuestions`, `country`, and `language`. This mode is also used automatically when the node runs as an AI Agent tool, to keep responses small.
- **Raw**: every field the API returns, using the original field names below.
- **Selected Fields**: pick exactly which fields to include.

### Fields (Raw and Selected Fields)

| Field | Type | Description |
| --- | --- | --- |
| `result_type` | string | Result type, for example `ai_mode` |
| `query` | string | The query that was run |
| `country` | string | Country code used |
| `language` | string | Language code used |
| `ai_mode_present` | boolean | Whether an AI answer was returned |
| `markdown` | string | The answer content as markdown |
| `text_blocks` | array | The answer content blocks |
| `references` | array | Source references with titles and links |
| `web_results` | array | Supporting web results |
| `related_questions` | array | Related questions Brave surfaced |
| `fetched_at` | string | When the answer was fetched (ISO 8601) |

## Example workflows

### 1. Monitor Brave AI answers for brand terms

1. **Schedule Trigger**: run weekly.
2. **Brave AI Mode**: Search Query a brand or topic term, Output `Simplified`.
3. **Google Sheets**: log `aiModePresent` and `overview` over time.

### 2. Track cited sources

1. **Manual Trigger**.
2. **Brave AI Mode**: your query.
3. **Split Out**: expand `references` and record which domains are cited.

### 3. Let an AI Agent read the AI answer

1. **AI Agent** node.
2. Attach **Brave AI Mode** as a tool.
3. Ask "What does Brave's AI say about passkeys?" The agent calls the node (in Simplified mode) and answers with the summary and sources.

## Pricing

This node calls the [Brave AI Mode API](https://apify.com/johnvc/brave-ai-mode-api?fpr=9n7kx3) on Apify, which is billed **pay-per-result**, with no subscription and no minimums. Apify also includes a free monthly usage tier that covers typical volumes. See the [Actor page](https://apify.com/johnvc/brave-ai-mode-api?fpr=9n7kx3) for current rates.

## Resources

- [Brave AI Mode API on Apify](https://apify.com/johnvc/brave-ai-mode-api?fpr=9n7kx3)
- [npm package](https://www.npmjs.com/package/n8n-nodes-brave-ai-mode-api)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Apify n8n integration guide](https://docs.apify.com/platform/integrations/n8n)

## License

[MIT](LICENSE.md)
