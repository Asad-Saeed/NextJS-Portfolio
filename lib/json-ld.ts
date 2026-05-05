// Safely serialize a JSON-LD object for inline `<script type="application/ld+json">`.
// Escapes sequences that can break out of an inline script:
//   `<` → prevents `</script>` and `<!--` from terminating the block
//   `>` → prevents `]]>` from closing a CDATA section in XHTML
//   U+2028 / U+2029 → invalid line terminators in JS string literals on legacy engines
const LINE_SEPARATOR = String.fromCharCode(0x2028);
const PARAGRAPH_SEPARATOR = String.fromCharCode(0x2029);

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll(LINE_SEPARATOR, "\\u2028")
    .replaceAll(PARAGRAPH_SEPARATOR, "\\u2029");
}
