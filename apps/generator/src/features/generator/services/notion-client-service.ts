import { Client, isFullBlock } from '@notionhq/client';
import { NOTION_API_URL, NOTION_API_VERSION } from '../../../common/config';
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export class NotionClientService {
    private static readonly notionClient = new Client({
        baseUrl: NOTION_API_URL,
        notionVersion: NOTION_API_VERSION,
    });

    static async readPageBlocks(pageId: string, authToken: string): Promise<BlockObjectResponse[]> {
        try {
            const pageBlocks = await this.readNestedBlocks(pageId, authToken);
            return pageBlocks;
        } catch (error) {
            throw new Error(`Failed to retrieve data from Notion: ${error}`)
        }
    }

    private static async readNestedBlocks(blockId: string, authToken: string): Promise<BlockObjectResponse[]> {
        const resultBlocks: BlockObjectResponse[] = [];
        const blocks = await this.notionClient.blocks.children.list({
            block_id: blockId,
            auth: authToken,
        });
        for (let block of blocks.results) {
            if (!isFullBlock(block)) {
                continue;
            }
            if (block.has_children) {
                const nestedBlocks = await this.readNestedBlocks(block.id, authToken);
                resultBlocks.push(block, ...nestedBlocks);
                continue;
            }
            resultBlocks.push(block);
        }
        return resultBlocks;
    }
}
