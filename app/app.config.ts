const field = 'min-h-11 rounded-xl'
const outline =
  'bg-[var(--site-surface)] text-[var(--site-ink)] ring-[var(--site-control-border)]'
const fieldIcon = 'text-[var(--site-muted)]'

export default defineAppConfig({
  ui: {
    colors: { primary: 'blue', neutral: 'slate' },
    input: {
      slots: {
        base: field + ' placeholder:text-[var(--site-muted)]',
        leadingIcon: fieldIcon,
        trailingIcon: fieldIcon,
      },
      variants: { variant: { outline } },
    },
    textarea: {
      slots: { base: 'rounded-xl placeholder:text-[var(--site-muted)]' },
      variants: { variant: { outline } },
    },
    selectMenu: {
      slots: {
        base: field,
        leadingIcon: fieldIcon,
        trailingIcon: fieldIcon,
        content: 'rounded-xl bg-[var(--site-surface)] ring-[var(--site-line)]',
        item: 'text-[var(--site-ink)] data-highlighted:not-data-disabled:before:bg-[var(--site-soft)]',
        itemTrailingIcon: 'text-[var(--site-link)]',
      },
      variants: { variant: { outline } },
    },
  },
})
