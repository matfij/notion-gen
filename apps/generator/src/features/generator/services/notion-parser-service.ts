import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { ContentBlock, ContentBlockType } from '../models/content-block';

export class NotionParserService {
    static async parseBlocks(notionBlocks: BlockObjectResponse[]): Promise<ContentBlock[]> {
        const parsedBlocks: ContentBlock[] = [];
        for (let notionBlock of notionBlocks) {
            try {
                const newBlock = await this.parseBlock(notionBlock);
                const parentBlock = this.findParent(this.getParentId(notionBlock), parsedBlocks);
                if (parentBlock) {
                    parentBlock.children.push(newBlock);
                } else {
                    parsedBlocks.push(newBlock);
                }
            } catch (err) {
                console.log(err);
            }
        }
        return parsedBlocks;
    }

    private static async parseBlock(block: BlockObjectResponse): Promise<ContentBlock> {
        const blockBlueprint: Omit<ContentBlock, 'type'> = {
            id: block.id,
            children: [],
        };
        switch (block.type) {
            case 'heading_1': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Heading,
                    textContent: this.getBlockText(block.heading_1.rich_text),
                };
            }
            case 'paragraph': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Paragraph,
                    textContent: this.getBlockText(block.paragraph.rich_text),
                };
            }
            case 'divider': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Divider,
                };
            }
            case 'callout': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Callout,
                    textContent: `${block.callout.icon} ${this.getBlockText(block.callout.rich_text)}`,
                };
            }
            case 'bulleted_list_item': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.ListItem,
                    textContent: this.getBlockText(block.bulleted_list_item.rich_text),
                    children: [],
                };
            }
            case 'to_do': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.TodoItem,
                    checked: block.to_do.checked,
                };
            }
            case 'image': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Image,
                    fileUrl: block.image.type === 'file' ? block.image.file.url : block.image.external.url,
                };
            }
            case 'file': {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Image,
                    fileUrl: block.file.type === 'file' ? block.file.file.url : block.file.external.url,
                };
            }
            default: {
                return {
                    ...blockBlueprint,
                    type: ContentBlockType.Unknown,
                    textContent: block.type,
                };
            }
        }
    }

    private static getParentId(block: BlockObjectResponse): string {
        switch (block.parent.type) {
            case 'block_id':
                return block.parent.block_id;
            case 'page_id':
                return block.parent.page_id;
            case 'database_id':
                return block.parent.database_id;
            case 'workspace':
                return '';
        }
    }

    private static findParent(parentId: string, blocks: ContentBlock[]): ContentBlock | undefined {
        for (const block of blocks) {
            if (parentId === block.id) {
                return block;
            }
            const parent = this.findParent(parentId, block.children);
            if (parent) {
                return parent;
            }
        }
        return undefined;
    }

    private static getBlockText(richText: RichTextItemResponse[]): string {
        return richText.reduce((prev, curr) => prev + curr.plain_text, '');
    }
}
