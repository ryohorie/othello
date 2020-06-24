export default class Cell {
  // 現在の状態
  private _state: 'None' | 'White' | 'Black'
  // 隣のセルを配列で持っておく
  private _next: Cell[] = Array<Cell>(8)
  // ２つの引数 aとbが異なっている色かどうかを判定するメソッド
  public static isEnemyColor(
    a: 'White' | 'Black' | 'None',
    b: 'White' | 'Black' | 'None'
  ): boolean {
    return (a === 'Black' && b === 'White') || (a === 'White' && b === 'Black')
  }

  // コンストラクタ
  public constructor() {
    this._state = 'None'
  }

  public get state() {
    return this._state
  }

  // 引数の色の石が置けるかどうかを判定するメソッド
  public isPutable(state: 'White' | 'Black') {
    if (this._state !== 'None') {
      return false
    }
    for (let i = 0; i < this._next.length; i++) {
      const next = this._next[i]
      if (next && Cell.isEnemyColor(next._state, state)) {
        if (next.traverse(i, state, false)) {
          return true
        }
      }
    }
    return false
  }

  // 状態を変更するメソッド
  public setState(state: 'White' | 'Black', force: boolean = false) {
    if (!force && !this.isPutable(state)) {
      return
    }
    this._state = state
    // ひっくり返しにいく
    for (let i = 0; i < this._next.length; i++) {
      const next = this._next[i]
      if (next && Cell.isEnemyColor(next._state, state)) {
        next.traverse(i, state, true)
      }
    }
  }

  // 状態を変更するメソッド
  public setNextCell(pos: number, cell: Cell) {
    this._next[pos] = cell
  }

  // Cellを再帰的に横断していくメソッド
  // direction: 横断していく方向
  // state: スタートの色
  // upset: ひっくり返すかどうか
  private traverse(
    direction: number,
    state: 'White' | 'Black',
    upset: boolean
  ): boolean {
    // 自分がスタートと同じ色だったらtrueで返す
    if (this._state === state) {
      return true
    }
    let ret = false
    const next = this._next[direction]
    // 端っこじゃない && 色がついているセルだったら次を見に行く
    if (next && next._state !== 'None') {
      ret = next.traverse(direction, state, upset)
      if (ret && upset) {
        this._state = state
      }
    }
    return ret
  }
}
