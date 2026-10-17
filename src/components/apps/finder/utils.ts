import type { FinderSortKey } from '@/components/apps/finder/store'
import type { VirtualFile } from '@/lib/virtual-file-types'

export function displayName(file: VirtualFile) {
  return file.title ?? file.name
}

export function compareFiles(left: VirtualFile, right: VirtualFile, sortKey: FinderSortKey, direction: 'asc' | 'desc') {
  if (left.kind === 'directory' && right.kind !== 'directory')
    return -1
  if (right.kind === 'directory' && left.kind !== 'directory')
    return 1

  const leftValue = sortKey === 'name'
    ? displayName(left)
    : sortKey === 'kind'
      ? left.kind
      : sortKey === 'modifiedAt'
        ? left.modifiedAt ?? ''
        : left.size ?? -1
  const rightValue = sortKey === 'name'
    ? displayName(right)
    : sortKey === 'kind'
      ? right.kind
      : sortKey === 'modifiedAt'
        ? right.modifiedAt ?? ''
        : right.size ?? -1

  const leftMissing = sortKey !== 'name' && sortKey !== 'kind' && (leftValue === '' || leftValue === -1)
  const rightMissing = sortKey !== 'name' && sortKey !== 'kind' && (rightValue === '' || rightValue === -1)
  if (leftMissing || rightMissing) {
    return leftMissing === rightMissing
      ? displayName(left).localeCompare(displayName(right), undefined, { numeric: true, sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1)
      : leftMissing ? 1 : -1
  }

  const result = typeof leftValue === 'number' && typeof rightValue === 'number'
    ? leftValue - rightValue
    : String(leftValue).localeCompare(String(rightValue), undefined, { numeric: true, sensitivity: 'base' })

  if (result !== 0)
    return direction === 'asc' ? result : -result

  return displayName(left).localeCompare(displayName(right), undefined, { numeric: true, sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1)
}
