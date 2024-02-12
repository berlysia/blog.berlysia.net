import { isAbsolute, resolve } from "node:path";
import z from "zod";
import type { Plugin } from "unified";
import type { Node as UnistNode, Parent as UnistParent } from "unist";
import type { Image as MdastImage } from "mdast";
import type { Element as HastElement, Text as HastText } from "hast";
import type { MdxJsxFlowElement, MdxJsxAttribute } from "mdast-util-mdx-jsx";

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
  // eslint-disable-next-line unicorn/consistent-function-scoping -- for readability
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

export const removeFrontmatter: Plugin = () => {
  return function removeFrontmatterImpl(tree: UnistParent) {
    if (tree.children[0].type === "yaml") {
      tree.children.shift();
    }
  };
};

export type RewriteImageOptions = { slug: string };
const STATIC_ARTICLES_ROOT = "/static/articles";

export const rewriteImagePaths: Plugin<[RewriteImageOptions], UnistParent> = (
  options: RewriteImageOptions
) => {
  const { slug } = options;
  return function rewriteImagePathsImpl(tree: UnistParent) {
    return walk(tree);

    function walk(tree: UnistNode | UnistParent) {
      if (!("children" in tree)) return;
      for (const node of tree.children) {
        if (node.type === "image") {
          assertImage(node);
          const newUrl = resolve(STATIC_ARTICLES_ROOT, slug, node.url);
          console.log("Rewriting image path", node.url, newUrl);
          node.url = newUrl;
        } else if (node.type === "mdxJsxFlowElement") {
          assertMdxJsxFlowElement(node);
          for (const attr of node.attributes) {
            if (
              isMdxJsxAttribute(attr) &&
              attr.name === "src" &&
              typeof attr.value === "string"
            ) {
              const newUrl = resolve(STATIC_ARTICLES_ROOT, slug, attr.value);
              console.log("Rewriting image path", attr.value, newUrl);
              attr.value = newUrl;
            }
          }
        }

        walk(node);
      }
    }
  };
};

const tagsTransformer = (x: string): string[] =>
  x?.split(",").map((y) => y.trim()) ?? [];

const CategorySchema = z
  .union([z.literal("tech"), z.literal("imas")])
  .optional();

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
      category: CategorySchema,
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
      category: CategorySchema,
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
      category: CategorySchema,
    })
    .passthrough(),
]);

export type Frontmatter = z.infer<typeof frontmatterSchema>;
