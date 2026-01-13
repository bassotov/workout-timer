import type { Exercise } from '@/types';

interface ParsedWeight {
  quantity: number;
  weight: string;
  original: string;
}

export interface EquipmentItem {
  weight?: string;
  quantity?: number;
  equipment?: string;
}

/**
 * Parses a weight string like "12kg", "2x12kg", "2×14kg" into quantity and weight.
 * Returns null if the string doesn't match expected patterns.
 */
function parseWeight(weightStr: string): ParsedWeight | null {
  if (!weightStr || weightStr === '—') return null;

  const trimmed = weightStr.trim();

  // Match patterns like "2x12kg", "2×14kg", "2X10kg"
  const pairMatch = trimmed.match(/^(\d+)\s*[x×X]\s*(.+)$/);
  if (pairMatch) {
    return {
      quantity: parseInt(pairMatch[1], 10),
      weight: pairMatch[2],
      original: trimmed,
    };
  }

  // Single weight like "12kg", "14kg"
  return {
    quantity: 1,
    weight: trimmed,
    original: trimmed,
  };
}

/**
 * Splits equipment strings like "dumbbell + bench" into separate items.
 * Handles: "+", ",", "&", "and" as separators.
 */
function parseEquipmentString(equipment: string): string[] {
  if (!equipment) return [];
  return equipment
    .split(/\s*[\+,&]\s*|\s+and\s+/i)
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Normalizes equipment name to singular form for grouping.
 * "dumbbells" → "dumbbell", "bands" → "band"
 */
function normalizeEquipmentName(name: string): string {
  // Common plural → singular mappings
  const normalized = name.toLowerCase().trim();
  if (normalized.endsWith('s') && !normalized.endsWith('ss')) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

/**
 * Checks if an equipment name is typically weighted (used with dumbbells, kettlebells, etc.)
 */
function isWeightedEquipment(name: string): boolean {
  const weighted = ['dumbbell', 'kettlebell', 'barbell', 'weight', 'plate', 'db', 'kb'];
  const normalized = normalizeEquipmentName(name);
  return weighted.some(w => normalized.includes(w));
}

/**
 * Smart equipment extraction that:
 * 1. Deduplicates weights (2x12kg covers 12kg)
 * 2. Combines weight with equipment name if provided
 * 3. Separates standalone equipment (bench, mat) from weighted items
 *
 * Returns array of equipment items to display as badges.
 */
export function extractSmartEquipment(exercises: Exercise[]): EquipmentItem[] {
  // Track weighted equipment: weight → { quantity, equipmentName }
  const weightedMap = new Map<string, { quantity: number; equipment?: string }>();
  // Track standalone equipment (no weight): Set of names
  const standaloneSet = new Set<string>();

  for (const ex of exercises) {
    const parsedWeight = parseWeight(ex.weight ?? '');
    const equipmentParts = parseEquipmentString(ex.equipment ?? '');

    if (parsedWeight) {
      // Exercise has weight - find the weighted equipment from parts
      const current = weightedMap.get(parsedWeight.weight) || { quantity: 0 };

      // Update quantity to max needed
      if (parsedWeight.quantity > current.quantity) {
        current.quantity = parsedWeight.quantity;
      }

      // Find weighted equipment name from parts (dumbbell, kettlebell, etc.)
      for (const part of equipmentParts) {
        if (isWeightedEquipment(part)) {
          current.equipment = normalizeEquipmentName(part);
        } else {
          // Non-weighted equipment like "bench" goes to standalone
          standaloneSet.add(normalizeEquipmentName(part));
        }
      }

      weightedMap.set(parsedWeight.weight, current);
    } else if (equipmentParts.length > 0) {
      // No weight - all equipment is standalone
      for (const part of equipmentParts) {
        standaloneSet.add(normalizeEquipmentName(part));
      }
    }
  }

  // Build result array
  const result: EquipmentItem[] = [];

  // Add weighted equipment (sorted by weight)
  const weightedItems = Array.from(weightedMap.entries())
    .map(([weight, { quantity, equipment }]) => ({ weight, quantity, equipment }))
    .sort((a, b) => {
      const aNum = parseFloat(a.weight);
      const bNum = parseFloat(b.weight);
      if (!isNaN(aNum) && !isNaN(bNum)) return aNum - bNum;
      return a.weight.localeCompare(b.weight);
    });

  result.push(...weightedItems);

  // Add standalone equipment (sorted alphabetically)
  const standaloneItems = Array.from(standaloneSet)
    .sort()
    .map(equipment => ({ equipment }));

  result.push(...standaloneItems);

  return result;
}

/**
 * @deprecated Use extractSmartEquipment instead for better deduplication.
 * Extracts unique weights from exercises for equipment display.
 */
export function extractUniqueWeights(exercises: Exercise[]): string[] {
  const weights = exercises
    .map(ex => ex.weight)
    .filter((w): w is string => Boolean(w) && w !== '—');
  return [...new Set(weights)];
}
