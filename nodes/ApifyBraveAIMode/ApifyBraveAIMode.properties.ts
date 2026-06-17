import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		query: context.getNodeParameter('query', itemIndex),
		country: context.getNodeParameter('country', itemIndex),
		language: context.getNodeParameter('language', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'AI Answer',
				value: 'aiAnswer',
			},
		],
		default: 'aiAnswer',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiAnswer'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get the AI answer for a query',
				description: 'Get the Brave Search AI answer and references for a query',
			},
		],
		default: 'get',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. how does TLS work',
		description: 'The query to fetch the Brave AI answer for',
		displayOptions: { show: { resource: ['aiAnswer'], operation: ['get'] } },
	},
	{
		displayName: 'Country Code',
		name: 'country',
		type: 'string',
		default: 'us',
		placeholder: 'e.g. us',
		description: 'Two-letter country code the search runs from',
		displayOptions: { show: { resource: ['aiAnswer'], operation: ['get'] } },
	},
	{
		displayName: 'Language Code',
		name: 'language',
		type: 'string',
		default: 'en',
		placeholder: 'e.g. en',
		description: 'Two-letter language code for the results',
		displayOptions: { show: { resource: ['aiAnswer'], operation: ['get'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['aiAnswer'], operation: ['get'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact object with the answer text and references',
			},
		],
		default: 'simplified',
		description: 'How much data to return',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['aiAnswer'], operation: ['get'], output: ['selected'] },
		},
		options: [
			{ name: 'AI Mode Present', value: 'ai_mode_present' },
			{ name: 'Country', value: 'country' },
			{ name: 'Fetched At', value: 'fetched_at' },
			{ name: 'Language', value: 'language' },
			{ name: 'Markdown', value: 'markdown' },
			{ name: 'Query', value: 'query' },
			{ name: 'References', value: 'references' },
			{ name: 'Related Questions', value: 'related_questions' },
			{ name: 'Result Type', value: 'result_type' },
			{ name: 'Text Blocks', value: 'text_blocks' },
			{ name: 'Web Results', value: 'web_results' },
		],
		default: ['query', 'ai_mode_present', 'markdown', 'references'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
