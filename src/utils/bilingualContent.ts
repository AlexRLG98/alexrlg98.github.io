/**
 * Utility to handle bilingual markdown content
 *
 * Format in markdown:
 * <!-- LANG:FR -->
 * Contenu en français
 * <!-- LANG:EN -->
 * English content
 * <!-- /LANG -->
 *
 * Or for simple sections:
 * <!-- FR: Contenu français -->
 * <!-- EN: English content -->
 */

export type Language = 'fr' | 'en';

/**
 * Extracts content for a specific language from bilingual markdown
 */
export function getLocalizedContent(content: string, language: Language): string {
  // Check if content has bilingual markers
  const hasBilingualBlocks = content.includes('<!-- LANG:FR -->') || content.includes('<!-- LANG:EN -->');

  if (!hasBilingualBlocks) {
    // No bilingual markers, return content as-is
    return content;
  }

  // Parse bilingual blocks
  let result = content;

  // Handle block format: <!-- LANG:FR --> ... <!-- LANG:EN --> ... <!-- /LANG -->
  const blockRegex = /<!-- LANG:FR -->([\s\S]*?)<!-- LANG:EN -->([\s\S]*?)<!-- \/LANG -->/g;
  result = result.replace(blockRegex, (_, frContent, enContent) => {
    return language === 'fr' ? frContent.trim() : enContent.trim();
  });

  // Handle inline format: <!-- FR: ... --> <!-- EN: ... -->
  const inlineRegex = /<!-- FR: (.*?) -->[\s\n]*<!-- EN: (.*?) -->/g;
  result = result.replace(inlineRegex, (_, frContent, enContent) => {
    return language === 'fr' ? frContent : enContent;
  });

  // Handle section headers with language variants
  // Format: ## Section <!-- FR: Section FR --> <!-- EN: Section EN -->
  const headerRegex = /^(#{1,6})\s+.*?<!-- FR: (.*?) -->.*?<!-- EN: (.*?) -->/gm;
  result = result.replace(headerRegex, (_, hashes, frContent, enContent) => {
    return `${hashes} ${language === 'fr' ? frContent : enContent}`;
  });

  return result;
}

/**
 * Creates bilingual content from separate FR and EN versions
 */
export function createBilingualContent(frContent: string, enContent: string): string {
  return `<!-- LANG:FR -->\n${frContent}\n<!-- LANG:EN -->\n${enContent}\n<!-- /LANG -->`;
}

/**
 * Merges a French writeup with English translation
 * Handles section by section translation
 */
export function mergeBilingualSections(
  sections: Array<{ fr: string; en: string }>
): string {
  return sections
    .map(({ fr, en }) => {
      if (fr === en) return fr; // Same content, no need for markers
      return `<!-- LANG:FR -->\n${fr}\n<!-- LANG:EN -->\n${en}\n<!-- /LANG -->`;
    })
    .join('\n\n');
}
