declare module 'cli-table3' {
  interface ITableOptions {
    readonly chars?: Record<string, string>
    readonly style?: Record<string, unknown>
    readonly colWidths?: readonly number[]
    readonly colAligns?: readonly ('left' | 'center' | 'right')[]
    readonly head?: readonly string[]
    readonly border?: readonly string[]
  }

  interface ITableCell {
    readonly colSpan?: number
    readonly content?: string
    readonly hAlign?: 'left' | 'center' | 'right'
  }

  type TableRow = readonly string[] | readonly ITableCell[]

  class CliTable {
      public constructor(options?: ReadonlyDeep<ITableOptions>)
      public push(...rows: readonly TableRow[]): void
      public toString(): string
  }

  export = CliTable
} 