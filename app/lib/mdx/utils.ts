import { isAbsolute, resolve } from "node:path";
import z from "zod";
import type { Plugin } from "unified";
import type { Node as UnistNode, Parent as UnistParent } from "unist";
import type { Image as MdastImage } from "mdast";
import type { Element as HastElement, Text as HastText } from "hast";
import type {
  MdxJsxFlowElementHast,
  MdxJsxAttribute,
  MdxJsxTextElementHast,
} from "mdast-util-mdx-jsx";

function assertImage(node: UnistNode): asserts node is MdastImage {
  if (node.type !== "image") {
    throw new Error("Expected image node");
  }
}
function assertMdxJsxFlowElement(
  node: UnistNode
): asserts node is MdxJsxFlowElementHast {
  if (node.type !== "mdxJsxFlowElement") {
    throw new Error("Expected mdxJsxFlowElement node");
  }
}
function isMdxJsxTextElement(node: UnistNode): node is MdxJsxTextElementHast {
  return node.type === "mdxJsxTextElement";
}
function isMdxJsxAttribute(node: UnistNode): node is MdxJsxAttribute {
  return node.type === "mdxJsxAttribute";
}

function isHastElement(node: UnistNode): node is HastElement {
  return node.type === "element";
}
function asHastElement<const T extends HastElement>(node: T): T {
  if (!isHastElement(node)) {
    throw new Error("Expected Hast Element");
  }
  return node;
}
function isHastText(node: UnistNode): node is HastText {
  return node.type === "text";
}
function asHastText<const T extends HastText>(node: T): T {
  if (!isHastText(node)) {
    throw new Error("Expected Hast Text");
  }
  return node;
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

function nodeHasClass(node: UnistNode, className: string): boolean {
  return (
    (isHastElement(node) &&
      [node.properties?.className].flat().includes(className)) ||
    (isMdxJsxTextElement(node) &&
      node.attributes
        .filter(
          (x) => isMdxJsxAttribute(x) && ["class", "className"].includes(x.name)
        )
        .some((x) => x.value === className))
  );
}

// textContent内の3桁以下の数字の並びを span.tcu-digits で囲む
export const wrapThreeDigits: Plugin = () => {
  // eslint-disable-next-line unicorn/consistent-function-scoping -- for readability
  function walk(curr: UnistNode | UnistParent) {
    if (
      nodeHasClass(curr, "no-tcu-digits") ||
      (isHastElement(curr) && ["pre", "code"].includes(curr.tagName))
    ) {
      return;
    }
    if ("children" in curr) {
      // hasttextの中に3桁以下の数字があったらspanで囲む、前後はhasttextにして、spanで囲むところはHast Elementにする
      // ex. "abc123abc" -> "abc", <span class="tcu-digits">123</span>, "abc"
      const newChildren = [];
      let changed = false;
      for (const x of curr.children) {
        if (isHastText(x)) {
          const text = x.value;
          const parts = text.split(/((?<![\d,.])\b\d{1,3}\b(?![\d,.]))/);
          for (const part of parts) {
            if (/^\d{1,3}$/.test(part)) {
              newChildren.push(
                asHastElement({
                  type: "element",
                  tagName: "span",
                  properties: { class: "tcu-digits" },
                  children: [{ type: "text", value: part }],
                })
              );
            } else if (part.length > 0) {
              newChildren.push(asHastText({ type: "text", value: part }));
            }
          }
          if (parts.length > 1) {
            changed = true;
          }
        } else {
          newChildren.push(x);
          walk(x);
        }
      }
      if (changed) {
        curr.children = newChildren;
      }
    }
  }
  return function wrapThreeDigitsImpl(tree: UnistParent) {
    walk(tree);
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
        } else if (
          node.type === "mdxJsxFlowElement" &&
          "name" in node &&
          ["img", "Image"].includes(node.name as string)
        ) {
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

const DATETIME_REGEX = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;

export const frontmatterSchema = z.discriminatedUnion("publishStatus", [
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      created: z.string().regex(DATETIME_REGEX),
      lastModified: z.string().regex(DATETIME_REGEX).optional(),
      publishedAt: z.string().regex(DATETIME_REGEX).optional(),
      tags: z.string().transform(tagsTransformer),
      publishStatus: z.literal("draft"),
      preferVertical: z.boolean().default(false),
      category: CategorySchema,
      canonical: z.string().optional(),
    })
    .passthrough(),
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      created: z.string().regex(DATETIME_REGEX),
      lastModified: z.string().regex(DATETIME_REGEX).optional(),
      publishedAt: z.string().regex(DATETIME_REGEX),
      tags: z.string().transform(tagsTransformer),
      publishStatus: z.literal("published"),
      preferVertical: z.boolean().default(false),
      category: CategorySchema,
      canonical: z.string().optional(),
    })
    .passthrough(),
  z
    .object({
      title: z.string(),
      description: z.string().optional(),
      created: z.string().regex(DATETIME_REGEX),
      lastModified: z.string().regex(DATETIME_REGEX).optional(),
      publishedAt: z.string().regex(DATETIME_REGEX),
      tags: z.string().transform(tagsTransformer),
      publishStatus: z.literal("unlisted"),
      preferVertical: z.boolean().default(false),
      category: CategorySchema,
      canonical: z.string().optional(),
    })
    .passthrough(),
]);

export type Frontmatter = z.infer<typeof frontmatterSchema>;
