type TitleLinesProps = {
  as?: "h1" | "h2";
  lines: readonly string[];
};

export function TitleLines({ as: Tag = "h2", lines }: TitleLinesProps) {
  return (
    <Tag>
      {lines.map((line) => (
        <span className="title-line" key={line}>
          {line}
        </span>
      ))}
    </Tag>
  );
}
