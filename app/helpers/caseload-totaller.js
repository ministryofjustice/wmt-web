module.exports = function (caseloadArray) {
  caseloadArray.details.forEach(function (detail) {
    if (detail.grades.length > 0) {
      const total = { grade: 'Total', a3: 0, a2: 0, a1: 0, a0: 0, b3: 0, b2: 0, b1: 0, b0: 0, c3: 0, c2: 0, c1: 0, c0: 0, d3: 0, d2: 0, d1: 0, d0: 0, a3s: 0, a2s: 0, a1s: 0, a0s: 0, b3s: 0, b2s: 0, b1s: 0, b0s: 0, c3s: 0, c2s: 0, c1s: 0, c0s: 0, d3s: 0, d2s: 0, d1s: 0, d0s: 0, untiered: 0, totalCases: 0 }
      detail.grades.forEach(function (grade) {
        total.a3 += grade.a3
        total.a2 += grade.a2
        total.a1 += grade.a1
        total.a0 += grade.a0

        total.b3 += grade.b3
        total.b2 += grade.b2
        total.b1 += grade.b1
        total.b0 += grade.b0

        total.c3 += grade.c3
        total.c2 += grade.c2
        total.c1 += grade.c1
        total.c0 += grade.c0

        total.d3 += grade.d3
        total.d2 += grade.d2
        total.d1 += grade.d1
        total.d0 += grade.d0

        total.a3s += grade.a3s
        total.a2s += grade.a2s
        total.a1s += grade.a1s
        total.a0s += grade.a0s

        total.b3s += grade.b3s
        total.b2s += grade.b2s
        total.b1s += grade.b1s
        total.b0s += grade.b0s

        total.c3s += grade.c3s
        total.c2s += grade.c2s
        total.c1s += grade.c1s
        total.c0s += grade.c0s

        total.d3s += grade.d3s
        total.d2s += grade.d2s
        total.d1s += grade.d1s
        total.d0s += grade.d0s
        total.untiered += grade.untiered
        total.totalCases += grade.totalCases
      })
      detail.grades.push(total)
    }
  })

  const totalRow = { grade: 'Total', a3: 0, a2: 0, a1: 0, a0: 0, b3: 0, b2: 0, b1: 0, b0: 0, c3: 0, c2: 0, c1: 0, c0: 0, d3: 0, d2: 0, d1: 0, d0: 0, a3s: 0, a2s: 0, a1s: 0, a0s: 0, b3s: 0, b2s: 0, b1s: 0, b0s: 0, c3s: 0, c2s: 0, c1s: 0, c0s: 0, d3s: 0, d2s: 0, d1s: 0, d0s: 0, untiered: 0, totalCases: 0 }
  Object.keys(caseloadArray.totals).forEach(function (grade) {
    totalRow.a3 += caseloadArray.totals[grade].a3
    totalRow.a2 += caseloadArray.totals[grade].a2
    totalRow.a1 += caseloadArray.totals[grade].a1
    totalRow.a0 += caseloadArray.totals[grade].a0
    totalRow.b3 += caseloadArray.totals[grade].b3
    totalRow.b2 += caseloadArray.totals[grade].b2
    totalRow.b1 += caseloadArray.totals[grade].b1
    totalRow.b0 += caseloadArray.totals[grade].b0
    totalRow.c3 += caseloadArray.totals[grade].c3
    totalRow.c2 += caseloadArray.totals[grade].c2
    totalRow.c1 += caseloadArray.totals[grade].c1
    totalRow.c0 += caseloadArray.totals[grade].c0
    totalRow.d3 += caseloadArray.totals[grade].d3
    totalRow.d2 += caseloadArray.totals[grade].d2
    totalRow.d1 += caseloadArray.totals[grade].d1
    totalRow.d0 += caseloadArray.totals[grade].d0
    totalRow.a3s += caseloadArray.totals[grade].a3s
    totalRow.a2s += caseloadArray.totals[grade].a2s
    totalRow.a1s += caseloadArray.totals[grade].a1s
    totalRow.a0s += caseloadArray.totals[grade].a0s
    totalRow.b3s += caseloadArray.totals[grade].b3s
    totalRow.b2s += caseloadArray.totals[grade].b2s
    totalRow.b1s += caseloadArray.totals[grade].b1s
    totalRow.b0s += caseloadArray.totals[grade].b0s
    totalRow.c3s += caseloadArray.totals[grade].c3s
    totalRow.c2s += caseloadArray.totals[grade].c2s
    totalRow.c1s += caseloadArray.totals[grade].c1s
    totalRow.c0s += caseloadArray.totals[grade].c0s
    totalRow.d3s += caseloadArray.totals[grade].d3s
    totalRow.d2s += caseloadArray.totals[grade].d2s
    totalRow.d1s += caseloadArray.totals[grade].d1s
    totalRow.d0s += caseloadArray.totals[grade].d0s
    totalRow.untiered += caseloadArray.totals[grade].untiered
    totalRow.totalCases += caseloadArray.totals[grade].totalCases
  })
  caseloadArray.totals.Total = totalRow
}
