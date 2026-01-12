/**
 * File sharing/download utility with Web Share API support
 * Uses native share sheet on mobile, blob download on desktop
 */

interface ShareResult {
  method: 'share' | 'download';
  success: boolean;
}

/**
 * Check if Web Share API with files is supported
 */
async function canShareFile(content: string, filename: string): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;
  if (!navigator.share || !navigator.canShare) return false;

  try {
    const file = new File([content], filename, { type: 'text/plain' });
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

/**
 * Download or share a file using the best available method
 * - Mobile: Web Share API (native share sheet)
 * - Desktop: Blob URL download
 */
export async function downloadOrShareFile(
  content: string,
  filename: string
): Promise<ShareResult> {
  // Try Web Share API first
  if (await canShareFile(content, filename)) {
    try {
      const file = new File([content], filename, { type: 'text/plain' });
      await navigator.share({ files: [file] });
      return { method: 'share', success: true };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return { method: 'share', success: false }; // User cancelled
      }
      // Fall through to blob download on other errors
    }
  }

  // Fallback: blob download
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return { method: 'download', success: true };
}
