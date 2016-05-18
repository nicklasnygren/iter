import test from 'tape';
import { intRange, filter, map, compose, flatten } from '../src';

test('Sudoku with iterables!', t => {

  const O = null;

  class Sudoku {
    constructor(grid, prev = null) {
      this.grid = grid;
      this.prev = prev;
    }

    getCellValueFor(x, y) {
      return this.grid[y][x];
    }

    * getCandidatesFor(x, y) {
      const taken = new Set(this.getNonCandidatesFor(x, y));
      if (taken.size < 9 && !Sudoku.validValue(this.getCellValueFor(x, y))) {
        yield * filter(num => !taken.has(num), intRange(1, 9));
      }
    }

    * getNonCandidatesFor(x, y) {
      yield * compose(
        filter(Sudoku.validValue),
        map(([x, y]) => this.getCellValueFor(x, y))
      )(Sudoku.relatedCoordsFor(x, y));
    }

    getRelatedCandidatesFor(x, y) {
      return range => compose(
        flatten,
        map(([_x, _y]) => this.getCandidatesFor(_x, _y)),
        filter(([_x, _y]) => !(_x === x && _y === y))
      )(range);
    }

    getApparentCandidatesFor(x, y) {
      const curVal = this.getCellValueFor(x, y);
      const getRelatedCandidates = this.getRelatedCandidatesFor(x, y);

      if (!Sudoku.validValue(curVal)) {
        const candidates = [...this.getCandidatesFor(x, y)];

        if (candidates.length === 1) {
        
          // First, eliminate by checking across grid cols, rows and boxes.
          // If there's only one possibility, then there you go.
          return candidates[0];
        }

        else {

          // If that check failed, let's see if the candidates values on the current tile has a
          // unique among its row, col, box. 
          for (const num of candidates) {
            for (const range of [
              () => Sudoku.col(x),
              () => Sudoku.row(y),
              () => Sudoku.box(x, y)
            ]) {
              for (const value of getRelatedCandidates(range())) {
                if (value === num) {
                  return curVal;
                }
              }
              return num;
            }
          }
        }
      }

      return curVal;
    }

    get next() {
      const next = [];

      if (this.validCells === 81 || (this.prev && this.prev.validCells === this.validCells)) {
        return null;
      }

      for (const [x, y] of Sudoku.grid()) {
        if (!Array.isArray(next[y])) {
          next[y] = [];
        }
        next[y].push(this.getApparentCandidatesFor(x, y));
      }

      return new Sudoku(next, this);
    }

    get validCells() {
      return [
        ...map(
          ([x, y]) => (
            Sudoku.validValue(this.getCellValueFor(x, y))
              ? 1
              : 0),
          Sudoku.grid()
        )
      ].reduce((sum, num) => sum + num, 0);
    }

    * [Symbol.iterator] () {
      let s = this;
      let prev;
      yield s;

      while (s !== s.prev) {
        s = s.next;
        if (!s) {
          break;
        }
        yield s;
        prev = s;
      }
    }

    static * grid() {
      for (const y of Sudoku.dims()) {
        yield * map((x) => [x, y], Sudoku.dims());
      }
    }

    static * row(y) {
      yield * map(x => [x, y], Sudoku.dims());
    }

    static * col(x) {
      yield * map(y => [x, y], Sudoku.dims());
    }

    static * box(x, y) {
      const boxBounds = num => (num / 3 | 0) * 3;
      const qX = boxBounds(x);
      const qY = boxBounds(y);

      for (const rIdx of intRange(qY, qY + 2)) {
        for (const cIdx of intRange(qX, qX + 2)) {
          yield [cIdx, rIdx];
        }
      }
    }

    static * relatedCoordsFor(x, y) {
      yield * Sudoku.col(x);
      yield * Sudoku.row(y);
      yield * Sudoku.box(x, y);
    }

    static validValue(num) {
      return num !== O;
    }

    static dims() {
      return intRange(0, 8);
    }
  };

  const grid = [
    [O, 6, O,   1, O, 4,   O, 5, O],
    [O, O, 8,   3, O, 5,   6, O, O],
    [2, O, O,   O, O, O,   O, O, 1],
                          
    [8, O, O,   4, O, 7,   O, O, 6],
    [O, O, 6,   O, O, O,   3, O, O],
    [7, O, O,   9, O, 1,   O, O, 4],
                          
    [5, O, O,   O, O, O,   O, O, 2],
    [O, O, 7,   2, O, 6,   9, O, O],
    [O, 4, O,   5, O, 8,   O, 7, O],
  ];

  const s = new Sudoku(grid);
  const getVal = map(([x, y]) => s.getCellValueFor(x, y));

  t.deepEqual(
    [...getVal(Sudoku.row(1))],
    [O, O, 8,  3, O, 5,  6, O, O],
    `Sudoku gets row iterable`
  );

  t.deepEqual(
    [...getVal(Sudoku.col(1))],
    [6, O, O,  O, O, O,  O, O, 4],
    `Sudoku gets col iterable`
  );

  t.deepEqual(
    [...getVal(Sudoku.box(3, 5))],
    [4, O, 7, O, O, O, 9, O, 1],
    `Sudoku gets box iterable`
  );

  t.deepEqual(
    [...(new Set(s.getNonCandidatesFor(1, 3)))].sort(),
    [4, 6, 7, 8],
    `Sudoku gets getNonCandidatesFor for coordinate`
  );

  t.deepEqual(
    [...s.getCandidatesFor(1, 3)].sort(),
    [1, 2, 3, 5, 9],
    `Sudoku gets candidates for coordinate`
  );

  t.equal(s.getApparentCandidatesFor(8, 8), 3
    , `Sudoku can get only possible value for cell`);
  
  let solved;
  let prev = s;
  let solvesiterably = true;

  for (solved of s) {
    if (solved !== prev && solved.validCells <= prev.validCells) solvesiterably = false;
    prev = solved;
  }

  t.deepEqual(
    solved.grid,
    [ [ 9, 6, 3,  1, 7, 4,  2, 5, 8 ],
      [ 1, 7, 8,  3, 2, 5,  6, 4, 9 ],
      [ 2, 5, 4,  6, 8, 9,  7, 3, 1 ],

      [ 8, 2, 1,  4, 3, 7,  5, 9, 6 ],
      [ 4, 9, 6,  8, 5, 2,  3, 1, 7 ],
      [ 7, 3, 5,  9, 6, 1,  8, 2, 4 ],

      [ 5, 8, 9,  7, 1, 3,  4, 6, 2 ],
      [ 3, 1, 7,  2, 4, 6,  9, 8, 5 ],
      [ 6, 4, 2,  5, 9, 8,  1, 7, 3 ] ],
    `Sudoku solver solves easy sudoku puzzles`
  );

  t.ok(solvesiterably
    , `each iteration of the solution has more valid cell values than the previous one`);

  t.end();
});
