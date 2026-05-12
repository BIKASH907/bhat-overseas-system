// Generic JSON-LD injector. Place in any server or client component;
// emits the standard <script type="application/ld+json"> tag.

type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML is the standard pattern for JSON-LD in Next.js
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
