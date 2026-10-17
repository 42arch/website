import { open } from 'node:fs/promises'

interface EmbeddedArtwork {
  contentType: string
  data: Buffer
}

const MAX_TAG_SIZE = 10 * 1024 * 1024

function readSynchsafe(bytes: Buffer, offset: number): number | null {
  const parts = bytes.subarray(offset, offset + 4)
  if (parts.length !== 4 || parts.some(byte => byte > 0x7F))
    return null

  return (parts[0] << 21) | (parts[1] << 14) | (parts[2] << 7) | parts[3]
}

function readPicture(frame: Buffer): (EmbeddedArtwork & { pictureType: number }) | null {
  if (frame.length < 5)
    return null

  const encoding = frame[0]
  const mimeEnd = frame.indexOf(0, 1)
  if (mimeEnd < 0 || mimeEnd + 2 >= frame.length)
    return null

  const mime = frame.toString('latin1', 1, mimeEnd).toLowerCase()
  const contentType = mime === 'image/jpg' ? 'image/jpeg' : mime
  if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(contentType))
    return null

  const pictureType = frame[mimeEnd + 1]
  const descriptionStart = mimeEnd + 2
  let imageStart = -1

  if (encoding === 0 || encoding === 3) {
    const descriptionEnd = frame.indexOf(0, descriptionStart)
    if (descriptionEnd >= 0)
      imageStart = descriptionEnd + 1
  }
  else if (encoding === 1 || encoding === 2) {
    for (let index = descriptionStart; index + 1 < frame.length; index += 2) {
      if (frame[index] === 0 && frame[index + 1] === 0) {
        imageStart = index + 2
        break
      }
    }
  }

  if (imageStart < 0 || imageStart >= frame.length)
    return null

  return { contentType, data: Buffer.from(frame.subarray(imageStart)), pictureType }
}

export async function readMusicArtwork(filePath: string): Promise<EmbeddedArtwork | null> {
  const file = await open(filePath, 'r')

  try {
    const header = Buffer.alloc(10)
    if ((await file.read(header, 0, header.length, 0)).bytesRead !== header.length)
      return null

    const version = header[3]
    if (header.toString('ascii', 0, 3) !== 'ID3' || (version !== 3 && version !== 4))
      return null

    // Extended headers and unsynchronised tags need separate decoding.
    if (header[5] & 0xC0)
      return null

    const tagSize = readSynchsafe(header, 6)
    if (tagSize === null || tagSize <= 0 || tagSize > MAX_TAG_SIZE)
      return null

    const tag = Buffer.alloc(tagSize)
    let read = 0
    while (read < tagSize) {
      const { bytesRead } = await file.read(tag, read, tagSize - read, 10 + read)
      if (bytesRead === 0)
        return null
      read += bytesRead
    }

    let firstPicture: EmbeddedArtwork | null = null
    let offset = 0
    while (offset + 10 <= tag.length) {
      const frameId = tag.toString('ascii', offset, offset + 4)
      if (!/^[A-Z0-9]{4}$/.test(frameId))
        break

      const frameSize = version === 4 ? readSynchsafe(tag, offset + 4) : tag.readUInt32BE(offset + 4)
      if (frameSize === null || frameSize <= 0 || offset + 10 + frameSize > tag.length)
        break

      if (frameId === 'APIC' && tag[offset + 9] === 0) {
        const picture = readPicture(tag.subarray(offset + 10, offset + 10 + frameSize))
        if (picture) {
          if (picture.pictureType === 3)
            return { contentType: picture.contentType, data: picture.data }
          firstPicture ??= { contentType: picture.contentType, data: picture.data }
        }
      }

      offset += 10 + frameSize
    }

    return firstPicture
  }
  finally {
    await file.close()
  }
}
