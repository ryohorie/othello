<template lang="pug">
  div.container
    v-row
      p {{turn == "Black" ? "黒の番" : "白の番"}}
      div.row(v-for="x of 8" :key="x")
        div.cell(v-for="y of 8" :key="y" @click="onClick(x-1,y-1)")
          div.piece(
            :class="cellClassName(x-1,y-1)"
          )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CellManager from '~/libs/cell_manager'

@Component
export default class Othello extends Vue {
  turn: 'White' | 'Black' = 'Black' // 今どっちのターンか
  cellManager: CellManager = CellManager.getInstance()
  // 初期化
  created() {}
  // クリックされたときのイベント
  onClick(x: number, y: number) {
    if (this.cellManager.cell(x, y).isPutable(this.turn)) {
      this.cellManager.setCellState(x, y, this.turn)
      this.turn = this.turn === 'Black' ? 'White' : 'Black'
      // 置ける場所がないこともある
      if (this.cellManager.getPutableCount(this.turn) === 0) {
        this.turn = this.turn === 'Black' ? 'White' : 'Black'
      }
    }
  }

  // セルの状態からCSSのクラス名を取得する
  cellClassName(x: number, y: number) {
    const cell = this.cellManager.cell(x, y)
    if (cell) {
      switch (cell.state) {
        case 'White':
          return 'white'
        case 'Black':
          return 'black'
        case 'None':
          if (cell.isPutable(this.turn)) {
            return 'putable'
          }
      }
    }
    return ''
  }
}
</script>

<style lang="sass">
.row
  height: 60px
.cell
  display: inline-block
  border: solid 1px
  width: 60px
  height: 60px
  background: green
.piece
  margin: 5px
  width: 50px
  height: 50px
  border-radius: 50%
.black
  background: black
.white
  background: white
.putable
  margin: 20px
  width: 20px
  height: 20px
  background: #ff3333aa
</style>
