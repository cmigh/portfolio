export interface Project {
  title: string;
  description: string;
  image: string;
  url?: string; // 公開サイトのリンク
  details?: string; // 実装の詳細や技術的ポイント
  codeSnippet?: string; // アピールしたいコード（JSX/TS/SCSSなど）
}
export const projects: Project[] = [
  {
    title: "WordPress SEO 最適化",
    description: "SEO強化のためのカスタム開発",
    image: "https://picsum.photos/400/250?1",
    url: "https://example.com/seo-site",
    details:
      "カスタム投稿タイプに対するメタタグ生成やJSON-LD構造化データの自動生成を実装。",
    codeSnippet: `function generateSeoMeta(post) {
  return {
    title: post.title + " | サイト名",
    description: post.excerpt,
  };
}`,
  },
  {
    title: "多言語サイト構築",
    description: "WPMLを使った多言語対応サイト",
    image: "https://picsum.photos/400/250?2",
    url: "https://example.com/multilang",
    details:
      "ページごとの翻訳管理、言語スイッチャーの自動生成、URLリダイレクト処理を実装。",
    codeSnippet: `add_filter('wpml_permalink', function($url) {
  return apply_filters('wpml_permalink', $url);
});`,
  },
  // 他のプロジェクトも追加可能
];
