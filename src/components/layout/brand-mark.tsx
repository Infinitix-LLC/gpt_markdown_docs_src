const VAL_MARK_SRC =
  "https://raw.githubusercontent.com/Infinitix-LLC/gpt_markdown/8239e3d3d7fa475688cb7c4cc6af344c377f926c/assets/gpt-mark.png";

export function BrandMark({ className }: { className?: string }) {
  return (
    // The shared mark is deliberately loaded from the package repository so
    // gptmarkdown.com and pub.dev use the same source asset.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={VAL_MARK_SRC}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}