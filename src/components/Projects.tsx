import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";

import kyushu from "../assets/images/kyushu.png";
import studykyoto from "../assets/images/studykyoto_shot.png";
import studykyoto_screencapture from "../assets/images/studykyoto_screencapture.png";
import yanagawa from "../assets/images/yanagawa.png";
import yanagawa_screencapture from "../assets/images/yanagawa_screencapture.png";
import kamakura from "../assets/images/kamakura.png";
import sample01 from "../assets/images/sample01.jpg";
import ibarakiguide from "../assets/images/ibarakiguide.png";
import ibarakiguide_screencapture from "../assets/images/ibarakiguide_screencapture.png";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  details: string;
  feature?: string[];
  codeSnippet?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "観光公式サイト",
    description:
      "これまでの集大成、Wordpressの機能を拡張し観光スポット記事の検索機能をアップデート",
    image: yanagawa,
    link: "https://www.yanagawa-net.com/spots/",
    details:
      "比較的新しい案件で、ワイヤーフレームの作成から最終納品まで新しく社内の基本となる進め方で進行できました。池田はこれまでphpで実装してきたさまざまな機能をテンプレート化する業務を担当し、実装もほぼ一人で行っています。単純な作業工数を削減することができ、最終的に30%の利益率を出すことができました。",
    feature: [yanagawa_screencapture],
    codeSnippet: ``,
  },
  {
    id: 2,
    title: "観光公式サイト",
    description:
      "wordpressに投稿した内容から見出しや関連投稿生成し、マイマップも表示させて観光客への情報収集を助ける",
    image: kamakura,
    link: "https://visit.trip-kamakura.com/itinerary/popular-recommended-route/",
    details:
      "wordpressで構築、多言語対応、googlemapとカスタムフィールドで入力した内容を合わせてより観光前、観光当日に分かりやすい記事に",
    feature: [],
    codeSnippet: `※こちらは掲載用に再構築したコードです
    <div class="p-schedule-wrapper u-container u-max-contents">

  <div class="p-schedule-lead is-fade js-fade-anime">
    <?php the_field('schedule_detail'); ?>
  </div>

  <div class="p-schedule-map is-fade js-fade-anime">
    <h2 class="p-schedule-map__title">
      <span class="c-icon-location"></span>
      <span class="p-schedule-map__title-text"><?php _e('Locations'); ?></span>
    </h2>

    <div class="p-schedule-map__menu">
      <div class="p-schedule-map__menu-box">
        <?php
        // 各日程のリピーターフィールドを配列で定義
        $plan_fields = [
          'schedule_plan_day01' => __('1 Day'),
          'schedule_plan_day02' => __('2 Days'),
          'schedule_plan_day03' => __('3 Days'),
        ];

        $global_counter = 1;
        $show_more_needed = false;
        ?>

        <?php foreach ($plan_fields as $field_key => $day_label): ?>
          <?php if (have_rows($field_key)): ?>
            <div class="p-schedule-map__menu-heading"><?php echo esc_html($day_label); ?></div>
            <ul class="p-schedule-map__menu-list" id="menu-<?php echo esc_attr($field_key); ?>">
              <?php
              $menu_counter = 1;
              while (have_rows($field_key)): the_row();
                $spot_name = get_sub_field('spot_name');
              ?>
                <li class="p-schedule-map__menu-item <?php echo $menu_counter > 5 ? 'is-hidden js-hidden-trigger' : ''; ?>">
                  <span class="p-schedule-map__menu-num"><?php echo $menu_counter; ?>.</span>
                  <a href="#section-<?php echo $global_counter; ?>" class="p-schedule-map__menu-link">
                    <?php echo esc_html($spot_name); ?>
                  </a>
                </li>
              <?php
                if ($menu_counter > 5) $show_more_needed = true;
                $menu_counter++;
                $global_counter++;
              endwhile;
              ?>
            </ul>
          <?php endif; ?>
        <?php endforeach; ?>

        <?php if ($show_more_needed): ?>
          <div class="p-schedule-map__menu-btn">
            <button class="c-btn-tertiary js-show-more" aria-expanded="false" aria-controls="menu-list">
              <span class="c-btn-tertiary__text js-show-more-text"><?php _e('Show more locations'); ?></span>
              <span class="c-btn-tertiary__icon c-btn-tertiary__icon--more js-show-more-icon" aria-hidden="true" role="img"></span>
            </button>
          </div>
        <?php endif; ?>
      </div>
    </div>

    <div class="p-schedule-map__body">
      <?php
      $map_embed = get_field('schedule_map');
      $privacy_status = get_privacy_status(); // Cookie同意状況を返す仮関数
      if ($map_embed):
        if ($privacy_status === 'disabled'): ?>
          <div class="c-map-notice" data-type="privacy">
            <img class="c-map-notice__img" src="<?php echo get_template_directory_uri(); ?>/assets/images/common/img_map_notice.png" alt="">
            <div class="c-map-notice__txt">
              <p><?php _e('Google Maps cannot be displayed due to your privacy settings.'); ?></p>
              <button class="c-map-notice__link js-open-settings">
                <?php _e('Change your privacy preferences'); ?>
              </button>
            </div>
          </div>
        <?php else: ?>
          <div class="p-schedule-map__bg">
            <?php echo $map_embed; ?>
          </div>
        <?php endif; ?>
      <?php endif; ?>
    </div>
  </div>

  <?php
  /**
   * 各日程を出力する共通関数
   */
  function render_schedule_day($plan_field, $day_label, $day_code, &$global_counter) {
    if (have_rows($plan_field)):
      echo '<div class="p-schedule__box">';
      echo '<h2 class="p-schedule__heading is-fade js-fade-anime">' . esc_html($day_label) . '</h2>';

      $item_counter = 1;
      $base_key = 'schedule';

      while (have_rows($plan_field)): the_row();
        $image = get_sub_field($base_key . '_image_' . $day_code);
        $spot_name = get_sub_field($base_key . '_spot_name_' . $day_code);
        $spot_detail = get_sub_field($base_key . '_detail_' . $day_code);
        $spot_url = get_sub_field($base_key . '_url_' . $day_code);
        $image_url = $image ? wp_get_attachment_image_src($image['id'], 'medium')[0] : '';

        echo '<div class="p-schedule__item" id="section-' . $global_counter . '">';
        if ($image_url) {
          echo '<figure class="p-schedule__thumb"><img src="' . esc_url($image_url) . '" alt=""></figure>';
        }

        if ($spot_name) {
          echo '<h3 class="p-schedule__title"><span class="p-schedule__num">' . $item_counter . '</span>' . esc_html($spot_name) . '</h3>';
        }

        if ($spot_detail) {
          echo '<p class="p-schedule__desc">' . $spot_detail . '</p>';
        }

        if ($spot_url) {
          echo '<a href="' . esc_url($spot_url) . '" class="c-btn-primary">';
          echo '<span class="c-btn-primary__text">' . esc_html($spot_name) . '</span>';
          echo '</a>';
        }

        // アクセス情報を出力
        for ($i = 1; $i <= 3; $i++) {
          $transport = get_sub_field($base_key . '_access_' . $day_code . '_' . sprintf('%02d', $i));
          $time = get_sub_field($base_key . '_access_time_' . $day_code . '_' . sprintf('%02d', $i));
          $note = get_sub_field($base_key . '_access_note_' . $day_code . '_' . sprintf('%02d', $i));

          if ($transport || $time || $note) {
            echo '<div class="p-schedule__access is-fade js-fade-anime">';
            if ($transport && is_array($transport)) {
              $lang = apply_filters('wpml_current_language', null);
              $phrases = [
                'en' => ['foot' => ['by foot', ' min'], 'car' => ['by car', ' min'], 'train' => ['by train', ' min'], 'bus' => ['by bus', ' min']],
              ];
              foreach ($transport as $method) {
                if (isset($phrases['en'][$method])) {
                  $p = $phrases['en'][$method];
                  echo '<span class="p-schedule__duration">' . esc_html($time) . $p[1] . ' ' . $p[0] . '</span>';
                }
              }
            }
            if ($note) {
              echo '<p class="p-schedule__access-note">' . esc_html($note) . '</p>';
            }
            echo '</div>';
          }
        }

        echo '</div>'; // item
        $item_counter++;
        $global_counter++;
      endwhile;

      echo '</div>'; // box
    endif;
  }
  ?>

  <div class="p-schedule">
    <?php
    $global_counter = 1;
    render_schedule_day('schedule_plan_day01', '1 Day', '01', $global_counter);
    render_schedule_day('schedule_plan_day02', '2 Days', '02', $global_counter);
    render_schedule_day('schedule_plan_day03', '3 Days', '03', $global_counter);
    ?>
  </div>

</div>

    `,
  },
  {
    id: 3,
    title: "観光機構サイト",
    description: "SEOのスコアアップに最も注力したサイト",
    image: kyushu,
    link: "https://kyushu-traveltips.com/",
    details:
      "クライアントの要望でSEOスコアアップに注力し、高評価のサイトに。パフォーマンスやアクセシビリティは97-99点、SEOは100点を保っています。社内でwebアクセシビリティの実装に強いメンバーと連携しながらコーディングしました。",
    feature: [],
    codeSnippet: ``,
  },
  {
    id: 4,
    title: "構造化データ実装テンプレート",
    description: "PHP + JSON で実装したテンプレートの一部",
    image: sample01,
    link: "",
    details:
      "特にSEOや検索のしやすさを重要視するクライアントのために、あらかじめ構造化データを準備しておくようにすることで、社内の誰でも対応できるようにしました",
    feature: [],
    codeSnippet: `<?php
function output_structured_data_dynamic() {
    $home_url  = home_url('/');
    $site_name = get_bloginfo('name');
    $content   = "https://schema.org";

    $data = [];

    // =========================
    // フロントページ
    // =========================
    if ( is_front_page() ) {
        $post_id = get_the_ID();
        $description = get_post_meta($post_id, 'description', true) ?: get_the_excerpt($post_id);

        $data = [
            "@context" => $content,
            "@graph" => [
                [
                    "@type" => "WebSite",
                    "@id"   => "{$home_url}#website",
                    "name"  => $site_name,
                    "url"   => $home_url,
                    "description" => $description,
                ],
                [
                    "@type" => ["LocalBusiness", "Organization"],
                    "@id"   => "{$home_url}#organization",
                    "name"  => $site_name,
                    "url"   => $home_url,
                    "description" => $description,
                    "address" => [
                        "@type" => "PostalAddress",
                        "streetAddress" => "123 Example Street",
                        "addressLocality" => "Example City",
                        "addressRegion" => "Example Prefecture",
                        "postalCode" => "123-4567",
                        "addressCountry" => "JP"
                    ],
                    "telephone" => "+810000000000"
                ]
            ]
        ];
    }

    // =========================
    // 固定ページ
    // =========================
    elseif ( is_page() ) {
        $page_id = get_the_ID();
        $page_url = get_permalink($page_id);
        $page_title = get_the_title($page_id);
        $page_description = get_post_meta($page_id, 'description', true) ?: get_the_excerpt($page_id);

        // 汎用的なWebPageデータ
        $data = [
            "@context" => $content,
            "@type" => "WebPage",
            "name" => $page_title,
            "url" => $page_url,
            "description" => $page_description,
            "isPartOf" => ["@id" => "{$home_url}#website"],
            "about" => ["@id" => "{$home_url}#organization"]
        ];

        // 子ページを mentions に追加（任意）
        $child_pages = get_pages([
            'child_of' => $page_id,
            'sort_column' => 'menu_order',
            'sort_order' => 'ASC',
            'post_status' => 'publish'
        ]);

        if ( $child_pages ) {
            $mentions = [];
            foreach ( $child_pages as $child ) {
                $node = [
                    "@type" => "WebPage",
                    "name" => get_the_title($child->ID),
                    "url" => get_permalink($child->ID),
                    "description" => get_post_meta($child->ID, 'description', true) ?: get_the_excerpt($child->ID)
                ];
                $mentions[] = $node;
            }

            if ( !empty($mentions) ) {
                $data['mentions'] = $mentions;
            }
        }
    }

    // =========================
    // 投稿タイプアーカイブ
    // =========================
    elseif( is_post_type_archive() ){
        $post_type = get_query_var('post_type');
        if ( is_array($post_type) ) $post_type = reset($post_type);

        $data = [
            "@context" => $content,
            "@type" => "CollectionPage",
            "name" => post_type_archive_title('', false) ?: "Archive",
            "url" => get_post_type_archive_link($post_type),
            "description" => "This is a description for the {$post_type} archive.",
            "isPartOf" => ["@id" => "{$home_url}#website"],
            "about" => ["@id" => "{$home_url}#organization"],
            "mainEntity" => [
                "@type" => "WebPageElement",
                "name" => "Main content of {$post_type}",
                "description" => "A collection of {$post_type} items."
            ]
        ];
    }

    // =========================
    // singular 投稿
    // =========================
    elseif ( is_singular() ) {
        $post_id = get_the_ID();
        $title = get_the_title($post_id);
        $permalink = get_permalink($post_id);
        $post_type = get_post_type($post_id);
        $excerpt = get_post_meta($post_id, 'description', true) ?: get_the_excerpt($post_id);
        $image = has_post_thumbnail($post_id) ? get_the_post_thumbnail_url($post_id, 'full') : '';

        $data = [
            "@context" => $content,
            "@type" => "Article",
            "headline" => $title,
            "name" => $title,
            "url" => $permalink,
            "description" => $excerpt,
            "datePublished" => get_the_date('c', $post_id),
            "dateModified" => get_the_modified_date('c', $post_id),
            "isPartOf" => ["@id" => "{$home_url}#website"],
            "about" => ["@id" => "{$home_url}#organization"],
            "publisher" => [
                "@type" => "Organization",
                "name" => $site_name
            ]
        ];

        if ($image) $data['image'] = [$image];
    }

    // =========================
    // JSON 出力
    // =========================
    echo '<script type="application/ld+json">' .
        json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) .
        '</script>';
}
add_action('wp_head', 'output_structured_data_dynamic');
`,
  },
  {
    id: 5,
    title: "ゴルフサイト",
    description: "観光サイトからゴルフ場紹介に特化したページ",
    image: ibarakiguide,
    link: "https://visit.ibarakiguide.jp/golf/",
    details:
      "未経験のwebデザイナーさんに研修を行いつつデザインを作成してもらいました。できたデザインに対してコーディングまで担当してもらい、池田でjsの実装、wordpressの構築を担当しました。研修ではsassの記述方法やクラスの命名規則を中心に解説していました。",
    feature: [ibarakiguide_screencapture],
    codeSnippet: ``,
  },
  {
    id: 6,
    title: "教育支援団体Webサイト",
    description: "地域観光LPのWEBデザインからコーディングまで全て担当",
    image: studykyoto,
    link: "",
    details:
      "この案件ではsketchを使い、webデザインからコーディングまでを対応しました。現在の最新の案件ではfigmaを使用してデザイン作成を行います",
    feature: [studykyoto_screencapture],
    codeSnippet: ``,
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">制作実績</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <Modal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
