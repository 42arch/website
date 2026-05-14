// @ts-nocheck
import * as __fd_glob_1 from "../content/writing/hello-world.mdx?collection=writing"
import * as __fd_glob_0 from "../content/notes/internal-docs.mdx?collection=notes"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const notes = await create.docs("notes", "content/notes", {}, {"internal-docs.mdx": __fd_glob_0, });

export const writing = await create.docs("writing", "content/writing", {}, {"hello-world.mdx": __fd_glob_1, });