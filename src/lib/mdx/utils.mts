import { isAbsolute, resolve } from "node:path";
import z from "zod";
import { Plugin } from "unified";
import { Node as UnistNode, Parent as UnistParent } from "unist";
import { Image as MdastImage } from "mdast";
import { Element as HastElement, Text as HastText } from "hast";
import { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx-jsx";

function assertImage(node: UnistNode): asserts node is MdastImage {
  if (node.type !== "image") {
    throw new Error("Expected image node");
  }
}
function assertMdxJsxFlowElement(
  node: UnistNode
): asserts node is MdxJsxFlowElement {
  if (node.type !== "mdxJsxFlowElement") {
    throw new Error("Expected mdxJsxFlowElement node");
  }
}
function isMdxJsxAttribute(node: UnistNode): node is MdxJsxAttribute {
  return node.type === "mdxJsxAttribute";
}
export const remarkResolveAssets: Plugin = (slug: string) => {
  return function remarkResolveAssetsImpl(tree) {
    // src/pages/blog/entry/foo.mdx => /blog/entry/foo
    const baseDir = resolve("/blog/entry/", slug);

    function walk(curr: UnistNode | UnistParent) {
      if ("children" in curr) {
        for (const x of curr.children) {
          switch (x.type) {
            case "image": {
              assertImage(x);
              // `![](./image.png)` => `![](/blog/entry/foo/image.png)` in src/pages/blog/entry/foo.mdx
              if (isAbsolute(x.url)) continue;
              const resolved = resolve(baseDir, x.url);
              x.url = resolved;
              break;
            }
            case "mdxJsxFlowElement": {
              assertMdxJsxFlowElement(x);
              // `<Some src="./image.png" />` => `<Some src="/blog/entry/foo/image.png" />` in src/pages/blog/entry/foo.mdx
              const srcAttr = x.attributes
                ?.filter(isMdxJsxAttribute)
                .find((at) => at.name === "src");
              if (
                !srcAttr?.value ||
                typeof srcAttr.value !== "string" ||
                isAbsolute(srcAttr.value)
              )
                continue;
              const resolved = resolve(baseDir, srcAttr.value);
              srcAttr.value = resolved;
              break;
            }
          }
          walk(x);
        }
      }
    }
    walk(tree);
  };
};
function isHastElement(node: UnistNode): node is HastElement {
  return node.type === "element";
}
function isHastText(node: UnistNode): node is HastText {
  return node.type === "text";
}
export const renameFootnoteSectionName: Plugin = () => {
  // tree.childrenを再帰的に走査して、 footnote-labelというidを持つ要素を探す
  function walk(curr: UnistNode | UnistParent) {
    if ("children" in curr) {
      for (const x of curr.children) {
        if (isHastElement(x) && x.properties?.id === "footnote-label") {
          walkInner(x);
        }
        walk(x);
      }
    }
  }

  // 見つかった要素の更に子孫を再帰的に走査し、textノードの内容を「脚注」に変更する
  function walkInner(curr: UnistNode | UnistParent) {
    if ("children" in curr) {
      for (const x of curr.children) {
        if (isHastText(x)) {
          x.value = "脚注";
        }
        walkInner(x);
      }
    }
  }

  return function renameFootnoteSectionImpl(tree) {
    walk(tree);
  };
};

const tagsTransformer = (x: string): string[] =>
  x?.split(",").map((y) => y.trim()) ?? [];

export const frontmatterSchema = z.discriminatedUnion("publishStatus", [
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      created: z.string(),
      lastModified: z.string().optional(),
      publishedAt: z.string().optional(),
      tags: z.string().transform(tagsTransformer),
      publishStatus: z.literal("draft"),

      preferVertical: z.boolean().default(false),
    })
    .passthrough(),
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      created: z.string(),
      lastModified: z.string().optional(),
      publishedAt: z.string(),
      tags: z.string().transform(tagsTransformer),
      publishStatus: z.literal("published"),

      preferVertical: z.boolean().default(false),
    })
    .passthrough(),
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      created: z.string(),
      lastModified: z.string().optional(),
      publishedAt: z.string(),
      tags: z.string().transform(tagsTransformer),
      publishStatus: z.literal("unlisted"),
      preferVertical: z.boolean().default(false),
    })
    .passthrough(),
]);

export type Frontmatter = z.infer<typeof frontmatterSchema>;
