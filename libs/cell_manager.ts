import Cell from './cell'

export default class CellManager {
  // インスタンス
  private static _instance: CellManager
  public static getInstance(): CellManager {
    if (!CellManager._instance) {
      CellManager._instance = new CellManager()
    }
    return CellManager._instance
  }

  private _cells: Cell[] = [] // セルの配列
  // コンストラクタ
  private constructor() {
    this.clear()
  }

  public clear() {
    this._cells = []
    // セルを生成してつなげていく
    for (let i = 0; i < 8 * 8; i++) {
      this._cells.push(new Cell())
    }
    // setNextCellの第一引数の数値は以下の通り
    // 0 1 2
    // 3 * 4
    // 5 6 7
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const cell = this.cell(x, y)
        // 左
        if (y > 0) {
          cell.setNextCell(3, this.cell(x, y - 1))
        }
        // 右
        if (y < 7) {
          cell.setNextCell(4, this.cell(x, y + 1))
        }
        // 上
        if (x > 0) {
          cell.setNextCell(1, this.cell(x - 1, y))
        }
        // 下
        if (x < 7) {
          cell.setNextCell(6, this.cell(x + 1, y))
        }
        // 左上
        if (y > 0 && x > 0) {
          cell.setNextCell(0, this.cell(x - 1, y - 1))
        }
        // 右上
        if (y < 7 && x > 0) {
          cell.setNextCell(2, this.cell(x - 1, y + 1))
        }
        // 左下
        if (y > 0 && x < 7) {
          cell.setNextCell(5, this.cell(x + 1, y - 1))
        }
        // 右下
        if (y < 7 && x < 7) {
          cell.setNextCell(7, this.cell(x + 1, y + 1))
        }
      }
    }
    // 初期配置
    this.cell(3, 3).setState('White', true)
    this.cell(3, 4).setState('Black', true)
    this.cell(4, 3).setState('Black', true)
    this.cell(4, 4).setState('White', true)
  }

  // セルのゲッター
  public cell(x: number, y: number) {
    return this._cells[x * 8 + y]
  }

  // セルのステータスを設定する
  public setCellState(x: number, y: number, state: 'Black' | 'White') {
    const cell = this.cell(x, y)
    if (cell.isPutable(state)) {
      cell.setState(state)
    }
  }

  // 置ける場所の数を取得する
  public getPutableCount(state: 'Black' | 'White'): number {
    let ret = 0
    for (let i = 0; i < this._cells.length; i++) {
      const cell = this._cells[i]
      if (cell.isPutable(state)) {
        ret++
      }
    }
    return ret
  }
}
